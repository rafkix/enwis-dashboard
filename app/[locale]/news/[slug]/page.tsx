import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import CopyLinkButton from '@/components/news/copy-link-button'

type Props = {
    params: Promise<{ locale: string; slug: string }>
}

type Block =
    | { type: 'paragraph'; text?: string }
    | { type: 'heading'; text?: string; level?: number }
    | {
        type: 'image'
        url?: string
        alt?: string
        caption?: string
        ratio?: '16:9' | '4:3' | '1:1' | 'auto'
    }
    | {
        type: 'gallery'
        items?: Array<{
            url?: string
            alt?: string
            ratio?: '16:9' | '4:3' | '1:1' | 'auto'
        }>
    }
    | { type: 'youtube'; url?: string }
    | { type: 'quote'; text?: string }
    | { type: 'link'; url?: string; label?: string }

function formatDate(date: Date | null | undefined, locale: string) {
    if (!date) return ''
    try {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date)
    } catch {
        return new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date)
    }
}

function getBaseUrl() {
    return (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
}

function getAbsoluteUrl(path?: string | null) {
    if (!path) return null
    if (path.startsWith('http://') || path.startsWith('https://')) return path

    const base = getBaseUrl()
    return base ? `${base}${path.startsWith('/') ? path : `/${path}`}` : path
}

function getAspectClass(ratio?: string) {
    switch (ratio) {
        case '4:3':
            return 'aspect-[4/3]'
        case '1:1':
            return 'aspect-square'
        case 'auto':
            return ''
        case '16:9':
        default:
            return 'aspect-video'
    }
}

function extractYoutubeId(url?: string) {
    if (!url) return null

    try {
        const parsed = new URL(url)

        if (parsed.hostname.includes('youtu.be')) {
            return parsed.pathname.replace('/', '') || null
        }

        if (parsed.hostname.includes('youtube.com')) {
            return parsed.searchParams.get('v')
        }

        return null
    } catch {
        return null
    }
}

function safeParseContent(json?: string | null): Block[] {
    try {
        const parsed = JSON.parse(json || '[]')
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function getDescription(excerpt?: string | null, contentJson?: string | null) {
    if (excerpt?.trim()) return excerpt.trim()

    const paragraphs = safeParseContent(contentJson)
        .filter((block): block is Extract<Block, { type: 'paragraph' }> => block.type === 'paragraph')
        .map((block) => block.text?.trim() || '')
        .filter(Boolean)

    const text = paragraphs.join(' ').replace(/\s+/g, ' ').trim()
    return text.slice(0, 160)
}

async function incrementViews(newsId: string) {
    try {
        await prisma.news.update({
            where: { id: newsId },
            data: {
                views: {
                    increment: 1,
                },
            },
        })
    } catch {
        // intentionally ignored
    }
}

async function getNewsBySlug(locale: string, slug: string) {
    return prisma.newsTranslation.findUnique({
        where: {
            locale_slug: { locale, slug },
        },
        include: {
            news: {
                include: {
                    shortLink: true,
                },
            },
        },
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params
    const translation = await getNewsBySlug(locale, slug)

    if (!translation || !translation.news.websitePublished) {
        return {
            title: 'News',
        }
    }

    const title = translation.title
    const description = getDescription(translation.excerpt, translation.contentJson)
    const canonicalUrl = `${getBaseUrl()}/${locale}/news/${slug}`
    const image = getAbsoluteUrl(translation.news.coverImage)

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'article',
            locale,
            images: image
                ? [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ]
                : [],
        },
        twitter: {
            card: image ? 'summary_large_image' : 'summary',
            title,
            description,
            images: image ? [image] : [],
        },
    }
}

function renderBlock(block: Block, index: number) {
    switch (block.type) {
        case 'paragraph':
            if (!block.text?.trim()) return null
            return (
                <p key={index} className="text-lg leading-8 text-slate-700">
                    {block.text}
                </p>
            )

        case 'heading':
            if (!block.text?.trim()) return null

            if (block.level === 2) {
                return (
                    <h2 key={index} className="mt-10 text-2xl font-semibold text-slate-900">
                        {block.text}
                    </h2>
                )
            }

            return (
                <h3 key={index} className="mt-8 text-xl font-semibold text-slate-900">
                    {block.text}
                </h3>
            )

        case 'image': {
            const imageUrl = getAbsoluteUrl(block.url)
            if (!imageUrl) return null

            const aspectClass = getAspectClass(block.ratio)

            return (
                <figure key={index} className="space-y-3">
                    <div
                        className={`relative overflow-hidden rounded-2xl bg-slate-100 ${aspectClass || 'min-h-[260px]'
                            }`}
                    >
                        <Image
                            src={imageUrl}
                            alt={block.alt || ''}
                            fill
                            className={aspectClass ? 'object-cover' : 'object-contain'}
                            sizes="(max-width: 1280px) 100vw, 860px"
                        />
                    </div>

                    {block.caption ? (
                        <figcaption className="text-sm text-slate-500">{block.caption}</figcaption>
                    ) : null}
                </figure>
            )
        }

        case 'gallery': {
            const items = Array.isArray(block.items) ? block.items : []
            if (!items.length) return null

            return (
                <div key={index} className="grid gap-4 sm:grid-cols-2">
                    {items.map((item, i) => {
                        const imageUrl = getAbsoluteUrl(item.url)
                        if (!imageUrl) return null

                        const aspectClass = getAspectClass(item.ratio || '4:3')

                        return (
                            <div
                                key={i}
                                className={`relative overflow-hidden rounded-2xl bg-slate-100 ${aspectClass || 'min-h-[220px]'
                                    }`}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={item.alt || ''}
                                    fill
                                    className={aspectClass ? 'object-cover' : 'object-contain'}
                                    sizes="(max-width: 768px) 100vw, 420px"
                                />
                            </div>
                        )
                    })}
                </div>
            )
        }

        case 'youtube': {
            const videoId = extractYoutubeId(block.url)
            if (!videoId) return null

            return (
                <div key={index} className="aspect-video overflow-hidden rounded-2xl">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )
        }

        case 'quote':
            if (!block.text?.trim()) return null
            return (
                <blockquote
                    key={index}
                    className="rounded-r-2xl border-l-4 border-slate-300 bg-slate-50 py-3 pl-4 italic text-slate-600"
                >
                    {block.text}
                </blockquote>
            )

        case 'link':
            if (!block.url || !block.label) return null
            return (
                <a
                    key={index}
                    href={block.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline underline-offset-4"
                >
                    {block.label}
                </a>
            )

        default:
            return null
    }
}

export default async function NewsDetailPage({ params }: Props) {
    const { locale, slug } = await params
    const translation = await getNewsBySlug(locale, slug)

    if (!translation || !translation.news.websitePublished) {
        notFound()
    }

    await incrementViews(translation.news.id)

    const content = safeParseContent(translation.contentJson)
    const canonicalUrl = `${getBaseUrl()}/${locale}/news/${slug}`
    const shortUrl = translation.news.shortLink
        ? `${getBaseUrl()}/s/${translation.news.shortLink.code}`
        : canonicalUrl

    const coverImage = getAbsoluteUrl(translation.news.coverImage)
    const shareText = encodeURIComponent(
        `${translation.title}${translation.excerpt ? ` - ${translation.excerpt}` : ''}`
    )

    const latestNewsRaw = await prisma.news.findMany({
        where: {
            websitePublished: true,
            id: {
                not: translation.news.id,
            },
        },
        take: 8,
        include: {
            translations: {
                where: { locale },
            },
        },
        orderBy: {
            websitePublishedAt: 'desc',
        },
    })

    const latestNews = latestNewsRaw
        .map((item) => {
            const t = item.translations[0]
            if (!t) return null

            return {
                id: item.id,
                slug: t.slug,
                title: t.title,
                date: item.websitePublishedAt,
            }
        })
        .filter(Boolean) as Array<{
            id: string
            slug: string
            title: string
            date: Date | null
        }>

    return (
        <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 md:pt-28">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,860px)_320px] xl:justify-between">
                <article className="min-w-0 space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            {translation.news.websitePublishedAt ? (
                                <span>{formatDate(translation.news.websitePublishedAt, locale)}</span>
                            ) : null}
                            <span>•</span>
                            <span>{translation.news.views} views</span>
                        </div>

                        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                            {translation.title}
                        </h1>

                        {translation.excerpt ? (
                            <p className="max-w-3xl text-lg leading-8 text-slate-600">
                                {translation.excerpt}
                            </p>
                        ) : null}
                    </div>

                    {coverImage ? (
                        <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100">
                            <Image
                                src={coverImage}
                                alt={translation.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 860px"
                            />
                        </div>
                    ) : null}

                    <div className="space-y-6">{content.map((block, i) => renderBlock(block, i))}</div>

                    <div className="mt-10 flex flex-wrap gap-3 border-t pt-6">
                        <a
                            href={`https://t.me/share/url?url=${encodeURIComponent(shortUrl)}&text=${shareText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
                        >
                            Telegram
                        </a>

                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}&text=${shareText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
                        >
                            Twitter
                        </a>

                        <CopyLinkButton url={shortUrl} />
                    </div>
                </article>

                <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                    <div className="rounded-2xl border bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Latest news</h3>

                        <div className="mt-4 divide-y">
                            {latestNews.length ? (
                                latestNews.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/${locale}/news/${item.slug}`}
                                        className="block py-3 transition hover:opacity-80"
                                    >
                                        <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-800">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">{formatDate(item.date, locale)}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className="py-3 text-sm text-slate-500">Yangiliklar topilmadi</p>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-900 to-blue-700 p-5 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Telegram</p>

                        <h3 className="mt-2 text-xl font-semibold leading-tight">Kanalimizga qo‘shiling</h3>

                        <p className="mt-3 text-sm leading-6 text-slate-200">
                            Eng so‘nggi yangiliklar, e’lonlar va foydali postlarni birinchi bo‘lib
                            Telegram kanalimizda kuzating.
                        </p>

                        <a
                            href="https://t.me/enwis_news"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                        >
                            Kanalga o‘tish
                        </a>
                    </div>
                </aside>
            </div>
        </main>
    )
}