"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, ShieldCheck, Database, Server } from "lucide-react"

// Yuklanish paytida chiqadigan statuslar
const loadingStates = [
    { text: "AI Tizimi ishga tushmoqda...", icon: Zap },
    { text: "Xavfsizlik protokollari tekshirilmoqda...", icon: ShieldCheck },
    { text: "Ma'lumotlar bazasi bilan aloqa...", icon: Database },
    { text: "Interfeys yuklanmoqda...", icon: Server },
]

export default function Loading() {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Matnni har 1.5 soniyada almashtirish
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % loadingStates.length)
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 bg-[#F8FAFC] z-[9999] flex flex-col items-center justify-center overflow-hidden font-sans">
            
            {/* 1. BACKGROUND ENGINE */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ backgroundImage: 'radial-gradient(#17776A 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                {/* Glow Effect */}
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#17776A]/5 rounded-full blur-[100px]"
                />
            </div>

            {/* 2. MAIN LOADER (CORE) */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-12">
                
                {/* Outer Ring (Rotating) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-slate-200 border-t-[#17776A] border-r-[#17776A]/50 w-full h-full"
                />
                
                {/* Middle Ring (Reverse Rotating) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-slate-100 border-b-slate-300 w-24 h-24"
                />

                {/* Center Core (Pulsing) */}
                <motion.div
                    animate={{ scale: [1, 0.9, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#17776A]/20 border border-slate-100 z-10"
                >
                    <div className="w-3 h-3 bg-[#17776A] rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-[#17776A] rounded-full relative z-10" />
                </motion.div>

                {/* Particles */}
                <div className="absolute inset-0 animate-spin-slow opacity-50">
                    <div className="absolute top-0 left-1/2 w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="absolute left-0 top-1/2 w-1 h-1 bg-slate-400 rounded-full" />
                </div>
            </div>

            {/* 3. DYNAMIC TEXT STATUS */}
            <div className="h-10 relative flex items-center justify-center w-full max-w-md px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]"
                    >
                        {React.createElement(loadingStates[currentIndex].icon, { size: 16, className: "text-[#17776A]" })}
                        {loadingStates[currentIndex].text}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 4. PROGRESS BAR (Fake Progress) */}
            <div className="w-64 h-1 bg-slate-100 rounded-full mt-8 overflow-hidden relative">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#17776A] to-transparent w-full"
                />
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Enwis System v4.0
            </div>
        </div>
    )
}