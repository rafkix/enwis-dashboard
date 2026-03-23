type AdSlotProps = {
    label?: string
    className?: string
}

export function AdSlot({
    label = 'Reklama',
    className = '',
}: AdSlotProps) {
    return (
        <div
            className={`rounded-2xl border border-dashed bg-slate-50 p-6 text-center ${className}`}
        >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>
            <div className="mt-3 text-sm text-slate-400">
                Google Ads / Yandex Ads joyi
            </div>
        </div>
    )
}