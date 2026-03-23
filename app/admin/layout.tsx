import Link from 'next/link'

type Props = {
    children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <Link href="/admin" className="text-lg font-semibold text-slate-900">
                        Admin Panel
                    </Link>

                    <nav className="flex items-center gap-3">
                        <Link
                            href="/admin/news"
                            className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                        >
                            News
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
        </div>
    )
}