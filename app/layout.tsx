import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { Link } from "lucide-react"
import { Header } from "@radix-ui/react-accordion"
import { Footer } from "react-day-picker"


export const metadata: Metadata = {
    title: "E N W I S - English Now With Intelligent System",
    description: "Learn foreign words with AI-powered personalized vocabulary practice, smart spaced repetition, and intelligent recommendations",
    generator: "rafkix.uz",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <link rel="icon" href="https://image2url.com/images/1764944410839-0e0e3e25-d678-4801-9f49-011a4d8f6de0.png" />
        <script src="https://telegram.org/js/telegram-widget.js?22" async />
        <body>
            <AuthProvider>
                {children}
            </AuthProvider>
        </body>
        </html>
    )
}
