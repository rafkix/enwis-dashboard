"use client"

import { useEffect } from "react"
import type React from "react"
import { isTelegramApp } from "@/lib/telegram-utils"

interface TelegramProviderProps {
    children: React.ReactNode
}

export function TelegramProvider({ children }: TelegramProviderProps) {
    useEffect(() => {
        if (typeof window === "undefined") return

        if (isTelegramApp()) {
        const html = document.documentElement
        const body = document.body

        // Save original styles (important!)
        const originalHtmlHeight = html.style.height
        const originalBodyHeight = body.style.height
        const originalBodyOverflow = body.style.overflow

        // Apply Telegram overrides
        html.style.height = "100%"
        body.style.height = "100%"
        body.style.overflow = "hidden"

        // Cleanup
        return () => {
            html.style.height = originalHtmlHeight
            body.style.height = originalBodyHeight
            body.style.overflow = originalBodyOverflow
        }
        }
    }, [])

    return <>{children}</>
}
