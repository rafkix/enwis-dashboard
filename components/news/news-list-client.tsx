'use client'

import { useState } from 'react'
import { AdSlot } from '@/components/news/ad-slot'
import type { NewsBlock } from '@/lib/news-types'
import { parseNewsBlocks } from '@/lib/news'

type NewsCard = {
    id: string
    coverImage: string | null
    publishedAt: string | null
    views: number
    title: string
    excerpt: string | null
    contentJson: string
}

type NewsDict = {
    readMore: string
    hide: string
    views: string
    prev: string
    next: string
}

type Props = {
    locale: string
    items: NewsCard[]
    dict: NewsDict
    currentPage: number
    totalPages: number
}

function buildPageHref(locale: string, page: number) {
    return page <= 1 ? `/${locale}/news` : `/${locale}/news?page=${page}`
}

function formatDate(date: string | null, locale: string) {
    if (!date) return ''

    try {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date))
    } catch {
        return new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date))
    }
}

function extractPreviewText(blocks: NewsBlock[], maxLength = 220) {
    const paragraph = blocks.find((block) => block.type === 'paragraph')
    const text = paragraph && paragraph.type === 'paragraph' ? paragraph.text : ''

    if (!text) return ''
    if (text.length <= maxLength) return text
    return `${text.slice(0, maxLength).trim()}...`
}

function youtubeToEmbed(url: string): string | null {
    try {
        const parsed = new URL(url)

        if (parsed.hostname.includes('youtube.com')) {
            const videoId = parsed.searchParams.get('v')
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        if (parsed.hostname.includes('youtu.be')) {
            const videoId = parsed.pathname.replace('/', '')
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        return null
    } catch {
        return null
    }
}

function BlockRenderer({ blocks }: { blocks: NewsBlock[] }) {
    return (
        <div className="space-y-4">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'paragraph':
                        return (
                            <p key={index} className="text-sm leading-7 text-slate-700">
                                {block.text}
                            </p>
                        )

                    case 'heading':
                        return block.level === 2 ? (
                            <h3 key={index} className="text-xl font-semibold text-slate-900">
                                {block.text}
                            </h3>
                        ) : (
                            <h4 key={index} className="text-lg font-semibold text-slate-900">
                                {block.text}
                            </h4>
                        )

                    case 'image':
                        return (
                            <figure key={index} className="space-y-2">
                                <img
                                    src={block.url}
                                    alt={block.alt || ''}
                                    className="w-full rounded-2xl object-cover"
                                />
                                {block.caption ? (
                                    <figcaption className="text-sm text-slate-500">
                                        {block.caption}
                                    </figcaption>
                                ) : null}
                            </figure>
                        )

                    case 'gallery':
                        return (
                            <div key={index} className="grid gap-4 sm:grid-cols-2">
                                {block.items.map((item, i) => (
                                    <img
                                        key={i}
                                        src={item.url}
                                        alt={item.alt || ''}
                                        className="w-full rounded-2xl object-cover"
                                    />
                                ))}
                            </div>
                        )

                    case 'youtube': {
                        const embedUrl = youtubeToEmbed(block.url)
                        if (!embedUrl) return null

                        return (
                            <div key={index} className="overflow-hidden rounded-2xl">
                                <div className="aspect-video">
                                    <iframe
                                        src={embedUrl}
                                        title={block.title || 'YouTube video'}
                                        className="h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )
                    }

                    case 'link':
                        return (
                            <a
                                key={index}
                                href={block.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                            >
                                {block.label}
                            </a>
                        )

                    case 'quote':
                        return (
                            <blockquote
                                key={index}
                                className="rounded-2xl border-l-4 border-slate-300 bg-slate-50 px-5 py-4"
                            >
                                <p className="text-sm leading-7 text-slate-700">{block.text}</p>
                                {block.author ? (
                                    <footer className="mt-3 text-sm text-slate-500">
                                        — {block.author}
                                    </footer>
                                ) : null}
                            </blockquote>
                        )

                    case 'file':
                        return (
                            <a
                                key={index}
                                href={block.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                            >
                                {block.label}
                            </a>
                        )

                    default:
                        return null
                }
            })}
        </div>
    )
}

export function NewsListClient({
    locale,
    items,
    dict,
    currentPage,
    totalPages,
}: Props) {
    const [openId, setOpenId] = useState<string | null>(null)
    const [viewsMap, setViewsMap] = useState<Record<string, number>>(
        Object.fromEntries(items.map((item) => [item.id, item.views]))
    )
    const [loadingId, setLoadingId] = useState<string | null>(null)

    async function toggleOpen(id: string) {
        const isOpen = openId === id

        if (isOpen) {
            setOpenId(null)
            return
        }

        setOpenId(id)

        try {
            setLoadingId(id)

            const res = await fetch(`/api/news/${id}/view`, {
                method: 'POST',
            })

            const data = await res.json().catch(() => null)

            if (res.ok && data?.success && typeof data?.data?.views === 'number') {
                setViewsMap((prev) => ({
                    ...prev,
                    [id]: data.data.views,
                }))
            }
        } catch {
            // ignore
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <>
            <section className="space-y-5">
                {items.map((item, index) => {
                    const isOpen = openId === item.id
                    const views = viewsMap[item.id] ?? item.views
                    const blocks = parseNewsBlocks(item.contentJson)
                    const preview = extractPreviewText(blocks)

                    return (
                        <div key={item.id} className="space-y-5">
                            <article className="overflow-hidden rounded-2xl border bg-white">
                                {item.coverImage ? (
                                    <div className="aspect-[16/7] w-full bg-slate-100">
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ) : null}

                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                        {item.publishedAt ? (
                                            <span>{formatDate(item.publishedAt, locale)}</span>
                                        ) : null}

                                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                                        <span>
                                            {views} {dict.views}
                                        </span>
                                    </div>

                                    <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-900">
                                        {item.title}
                                    </h2>

                                    {!isOpen ? (
                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            {item.excerpt || preview}
                                        </p>
                                    ) : (
                                        <div className="mt-4">
                                            <BlockRenderer blocks={blocks} />
                                        </div>
                                    )}

                                    <div className="mt-5">
                                        <button
                                            type="button"
                                            onClick={() => toggleOpen(item.id)}
                                            disabled={loadingId === item.id}
                                            className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-60"
                                        >
                                            {isOpen ? dict.hide : dict.readMore}
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {index === 0 && <AdSlot label="Top banner reklama" />}
                            {index === 2 && <AdSlot label="In-feed reklama" />}
                        </div>
                    )
                })}
            </section>

            {totalPages > 1 ? (
                <>
                    <div className="mt-8">
                        <AdSlot label="Bottom banner reklama" />
                    </div>

                    <nav className="mt-8 flex items-center justify-center gap-2">
                        <a
                            href={buildPageHref(locale, currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={`rounded-xl border px-4 py-2 text-sm ${currentPage === 1
                                    ? 'pointer-events-none opacity-50'
                                    : 'hover:bg-slate-50'
                                }`}
                        >
                            {dict.prev}
                        </a>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <a
                                key={pageNumber}
                                href={buildPageHref(locale, pageNumber)}
                                className={`rounded-xl border px-4 py-2 text-sm ${pageNumber === currentPage
                                        ? 'bg-slate-900 text-white'
                                        : 'hover:bg-slate-50'
                                    }`}
                            >
                                {pageNumber}
                            </a>
                        ))}

                        <a
                            href={buildPageHref(locale, currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            className={`rounded-xl border px-4 py-2 text-sm ${currentPage === totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : 'hover:bg-slate-50'
                                }`}
                        >
                            {dict.next}
                        </a>
                    </nav>
                </>
            ) : null}
        </>
    )
}