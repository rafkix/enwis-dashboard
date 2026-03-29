'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Send } from 'lucide-react'
import type { TelegramChannel } from '@/lib/telegram-channels'

type TelegramPromoMessages = {
    title: string
    description: string
    button: string
    badge: string
}

type TGadsPageProps = {
    messages: TelegramPromoMessages
    channels: TelegramChannel[]
    className?: string
    rotateEveryMs?: number
}

export default function TGadsPage({
    messages,
    channels,
    className = '',
    rotateEveryMs = 5000,
}: TGadsPageProps) {
    const safeChannels = useMemo(
        () => channels.filter((item) => item.url && item.handle),
        [channels]
    )

    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (safeChannels.length <= 1) return

        const interval = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % safeChannels.length)
        }, rotateEveryMs)

        return () => window.clearInterval(interval)
    }, [safeChannels.length, rotateEveryMs])

    if (safeChannels.length === 0) return null

    const currentChannel = safeChannels[index]

    return (
        <div className={className}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <Send className="h-5 w-5 text-white" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            {messages.title}
                        </p>
                        <p className="text-xs text-blue-100">
                            {messages.badge}
                        </p>
                    </div>
                </div>

                {safeChannels.length > 1 && (
                    <div className="text-xs text-blue-100">
                        {index + 1}/{safeChannels.length}
                    </div>
                )}
            </div>

            <div className="mt-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                    {currentChannel.name}
                </p>

                <Link
                    href={currentChannel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm text-blue-100 hover:text-white"
                >
                    <span>{currentChannel.handle}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <p className="mt-3 text-sm leading-6 text-blue-50">
                    {currentChannel.description || messages.description}
                </p>

                <Link
                    href={currentChannel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-medium text-blue-900 transition hover:bg-blue-50"
                >
                    {messages.button}
                </Link>
            </div>

            {safeChannels.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                    {safeChannels.map((channel, dotIndex) => (
                        <button
                            key={channel.id}
                            type="button"
                            aria-label={channel.name}
                            onClick={() => setIndex(dotIndex)}
                            className={`h-2.5 w-2.5 rounded-full transition ${dotIndex === index ? 'bg-white' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}