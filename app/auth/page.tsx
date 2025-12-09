import { Header } from "@/components/landing/header"

import { Footer } from "@/components/landing/footer"
import AuthPage from "./mainAuth"

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <AuthPage/>
        </main>
    )
}