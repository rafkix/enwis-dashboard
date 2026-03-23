'use client'

import { useEffect, useState } from 'react'

type Props = {
    title: string
}

export function ShareButtons({ title }: Props) {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedTitle = encodeURIComponent(title)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(currentUrl)
        } catch (error) {
            console.error('Copy failed:', error)
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
                Telegram
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
                Facebook
            </a>

            <button
                type="button"
                onClick={handleCopy}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
                Copy link
            </button>
        </div>
    )
}