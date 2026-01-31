"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, RotateCcw, AlertTriangle, FileQuestion, ServerCrash, LifeBuoy } from "lucide-react"

interface ErrorViewProps {
    code: string | number
    title: string
    description: string
    type: "404" | "500" | "maintenance"
    reset?: () => void
}

export function ErrorView({ code, title, description, type, reset }: ErrorViewProps) {
    const router = useRouter()

    // Ikonkalar va ranglar tipiga qarab o'zgaradi
    const config = {
        "404": {
            icon: FileQuestion,
            color: "text-[#17776A]",
            bg: "bg-[#17776A]/10",
            glow: "rgba(23, 119, 106, 0.5)",
            subIcon: <div className="absolute -top-2 -right-2 text-2xl">?</div>
        },
        "500": {
            icon: ServerCrash,
            color: "text-red-600",
            bg: "bg-red-50",
            glow: "rgba(220, 38, 38, 0.5)",
            subIcon: <AlertTriangle size={18} className="absolute -top-2 -right-2 text-red-500" />
        },
        "maintenance": {
            icon: LifeBuoy,
            color: "text-blue-600",
            bg: "bg-blue-50",
            glow: "rgba(37, 99, 235, 0.5)",
            subIcon: null
        }
    }

    const theme = config[type]

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            
            {/* BACKGROUND MAGIC */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ backgroundImage: 'radial-gradient(#17776A 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
                    style={{ background: theme.glow }}
                />
            </div>

            {/* MAIN CARD */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-lg w-full bg-white/70 backdrop-blur-[50px] border border-white rounded-[3rem] p-10 md:p-16 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
            >
                {/* ICON ANIMATION */}
                <div className={`w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-xl border border-white relative group ${theme.bg}`}>
                    <theme.icon size={48} className={`${theme.color} relative z-10`} />
                    {theme.subIcon}
                    <div className={`absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity ${theme.bg}`} />
                </div>

                {/* TEXT CONTENT */}
                <h1 className="text-8xl font-[1000] text-slate-900 tracking-tighter leading-none mb-2 select-none">
                    {code}
                </h1>
                
                <h2 className="text-2xl font-extrabold text-slate-800 mb-4 uppercase tracking-wide">
                    {title}
                </h2>
                
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                    {description}
                </p>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {reset ? (
                        <button 
                            onClick={() => reset()}
                            className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-slate-800 shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> Qayta urinish
                        </button>
                    ) : (
                        <button 
                            onClick={() => router.back()}
                            className="h-14 px-8 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm uppercase tracking-wider hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} /> Ortga
                        </button>
                    )}

                    <Link 
                        href="/" 
                        className={`h-14 px-8 rounded-2xl text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 ${type === '500' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#17776A] hover:bg-[#136358]'}`}
                    >
                        <Home size={18} /> Bosh sahifa
                    </Link>
                </div>

            </motion.div>

            <div className="mt-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                Enwis System • Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
        </div>
    )
}