'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'

type Translation = {
    locale: string
    title: string
    slug: string
    excerpt?: string | null
    contentJson: string
}

type NewsItem = {
    id: string
    type: string
    coverImage?: string | null
    websitePublished: boolean
    telegramPublished: boolean
    views: number
    createdAt: string
    websitePublishedAt?: string | null
    translations: Translation[]
}

type ApiResponse<T> = {
    success: boolean
    data: T
    message?: string
}

async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url)
    const data = await res.json().catch(() => null)

    if (!res.ok) {
        throw new Error(data?.message || 'Xatolik yuz berdi')
    }

    return data
}

export default function AdminNewsPage() {
    const { data, error, isLoading, mutate } = useSWR<ApiResponse<NewsItem[]>>(
        '/api/admin/news',
        fetcher
    )

    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [publishingWebsiteId, setPublishingWebsiteId] = useState<string | null>(null)
    const [publishingTelegramId, setPublishingTelegramId] = useState<string | null>(null)

    async function handleDelete(id: string) {
        const ok = window.confirm('Rostdan ham o‘chirmoqchimisiz?')
        if (!ok) return

        try {
            setDeletingId(id)

            const res = await fetch(`/api/admin/news/${id}`, {
                method: 'DELETE',
            })

            const data = await res.json().catch(() => null)

            if (!res.ok || !data?.success) {
                throw new Error(data?.message || 'O‘chirishda xatolik')
            }

            await mutate()
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Xatolik yuz berdi')
        } finally {
            setDeletingId(null)
        }
    }

    async function handlePublishWebsite(id: string) {
        try {
            setPublishingWebsiteId(id)

            const res = await fetch(`/api/admin/news/${id}/publish-website`, {
                method: 'POST',
            })

            const data = await res.json().catch(() => null)

            if (!res.ok || !data?.success) {
                throw new Error(data?.message || 'Saytga joylashda xatolik')
            }

            await mutate()
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Xatolik yuz berdi')
        } finally {
            setPublishingWebsiteId(null)
        }
    }

    async function handlePublishTelegram(id: string) {
        try {
            setPublishingTelegramId(id)

            const res = await fetch(`/api/admin/news/${id}/publish-telegram`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locale: 'uz' }),
            })

            const data = await res.json().catch(() => null)

            if (!res.ok || !data?.success) {
                throw new Error(data?.message || 'Telegramga yuborishda xatolik')
            }

            await mutate()
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Xatolik yuz berdi')
        } finally {
            setPublishingTelegramId(null)
        }
    }

    if (isLoading) return <div className="p-6">Loading...</div>

    if (error) {
        return (
            <main>
                <p className="text-red-600">{error.message}</p>
                <button
                    className="mt-3 rounded-xl border px-4 py-2"
                    onClick={() => mutate()}
                >
                    Qayta urinish
                </button>
            </main>
        )
    }

    return (
        <main>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">News</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Barcha postlar ro‘yxati
                    </p>
                </div>

                <Link href="/admin/news/new" className="rounded-xl border px-4 py-2">
                    Yangi post
                </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
                <div className="grid grid-cols-[1.6fr_90px_90px_90px_120px_320px] gap-4 border-b bg-slate-50 px-4 py-3 text-sm font-medium">
                    <div>Title</div>
                    <div>Type</div>
                    <div>Site</div>
                    <div>TG</div>
                    <div>Views</div>
                    <div>Actions</div>
                </div>

                {data?.data?.length ? (
                    data.data.map((item) => {
                        const translations = Array.isArray(item.translations) ? item.translations : []
                        const uz = translations.find((t) => t.locale === 'uz')
                        const title = uz?.title || translations[0]?.title || 'No title'

                        return (
                            <div
                                key={item.id}
                                className="grid grid-cols-[1.6fr_90px_90px_90px_120px_320px] gap-4 border-b px-4 py-4 text-sm last:border-b-0"
                            >
                                <div className="min-w-0">
                                    <div className="truncate font-medium">{title}</div>
                                    <div className="mt-1 truncate text-xs text-slate-500">{item.id}</div>
                                </div>

                                <div>{item.type}</div>
                                <div>{item.websitePublished ? 'Yes' : 'No'}</div>
                                <div>{item.telegramPublished ? 'Yes' : 'No'}</div>
                                <div>{item.views}</div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Link
                                        href={`/admin/news/${item.id}`}
                                        className="rounded-lg border px-3 py-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => handlePublishWebsite(item.id)}
                                        disabled={
                                            item.websitePublished ||
                                            publishingWebsiteId === item.id
                                        }
                                        className="rounded-lg border px-3 py-2 disabled:opacity-60"
                                    >
                                        {publishingWebsiteId === item.id
                                            ? 'Publishing site...'
                                            : item.websitePublished
                                                ? 'Published site'
                                                : 'Publish site'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePublishTelegram(item.id)}
                                        disabled={
                                            item.telegramPublished ||
                                            publishingTelegramId === item.id
                                        }
                                        className="rounded-lg border px-3 py-2 disabled:opacity-60"
                                    >
                                        {publishingTelegramId === item.id
                                            ? 'Publishing TG...'
                                            : item.telegramPublished
                                                ? 'Published TG'
                                                : 'Publish TG'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deletingId === item.id}
                                        className="rounded-lg border border-red-300 px-3 py-2 text-red-600 disabled:opacity-60"
                                    >
                                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="p-10 text-center text-sm text-slate-500">
                        Hozircha post yo‘q
                    </div>
                )}
            </div>
        </main>
    )
}