"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Home, Layers, Brain, User, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
    ssr: false,
})

export function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

    useEffect(() => {
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

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#why-choose-us" },
        { name: "About", href: "#about-us" },
        { name: "Writing", href: "/writing" },
        { name: "Team", href: "#team" },
    ]

    return (
        <>
            {/* Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#EAB308] origin-left z-[100]" style={{ scaleX }} />

            {!isMobile && (
                <header className={`fixed left-0 right-0 z-[60] transition-all duration-500 px-8 ${scrolled ? "top-3" : "top-6"}`}>
                    <nav className={`max-w-7xl mx-auto px-6 h-16 flex justify-between items-center transition-all duration-500 
                        ${scrolled ? "bg-white border-2 border-slate-900 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl" : "bg-transparent"}`}>
                        
                        {/* 🏷️ LOGO STICKER - Balanslangan variant */}
                        <MotionDiv 
                            whileHover={{ rotate: 0, scale: 1.05 }}
                            // paddingni kamaytirib, balandlikni h-10 (40px) ga chekladik
                            className="relative bg-white border-2 border-slate-900 px-2 py-1 -rotate-2 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center h-10"
                        >
                            {/* Skotch bo'lagi - yanada ingichka va ixcham */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-blue-400/20 backdrop-blur-[1px] border-x border-blue-500/10 rotate-6 pointer-events-none" />
                            
                            <Link href="/" className="flex items-center">
                                <img 
                                    src="enwis.jpg" 
                                    alt="ENWIS Logo" 
                                    // rasm o'lchami w-12 dan w-14 gacha (taxminan 50-60px)
                                    className="w-12 md:w-14 h-auto object-contain max-h-6" 
                                />
                            </Link>
                        </MotionDiv>

                        {/* 📑 NAV ITEMS */}
                        <div className="flex items-center gap-1 lg:gap-2">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.name}
                                    href={item.href} 
                                    className="px-4 py-2 text-[13px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-tight transition-all"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* 🔓 AUTH BUTTONS */}
                        <div className="flex items-center gap-4">
                            <Link href="/auth" className="text-[12px] font-black text-slate-500 hover:text-slate-900 uppercase">
                                Sign In
                            </Link>
                            <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="bg-[#EAB308] hover:bg-[#FACC15] text-slate-900 font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none px-6 h-10 uppercase italic transition-all">
                                    Get Started
                                </Button>
                            </MotionDiv>
                        </div>
                    </nav>
                </header>
            )}

            {/* 📱 MOBILE TABBAR */}
            <AnimatePresence>
                {isMobile && (
                    <MotionDiv 
                        initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                        className="fixed bottom-6 left-6 right-6 z-[100] bg-white border-[3px] border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-[2rem] px-2 py-3"
                    >
                        <div className="flex justify-around items-end">
                            <MobileTab href="#home" icon={<Home size={22} />} label="Home" index={1} />
                            <MobileTab href="#why-choose-us" icon={<Layers size={22} />} label="Features" index={2} />
                            <MobileTab href="/writing" icon={<Brain size={26} />} label="AI" index={3} isSpecial />
                            <MobileTab href="#team" icon={<User size={22} />} label="Team" index={4} />
                            <MobileTab href="/auth" icon={<Pencil size={22} />} label="Login" index={5} />
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    )
}

function MobileTab({ href, icon, label, index, isSpecial = false }: any) {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group">
            <div 
                className={`
                    flex items-center justify-center transition-all
                    ${isSpecial ? 
                        "w-16 h-16 bg-[#EAB308] border-[3px] border-slate-900 -mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl rotate-3" : 
                        "p-2 text-slate-400 group-hover:text-slate-900"
                    }
                `}
            >
                {icon}
            </div>
            {!isSpecial && <span className="text-[10px] font-black text-slate-800 uppercase">{label}</span>}
        </Link>
    )
}