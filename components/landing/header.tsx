"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import {
    Home, BookCheck, BarChart3, User, Contact, Search,
    ArrowRight, Wallet, LayoutGrid, SquareGanttChart, Newspaper, LogIn,
    Menu, X, ChevronRight, // Yangi iconlar
    Zap
} from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
    ssr: false,
})

export function Header() {
    // --- STATE ---
    const [isMobile, setIsMobile] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false) // Mobil menyu holati

    const isLoggedIn = false

    const pathname = usePathname()
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Sahifa o'zgarganda menyuni yopish
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Body scrollni bloklash (menyu ochilganda)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Header stili logikasi
    const isTransparentPage = pathname === '/' || pathname.startsWith('/exams/[ID]')
    const isHeaderTransparent = isTransparentPage && !scrolled && !isOpen
    const isWhiteText = pathname.startsWith('/exams/[ID]') && !scrolled && !isOpen

    useEffect(() => {
        setMounted(true)
        const update = () => {
            setIsMobile(window.innerWidth < 1024)
            setScrolled(window.scrollY > 20)
        }
        update()
        window.addEventListener("resize", update)
        window.addEventListener("scroll", update)
        return () => {
            window.removeEventListener("resize", update)
            window.removeEventListener("scroll", update)
        }
    }, [])

    const navItems = isLoggedIn ? [
        { name: "Kabinet", href: "/dashboard", icon: LayoutGrid },
        { name: "Imtihonlar", href: "/exams", icon: BookCheck },
        { name: "Natijalar", href: "/results", icon: BarChart3 },
        { name: "Hamyon", href: "/billing", icon: Wallet },
    ] : [
        { name: "Asosiy", href: "/", icon: Home },
        { name: "Imtihonlar", href: "/exams", icon: BookCheck },
        { name: "Tariflar", href: "/pricing", icon: Wallet },
        { name: "B2B Business", href: "/business", icon: SquareGanttChart },
        { name: "Blog", href: "/blog", icon: Newspaper },
        { name: "Bog'lanish", href: "/contacts", icon: Contact }
    ]

    const activeItems = isLoggedIn ? navItems : navItems.slice(0, 6)

    if (!mounted) return null

    return (
        <>
            {/* 1. PROGRESS BAR */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#17776A] to-emerald-400 origin-left z-[120]"
                style={{ scaleX }}
            />

            {/* 2. HEADER (Desktop & Mobile Wrapper) */}
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen ? "py-3" : "py-5"
                }`}>
                <nav className={`mx-auto transition-all duration-500 flex justify-between items-center px-6 md:px-10 rounded-2xl ${(scrolled || isOpen)
                        ? "max-w-6xl h-16 bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-sm" // Scrolled or Open
                        : isHeaderTransparent
                            ? "max-w-[1440px] h-20 bg-transparent" // Top Transparent
                            : "max-w-[1440px] h-20 bg-white/60 backdrop-blur-md border border-white/40" // Default
                    }`}>

                    {/* --- LOGO --- */}
                    <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95 z-50">
                        <img
                            src="/enwis.png"
                            alt="Enwis Logo"
                            className={`h-8 md:h-9 w-auto object-contain transition-all duration-300 ${isWhiteText ? "brightness-0 invert opacity-90" : ""
                                }`}
                        />
                    </Link>

                    {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
                    {!isMobile && (
                        <>
                            <div className={`flex items-center gap-1 p-1 rounded-xl border transition-all duration-300 ${isHeaderTransparent ? 'bg-white/10 border-white/10 backdrop-blur-md' : 'bg-slate-100/50 border-slate-200/50'
                                }`}>
                                {activeItems.slice(0, 6).map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${isActive
                                                    ? "bg-white text-[#17776A] shadow-sm"
                                                    : isWhiteText
                                                        ? "text-white/90 hover:text-white hover:bg-white/10"
                                                        : "text-slate-600 hover:text-[#17776A] hover:bg-white/60"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Desktop Actions */}
                            <div className="flex items-center gap-4">
                                <button className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isWhiteText ? "text-white hover:bg-white/10" : "text-slate-500 hover:bg-slate-100 hover:text-[#17776A]"
                                    }`}>
                                    <Search size={20} />
                                </button>

                                <div className={`h-6 w-[1px] ${isWhiteText ? "bg-white/20" : "bg-slate-200"}`} />

                                {isLoggedIn ? (
                                    <Link href="/profile">
                                        <div className="flex items-center gap-3 pl-2 pr-1 py-1 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all cursor-pointer">
                                            <span className="text-sm font-bold text-slate-700 pl-2">Azizbek</span>
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[#17776A] font-bold">A</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href="/auth">
                                        <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <div className="bg-[#17776A] hover:bg-[#136358] text-white font-bold uppercase text-[11px] tracking-widest rounded-xl px-6 h-10 flex items-center justify-center shadow-lg shadow-[#17776A]/20 transition-all cursor-pointer">
                                                Kirish <ArrowRight size={16} className="ml-2" />
                                            </div>
                                        </MotionDiv>
                                    </Link>
                                )}
                            </div>
                        </>
                    )}

                    {/* --- MOBILE HAMBURGER (Visible on Mobile) --- */}
                    {isMobile && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-xl transition-colors z-50 ${isWhiteText && !isOpen ? "text-white bg-white/10" : "text-slate-800 bg-slate-100"
                                    }`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    )}
                </nav>
            </header>

            {/* 3. MOBILE MENU OVERLAY (Standard) */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[90] bg-white pt-28 px-6 pb-10 overflow-y-auto"
                    >
                        <div className="flex flex-col h-full justify-between">
                            {/* Links */}
                            <div className="flex flex-col gap-2">
                                {activeItems.map((item, idx) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive
                                                    ? "bg-[#17776A]/10 text-[#17776A]"
                                                    : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className={`p-2 rounded-xl ${isActive ? "bg-white text-[#17776A]" : "bg-slate-100 text-slate-500"}`}>
                                                <item.icon size={22} />
                                            </div>
                                            <span className="text-lg font-bold">{item.name}</span>
                                            {isActive && <ChevronRight className="ml-auto" size={20} />}
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Actions Footer */}
                            <div className="mt-8 space-y-4">
                                <Link href={isLoggedIn ? "/exam/new" : "/auth"} className="w-full block">
                                    <Button className="w-full h-14 bg-[#17776A] hover:bg-[#136358] text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#17776A]/20">
                                        {isLoggedIn ? <Zap size={20} /> : <LogIn size={20} />}
                                        {isLoggedIn ? "Sinovni Boshlash" : "Tizimga Kirish"}
                                    </Button>
                                </Link>

                                {/* Qo'shimcha info */}
                                <div className="flex justify-center gap-6 text-slate-400 mt-4">
                                    <Link href="/about" className="text-xs font-medium hover:text-[#17776A]">Biz Haqimizda</Link>
                                    <Link href="/privacy" className="text-xs font-medium hover:text-[#17776A]">Maxfiylik</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}