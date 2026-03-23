import Link from 'next/link'

type Props = {
    children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
        </div>
    )
}