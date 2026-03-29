import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import CopyLinkButton from '@/components/news/copy-link-button'
import GalleryCarousel from '@/components/news/gallery-carousel'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { defaultLocale, isValidLocale, type Locale } from '@/lib/i18n/locales'

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

type NewsMessages = {
    emptyTitle: string
    emptyDesc: string
    readMore: string
    hide: string
    views: string
    prev: string
    next: string
    articleLabel: string
    shareLabel: string
    relatedTitle: string
    backToList: string
    ctaDefault: string
    home: string
    listTitle: string
    latestTitle: string
    joinTelegramTitle: string
    joinTelegramDesc: string
    joinTelegramCta: string
    introFallback: string
    youtubeTitle: string
    goToImage: string
    metaDefaultTitle: string
    metaDefaultDescription: string
}

function resolveLocale(locale: string): Locale {
    return isValidLocale(locale) ? locale : defaultLocale
}

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
        .filter(
            (block): block is Extract<Block, { type: 'paragraph' }> =>
                block.type === 'paragraph'
        )
        .map((block) => block.text?.trim() || '')
        .filter(Boolean)

    const text = paragraphs.join(' ').replace(/\s+/g, ' ').trim()
    return text.slice(0, 160)
}

function getPlainTextContent(contentJson?: string | null) {
    const content = safeParseContent(contentJson)

    return content
        .map((block) => {
            if (
                block.type === 'paragraph' ||
                block.type === 'heading' ||
                block.type === 'quote'
            ) {
                return block.text?.trim() || ''
            }

            if (block.type === 'link') {
                return block.label?.trim() || ''
            }

            return ''
        })
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function buildSeoDescription(
    excerpt?: string | null,
    contentJson?: string | null,
    fallback?: string
) {
    const raw =
        getDescription(excerpt, contentJson) ||
        getPlainTextContent(contentJson).slice(0, 160) ||
        fallback ||
        'Latest news and useful updates.'

    return raw.length > 160 ? `${raw.slice(0, 157)}...` : raw
}

function buildOgLocale(locale: Locale) {
    switch (locale) {
        case 'uz':
            return 'uz_UZ'
        case 'ru':
            return 'ru_RU'
        case 'en':
            return 'en_US'
        default:
            return 'uz_UZ'
    }
}

function buildAlternateLanguagesFromTranslations(
    translations: Array<{ locale: string; slug: string }>
) {
    const base = getBaseUrl()
    if (!base) return undefined

    const languages: Record<string, string> = {}

    for (const item of translations) {
        const locale = resolveLocale(item.locale)
        if (!item.slug) continue
        languages[locale] = `${base}/${locale}/news/${item.slug}`
    }

    const fallback = translations.find((item) => item.locale === 'uz') || translations[0]

    if (fallback?.slug) {
        const fallbackLocale = resolveLocale(fallback.locale)
        languages['x-default'] = `${base}/${fallbackLocale}/news/${fallback.slug}`
    }

    return languages
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
                    translations: true,
                },
            },
        },
    })
}

async function getNewsMessages(locale: Locale): Promise<NewsMessages> {
    const dict = await getDictionary(locale)
    const news = (dict?.news || {}) as Partial<NewsMessages>

    return {
        emptyTitle: news.emptyTitle || 'No news found',
        emptyDesc: news.emptyDesc || 'No published news yet.',
        readMore: news.readMore || 'Read more',
        hide: news.hide || 'Hide',
        views: news.views || 'Views',
        prev: news.prev || 'Previous',
        next: news.next || 'Next',
        articleLabel: news.articleLabel || 'Article',
        shareLabel: news.shareLabel || 'Share',
        relatedTitle: news.relatedTitle || 'Read more',
        backToList: news.backToList || 'Back to news',
        ctaDefault: news.ctaDefault || 'Read more',
        home: news.home || 'Home',
        listTitle: news.listTitle || 'News',
        latestTitle: news.latestTitle || 'Latest news',
        joinTelegramTitle: news.joinTelegramTitle || 'Join our channel',
        joinTelegramDesc:
            news.joinTelegramDesc ||
            'Follow the latest news and useful posts on our Telegram channel.',
        joinTelegramCta: news.joinTelegramCta || 'Go to channel',
        introFallback:
            news.introFallback ||
            'This article contains useful information, media blocks, and additional links related to the topic.',
        youtubeTitle: news.youtubeTitle || 'YouTube video',
        goToImage: news.goToImage || 'Go to image {index}',
        metaDefaultTitle: news.metaDefaultTitle || 'News',
        metaDefaultDescription:
            news.metaDefaultDescription || 'Latest news and useful updates.',
    }
}

function renderBlock(block: Block, index: number, ui: NewsMessages) {
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
                        <figcaption className="text-sm text-slate-500">
                            {block.caption}
                        </figcaption>
                    ) : null}
                </figure>
            )
        }

        case 'gallery': {
            const items = Array.isArray(block.items) ? block.items : []
            if (!items.length) return null

            return (
                <GalleryCarousel
                    key={index}
                    items={items}
                    prevLabel={ui.prev}
                    nextLabel={ui.next}
                    goToImageTemplate={ui.goToImage}
                />
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
                        title={ui.youtubeTitle}
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale: rawLocale, slug } = await params
    const locale = resolveLocale(rawLocale)
    const ui = await getNewsMessages(locale)
    const translation = await getNewsBySlug(locale, slug)

    if (!translation || !translation.news.websitePublished) {
        return {
            title: ui.metaDefaultTitle,
            description: ui.metaDefaultDescription,
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const title = translation.title.trim()
    const description = buildSeoDescription(
        translation.excerpt,
        translation.contentJson,
        ui.metaDefaultDescription
    )
    const canonicalUrl = `${getBaseUrl()}/${locale}/news/${slug}`
    const image = getAbsoluteUrl(translation.news.coverImage)

    return {
        title,
        description,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        alternates: {
            canonical: canonicalUrl,
            languages: buildAlternateLanguagesFromTranslations(
                translation.news.translations.map((item) => ({
                    locale: item.locale,
                    slug: item.slug,
                }))
            ),
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'article',
            locale: buildOgLocale(locale),
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

export default async function NewsDetailPage({ params }: Props) {
    const { locale: rawLocale, slug } = await params
    const locale = resolveLocale(rawLocale)
    const ui = await getNewsMessages(locale)
    const translation = await getNewsBySlug(locale, slug)

    if (!translation || !translation.news.websitePublished) {
        notFound()
    }

    void incrementViews(translation.news.id)

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

    const description = buildSeoDescription(
        translation.excerpt,
        translation.contentJson,
        ui.metaDefaultDescription
    )

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: translation.title,
        description,
        image: coverImage ? [coverImage] : [],
        datePublished: translation.news.websitePublishedAt?.toISOString(),
        dateModified: translation.news.websitePublishedAt?.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'ENWIS',
        },
        publisher: {
            '@type': 'Organization',
            name: 'ENWIS',
            logo: {
                '@type': 'ImageObject',
                url: `${getBaseUrl()}/enwis.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
        inLanguage: locale,
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: ui.home,
                item: `${getBaseUrl()}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: ui.listTitle,
                item: `${getBaseUrl()}/${locale}/news`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: translation.title,
                item: canonicalUrl,
            },
        ],
    }

    return (
        <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 md:pt-28">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="grid gap-8 xl:grid-cols-[minmax(0,860px)_320px] xl:justify-between">
                <article className="min-w-0 space-y-6">
                    <nav className="text-sm text-slate-500">
                        <Link href={`/${locale}`} className="hover:text-slate-900">
                            {ui.home}
                        </Link>
                        <span className="px-2">/</span>
                        <Link href={`/${locale}/news`} className="hover:text-slate-900">
                            {ui.listTitle}
                        </Link>
                        <span className="px-2">/</span>
                        <span className="line-clamp-1 text-slate-700">{translation.title}</span>
                    </nav>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            {translation.news.websitePublishedAt ? (
                                <span>{formatDate(translation.news.websitePublishedAt, locale)}</span>
                            ) : null}
                            <span>•</span>
                            <span>
                                {translation.news.views} {ui.views}
                            </span>
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

                    <div className="space-y-6">
                        <p className="text-lg leading-8 text-slate-700">
                            {ui.introFallback}
                        </p>

                        {content.map((block, i) => renderBlock(block, i, ui))}

                        {latestNews.length > 0 ? (
                            <section className="mt-10 rounded-2xl border bg-slate-50 p-5">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    {ui.relatedTitle}
                                </h2>
                                <div className="mt-4 grid gap-3">
                                    {latestNews.slice(0, 3).map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/${locale}/news/${item.slug}`}
                                            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:text-slate-900 hover:shadow-sm"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ) : null}
                    </div>

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

                    <div className="pt-2">
                        <Link
                            href={`/${locale}/news`}
                            className="inline-flex text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
                        >
                            {ui.backToList}
                        </Link>
                    </div>
                </article>

                <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                    <div className="rounded-2xl border bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            {ui.latestTitle}
                        </h3>

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
                                        <p className="mt-1 text-xs text-slate-500">
                                            {formatDate(item.date, locale)}
                                        </p>
                                    </Link>
                                ))
                            ) : (
                                <div className="py-3">
                                    <p className="text-sm font-medium text-slate-800">
                                        {ui.emptyTitle}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {ui.emptyDesc}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-900 to-blue-700 p-5 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                            Telegram
                        </p>

                        <h3 className="mt-2 text-xl font-semibold leading-tight">
                            {ui.joinTelegramTitle}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-200">
                            {ui.joinTelegramDesc}
                        </p>

                        <a
                            href="https://t.me/enwis_news"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                        >
                            {ui.joinTelegramCta}
                        </a>
                    </div>
                </aside>
            </div>
        </main>
    )
}