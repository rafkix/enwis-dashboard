'use client'

import { useEffect } from "react"
import { Play, Star, Zap, PenLine, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AOS from "aos"
import "aos/dist/aos.css"
import { motion } from "framer-motion"

export function Hero() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <section className="relative pt-26 pb-20 lg:pt-36 bg-[#fffefc] overflow-hidden" id="home">
            
            {/* DAFTAR FON EFFEKTI */}
            <div className="absolute inset-0 z-0 opacity-[0.1]" 
                 style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
            />
            <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">

                {/* CHAP TOMON: MATNLAR */}
                <div className="space-y-8 text-center lg:text-left">
                    <motion.div 
                        initial={{ rotate: -2, x: -10 }}
                        animate={{ rotate: 0, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-yellow-100 border border-yellow-200 text-yellow-800 text-xs font-bold tracking-widest uppercase shadow-sm"
                    >
                        <Zap size={14} fill="currentColor" />
                        <span>Lesson #01: AI Mastery</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] text-slate-800 tracking-tight">
                        Master Vocabulary <br />
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10 italic font-serif text-blue-600">with AI.</span>
                            {/* Marker bilan bo'yalgan fon */}
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '110%' }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute inset-0 -left-[5%] bg-blue-100/60 -skew-x-12 h-[80%] top-[15%] -z-10" 
                            />
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed italic font-medium">
                        "ENWIS helps learners build real exam confidence. We use smart tools and <span className="border-b-2 border-red-300">CEFR-IELTS</span> simulations."
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 pt-4">
                        <Button className="h-16 px-10 bg-slate-900 hover:bg-slate-800 text-white text-lg rounded-none border-b-4 border-r-4 border-slate-700 active:translate-y-1 transition-all">
                            <Play className="mr-2 fill-current" size={20} /> <a
  href="https://cefr.enwis.uz"
  className="px-4 py-2 text-[13px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-tight transition-all"
>
  Start Mock Test
</a>

                        </Button>
                        <div className="relative inline-block group">
                            <Button variant="outline" className="h-16 px-10 border-2 border-slate-300 text-slate-700 text-lg rounded-none hover:bg-slate-50 transition-all font-mono">
                                Try Free Demo
                            </Button>
                            {/* Qo'lda chizilgan strelka */}
                            <div className="absolute -right-12 -bottom-8 text-blue-400 hidden lg:block -rotate-12">
                                <MousePointer2 size={32} />
                                <span className="text-[10px] font-bold uppercase italic">Click here!</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* O'NG TOMON: "DRAFT" USLUBIDAGI RASYM */}
                <div className="relative flex justify-center lg:justify-end group">
                    {/* Rasm ramkasi - xuddi daftarga yopishtirilgan rasmdek */}
                    <div className="relative p-4 bg-white border-2 border-slate-200 shadow-[20px_20px_0px_0px_rgba(226,232,240,1)] rotate-3 group-hover:rotate-0 transition-transform duration-500 max-w-[500px]">
                        
                        {/* Tepasidagi "Skotch" (Tape) */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 border border-slate-100 backdrop-blur-sm -rotate-2 z-20 shadow-sm" />

                        <img
                            src="/person.png"
                            className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                            alt="Student Notes"
                        />

                        {/* Qo'lda chizilgan "Eslatmalar" */}
                        <div className="absolute -left-10 top-1/4 bg-lime-100 p-3 border-l-4 border-lime-500 shadow-md -rotate-6 hidden md:block">
                            <p className="text-[10px] font-bold text-lime-800 uppercase italic">Vocabulary Focus ✨</p>
                        </div>

                        <div className="absolute -right-8 bottom-1/4 bg-pink-100 p-3 border-l-4 border-pink-500 shadow-md rotate-6 hidden md:block">
                            <p className="text-[10px] font-bold text-pink-800 uppercase italic">IELTS Ready!</p>
                        </div>
                    </div>

                    {/* Fon uchun Scribble (Aylana) */}
                    <div className="absolute -z-10 top-0 right-0 text-slate-100">
                        <svg width="400" height="400" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* STATS SECTION - MINIMALIST "HAND-DRAWN" STYLE */}
            <div className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
                    {[
                        { num: "11+", text: "Years Exp.", note: "Verified" },
                        { num: "100K+", text: "Active Students", note: "Global" },
                        { num: "14", text: "Branches", note: "Growing" },
                        { num: "500+", text: "Mentors", note: "Certified" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 group hover:bg-slate-50 transition-colors relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-4xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.num}
                                </p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.text}</p>
                                {/* Tagiga chizilgan "scribble" */}
                                <div className="mt-2 text-[10px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    // {item.note}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chetki bezak */}
            <div className="absolute bottom-10 left-10 text-slate-300 hidden lg:block italic font-serif text-sm">
                <PenLine size={20} className="inline mr-2" /> Study hard, dream big.
            </div>
        </section>
    )
}