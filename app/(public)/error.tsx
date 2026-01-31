"use client"

import { ErrorView } from "@/components/shared/ErrorView"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Xatolikni log qilish (Sentry yoki boshqa servislarga)
        console.error(error)
    }, [error])

    return (
        <ErrorView 
            code="500"
            type="500"
            title="Tizim xatoligi"
            description="Biz tomonda kutilmagan nosozlik yuz berdi. Xavotir olmang, biz bu haqida xabar topdik."
            reset={reset} // Qayta urinib ko'rish tugmasi uchun
        />
    )
}