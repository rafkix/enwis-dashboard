"use client"

import { ErrorView } from "@/components/shared/ErrorView"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <ErrorView 
                    code="CRITICAL"
                    type="500"
                    title="Kritik Xatolik"
                    description="Ilova to'liq ishdan chiqdi. Iltimos, sahifani yangilang yoki keyinroq urinib ko'ring."
                    reset={reset}
                />
            </body>
        </html>
    )
}