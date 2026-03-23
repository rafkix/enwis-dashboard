'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PostEditor } from '@/components/editor/post-editor'

type Locale = 'uz' | 'ru' | 'en'

type Translation = {
    locale: Locale
    title: string
    excerpt?: string | null
    contentJson: string
    slug?: string
}

type NewsItem = {
    id: string
    type: 'news' | 'promo'
    coverImage?: string | null
    sponsorName?: string | null
    sponsorUrl?: string | null
    ctaLabel?: string | null
    ctaUrl?: string | null
    websitePublished: boolean
    telegramPublished: boolean
    translations: Translation[]
}

type Block =
    | {
        id: string
        type: 'paragraph'
        text: string
    }
    | {
        id: string
        type: string
        [key: string]: unknown
    }

function createId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function emptyParagraph(): Block[] {
    return [
        {
            id: createId(),
            type: 'paragraph',
            text: '',
        },
    ]
}

function parseBlocks(json?: string | null): Block[] {
    try {
        const parsed = JSON.parse(json || '[]')

        if (!Array.isArray(parsed) || parsed.length === 0) {
            return emptyParagraph()
        }

        return parsed.map((block) => ({
            id: createId(),
            ...block,
        })) as Block[]
    } catch {
        return emptyParagraph()
    }
}

export default function EditNewsPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()

    const newsId = Array.isArray(params?.id) ? params.id[0] : params?.id

    const [news, setNews] = useState<NewsItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [pageError, setPageError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState(false)

    async function loadNews(id: string) {
        const res = await fetch(`/api/admin/news/${id}`, {
            cache: 'no-store',
        })

        const data = await res.json().catch(() => null)

        if (!res.ok || !data?.success || !data?.data) {
            throw new Error(data?.message || 'News topilmadi')
        }

        return data.data as NewsItem
    }

    useEffect(() => {
        if (!newsId) {
            setPageError('News ID topilmadi')
            setLoading(false)
            return
        }

        async function load() {
            try {
                setLoading(true)
                setPageError('')
                const loaded = await loadNews(newsId)
                setNews(loaded)
            } catch (err) {
                setPageError(err instanceof Error ? err.message : 'Xatolik')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [newsId])

    const initialValue = useMemo(() => {
        if (!news) return null

        const translations = Array.isArray(news.translations) ? news.translations : []

        const byLocale = translations.reduce<Partial<Record<Locale, Translation>>>((acc, item) => {
            acc[item.locale] = item
            return acc
        }, {})

        return {
            type: news.type || 'news',
            coverImage: news.coverImage || '',
            sponsorName: news.sponsorName || '',
            sponsorUrl: news.sponsorUrl || '',
            ctaLabel: news.ctaLabel || '',
            ctaUrl: news.ctaUrl || '',
            translations: {
                uz: {
                    title: byLocale.uz?.title || '',
                    excerpt: byLocale.uz?.excerpt || '',
                    blocks: parseBlocks(byLocale.uz?.contentJson),
                },
                ru: {
                    title: byLocale.ru?.title || '',
                    excerpt: byLocale.ru?.excerpt || '',
                    blocks: parseBlocks(byLocale.ru?.contentJson),
                },
                en: {
                    title: byLocale.en?.title || '',
                    excerpt: byLocale.en?.excerpt || '',
                    blocks: parseBlocks(byLocale.en?.contentJson),
                },
            },
        }
    }, [news])

    async function refreshNews() {
        if (!news?.id) return
        const refreshed = await loadNews(news.id)
        setNews(refreshed)
    }

    async function handlePublishWebsite() {
        if (!news) return

        const res = await fetch(`/api/admin/news/${news.id}/publish-website`, {
            method: 'POST',
        })

        const data = await res.json().catch(() => null)

        if (!res.ok || !data?.success) {
            throw new Error(data?.message || 'Saytga joylashda xatolik')
        }

        await refreshNews()
        router.refresh()
    }

    async function handlePublishTelegram() {
        if (!news) return

        const res = await fetch(`/api/admin/news/${news.id}/publish-telegram`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locale: 'uz' }),
        })

        const data = await res.json().catch(() => null)

        if (!res.ok || !data?.success) {
            throw new Error(data?.message || 'Telegramga yuborishda xatolik')
        }

        await refreshNews()
        router.refresh()
    }

    if (loading) {
        return <div className="p-6">Loading...</div>
    }

    if (pageError) {
        return <div className="p-6 text-red-600">{pageError}</div>
    }

    if (!news || !initialValue) {
        return <div className="p-6">News topilmadi</div>
    }

    return (
        <main>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Edit post</h1>
            </div>

            <div className="mt-8">
                <PostEditor
                    mode="edit"
                    initialValue={initialValue}
                    submitting={submitting}
                    deleting={deleting}
                    onSubmit={async (payload) => {
                        try {
                            setSubmitting(true)

                            const res = await fetch(`/api/admin/news/${news.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            })

                            const data = await res.json().catch(() => null)

                            if (!res.ok || !data?.success) {
                                throw new Error(data?.message || 'Saqlashda xatolik')
                            }

                            router.push('/admin/news')
                            router.refresh()
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                    onDelete={async () => {
                        const ok = window.confirm('Rostdan ham o‘chirmoqchimisiz?')
                        if (!ok) return

                        try {
                            setDeleting(true)

                            const res = await fetch(`/api/admin/news/${news.id}`, {
                                method: 'DELETE',
                            })

                            const data = await res.json().catch(() => null)

                            if (!res.ok || !data?.success) {
                                throw new Error(data?.message || 'Delete xatoligi')
                            }

                            router.push('/admin/news')
                            router.refresh()
                        } finally {
                            setDeleting(false)
                        }
                    }}
                    onPublishWebsite={handlePublishWebsite}
                    onPublishTelegram={handlePublishTelegram}
                />
            </div>
        </main>
    )
}