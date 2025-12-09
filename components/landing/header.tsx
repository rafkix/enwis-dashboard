"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {Home, Settings, Layers, PenBox, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 1024) // lg breakpoint
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    return (
        <>
        {/* DESKTOP HEADER — faqat lg dan yuqorida ko‘rsatiladi */}
        {!isMobile && (
            <header
            className="
            w-full z-50 static
            lg:fixed lg:top-0 lg:left-0
            bg-white/20 backdrop-blur-md border-b border-white/30
            "
            >
            <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                <Link href="/" className="flex items-center gap-2 select-none">
                    <img src="/enwis.png" alt="WALLE" className="w-35 h-35 object-contain" />
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="#home" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">Home</Link>
                    <Link href="#why-choose-us" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">Why-choose-us</Link>
                    <Link href="#about-us" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">About Us</Link>
                    <Link href="/writing" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">Wrting Checker</Link>
                    <Link href="#team" className="text-lg font-medium text-gray-900 hover:text-blue-600 transition">Team</Link>
                </div>

                <div className="flex items-center gap-3">
                <Link href="/auth/#signin">
                    <Button size="sm" className="bg-destructive hover:bg-accent text-white cursor-pointer">Sign In</Button>
                </Link>
                <Link href="/auth/#signup">
                    <Button size="sm" className="bg-destructive hover:bg-accent text-white cursor-pointer">Get Started</Button>
                </Link>
                </div>

            </nav>
            </header>
        )}

        {/* MOBILE TABBAR — faqat lg dan pastlarda */}
        {isMobile && <BottomMenu />}
        </>
    )
}

/* ------------------------------------------------------------------
MOBILE BOTTOM MENU
-------------------------------------------------------------------- */
function BottomMenu() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-300 shadow-xl py-2">
            <div className="flex justify-around text-gray-600 text-xs">
                <MobileTab href="#home" icon={<Home size={22} />} label="Home" />
                <MobileTab href="#why-choose-us" icon={<Layers size={22} />} label="Why-choose-us" />
                <MobileTab href="#team" icon={<PenBox size={22} />} label="Team" />
                <MobileTab href="/writing" icon={<Brain size={22} />} label="Wrting Checking" />
                <MobileTab href="/auth" icon={<Settings size={22} />} label="Account" />
            </div>
        </div>
    )
}

function MobileTab({ href, icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group transition relative">
        <div className="group-hover:text-blue-600 transition">{icon}</div>
        <span className="group-hover:text-blue-600 transition">{label}</span>
        <span className="absolute -bottom-0.5 h-0.5 w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
        </Link>
    )
}
