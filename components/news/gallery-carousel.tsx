'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type GalleryItem = {
    url?: string
    alt?: string
    ratio?: '16:9' | '4:3' | '1:1' | 'auto'
}

type Props = {
    items: GalleryItem[]
    prevLabel: string
    nextLabel: string
    goToImageTemplate: string
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

export default function GalleryCarousel({
    items,
    prevLabel,
    nextLabel,
    goToImageTemplate,
}: Props) {
    const validItems = useMemo(
        () =>
            items
                .map((item) => ({
                    ...item,
                    resolvedUrl: getAbsoluteUrl(item.url),
                }))
                .filter((item) => item.resolvedUrl),
        [items]
    )

    const [current, setCurrent] = useState(0)

    if (!validItems.length) return null

    const currentItem = validItems[current]
    const aspectClass = getAspectClass(currentItem.ratio || '16:9')

    const goPrev = () => {
        setCurrent((prev) => (prev === 0 ? validItems.length - 1 : prev - 1))
    }

    const goNext = () => {
        setCurrent((prev) => (prev === validItems.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <div
                    className={`relative overflow-hidden rounded-2xl bg-slate-100 ${aspectClass || 'min-h-[260px]'
                        }`}
                >
                    <Image
                        src={currentItem.resolvedUrl!}
                        alt={currentItem.alt || ''}
                        fill
                        className={aspectClass ? 'object-cover' : 'object-contain'}
                        sizes="(max-width: 1280px) 100vw, 860px"
                    />
                </div>

                {validItems.length > 1 ? (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label={prevLabel}
                            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label={nextLabel}
                            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white"
                        >
                            ›
                        </button>
                    </>
                ) : null}
            </div>

            {validItems.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {validItems.map((item, index) => {
                        const thumbAspect = getAspectClass(item.ratio || '4:3')
                        const goToImageLabel = goToImageTemplate.replace(
                            '{index}',
                            String(index + 1)
                        )

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrent(index)}
                                aria-label={goToImageLabel}
                                className={`relative w-24 shrink-0 overflow-hidden rounded-xl border transition ${index === current
                                        ? 'border-slate-900'
                                        : 'border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                <div
                                    className={`relative bg-slate-100 ${thumbAspect || 'h-20'
                                        }`}
                                >
                                    <Image
                                        src={item.resolvedUrl!}
                                        alt={item.alt || ''}
                                        fill
                                        className={
                                            thumbAspect ? 'object-cover' : 'object-contain'
                                        }
                                        sizes="96px"
                                    />
                                </div>
                            </button>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}