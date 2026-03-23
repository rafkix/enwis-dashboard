import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isValidLocale } from '@/lib/i18n/locales'

type Props = {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ page?: string }>
}

const PAGE_SIZE = 9
const HEADER_OFFSET = 'pt-24 sm:pt-28 lg:pt-32'

function formatDate(date: Date | null, locale: string) {
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

function buildPageHref(locale: string, page: number) {
    return page <= 1 ? `/${locale}/news` : `/${locale}/news?page=${page}`
}

function getPreviewText(text: string | null, maxLength = 160) {
    const value = (text || '').replace(/\s+/g, ' ').trim()
    if (!value) return ''
    if (value.length <= maxLength) return value
    return `${value.slice(0, maxLength).trim()}...`
}

function getPagination(currentPage: number, totalPages: number) {
    const pages: number[] = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
}

export default async function NewsPage({ params, searchParams }: Props) {
    const { locale } = await params
    const { page } = await searchParams

    if (!isValidLocale(locale)) {
        notFound()
    }

    const dict = await getDictionary(locale)
    const currentPage = Math.max(1, Number(page) || 1)
    const skip = (currentPage - 1) * PAGE_SIZE

    const where = {
        websitePublished: true,
        translations: {
            some: { locale },
        },
    }

    const [totalCount, news] = await Promise.all([
        prisma.news.count({ where }),
        prisma.news.findMany({
            where,
            include: {
                translations: {
                    where: { locale },
                    select: {
                        slug: true,
                        title: true,
                        excerpt: true,
                    },
                },
            },
            orderBy: {
                websitePublishedAt: 'desc',
            },
            skip,
            take: PAGE_SIZE,
        }),
    ])

    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    if (currentPage > totalPages && totalCount > 0) {
        notFound()
    }

    const items = news
        .map((item) => {
            const t = item.translations[0]
            if (!t) return null

            return {
                id: item.id,
                coverImage: item.coverImage,
                publishedAt: item.websitePublishedAt,
                views: item.views,
                slug: t.slug,
                title: t.title,
                excerpt: t.excerpt,
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    const pages = getPagination(currentPage, totalPages)

    if (items.length === 0) {
        return (
            <main className={`mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 ${HEADER_OFFSET}`}>
                <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
                    <h1 className="text-xl font-semibold">{dict.news.emptyTitle}</h1>
                    <p className="mt-2 text-sm text-slate-500">{dict.news.emptyDesc}</p>
                </div>
            </main>
        )
    }

    return (
        <main className={`mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 ${HEADER_OFFSET}`}>
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-md"
                    >
                        {item.coverImage ? (
                            <Link href={`/${locale}/news/${item.slug}`} className="block">
                                <div className="aspect-[16/10] bg-slate-100">
                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </Link>
                        ) : (
                            <div className="aspect-[16/10] bg-slate-100" />
                        )}

                        <div className="p-5">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                {item.publishedAt ? (
                                    <span>{formatDate(item.publishedAt, locale)}</span>
                                ) : null}

                                <span className="h-1 w-1 rounded-full bg-slate-300" />

                                <span>
                                    {item.views} {dict.news.views}
                                </span>
                            </div>

                            <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-900">
                                <Link href={`/${locale}/news/${item.slug}`} className="hover:underline">
                                    {item.title}
                                </Link>
                            </h2>

                            {item.excerpt ? (
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {getPreviewText(item.excerpt)}
                                </p>
                            ) : null}

                            <div className="mt-5">
                                <Link
                                    href={`/${locale}/news/${item.slug}`}
                                    className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
                                >
                                    {dict.news.readMore}
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {totalPages > 1 ? (
                <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <Link
                        href={buildPageHref(locale, currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={`rounded-xl border px-4 py-2 text-sm ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-slate-50'
                            }`}
                    >
                        {dict.news.prev}
                    </Link>

                    {pages[0] > 1 ? (
                        <>
                            <Link
                                href={buildPageHref(locale, 1)}
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
                            >
                                1
                            </Link>
                            {pages[0] > 2 ? <span className="px-2 text-sm text-slate-500">...</span> : null}
                        </>
                    ) : null}

                    {pages.map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            href={buildPageHref(locale, pageNumber)}
                            className={`rounded-xl border px-4 py-2 text-sm ${pageNumber === currentPage
                                    ? 'bg-slate-900 text-white'
                                    : 'hover:bg-slate-50'
                                }`}
                        >
                            {pageNumber}
                        </Link>
                    ))}

                    {pages[pages.length - 1] < totalPages ? (
                        <>
                            {pages[pages.length - 1] < totalPages - 1 ? (
                                <span className="px-2 text-sm text-slate-500">...</span>
                            ) : null}
                            <Link
                                href={buildPageHref(locale, totalPages)}
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
                            >
                                {totalPages}
                            </Link>
                        </>
                    ) : null}

                    <Link
                        href={buildPageHref(locale, currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className={`rounded-xl border px-4 py-2 text-sm ${currentPage === totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'hover:bg-slate-50'
                            }`}
                    >
                        {dict.news.next}
                    </Link>
                </nav>
            ) : null}
        </main>
    )
}