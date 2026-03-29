'use client'

import { useEffect } from 'react'

type AdSlotProps = {
    label?: string
    className?: string

    // ads
    type?: 'yandex' | 'google'
    blockId?: string
    containerId?: string
}

export function AdSlot({
    label = 'Reklama',
    className = '',
    type = 'yandex',
    blockId,
    containerId,
}: AdSlotProps) {
    useEffect(() => {
        if (type !== 'yandex') return
        if (!blockId || !containerId) return

        if (!window.yaContextCb) return

        window.yaContextCb.push(() => {
            try {
                // @ts-ignore
                Ya.Context.AdvManager.render({
                    blockId,
                    renderTo: containerId,
                })
            } catch (e) {
                console.error('Yandex Ad error:', e)
            }
        })
    }, [type, blockId, containerId])

    return (
        <div
            className={`rounded-2xl border border-dashed bg-slate-50 p-6 text-center ${className}`}
        >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>

            {/* Yandex Ad */}
            {type === 'yandex' && blockId && containerId ? (
                <div id={containerId} className="mt-4 min-h-[100px]" />
            ) : (
                <div className="mt-3 text-sm text-slate-400">
                    Google Ads / Yandex Ads joyi
                </div>
            )}
        </div>
    )
}