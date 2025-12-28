"use client"

import { Sparkles, Target, GraduationCap, PenLine, Scissors, Paperclip } from "lucide-react"
import { motion } from "framer-motion"

export function AboutUsSection() {
    return (
        <section className="py-32 bg-[#fffefc] relative overflow-hidden" id="about-us">
            
            {/* DAFTAR FON EFFEKTI */}
            <div className="absolute inset-0 z-0 opacity-[0.1]" 
                 style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
            />
            <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

            {/* DEKORATIV ELEMENTLAR (Scribbles) */}
            <div className="absolute top-10 right-10 opacity-20 rotate-12 hidden lg:block">
                <Scissors size={100} className="text-slate-400" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Sarlavha - Xuddi o'quvchi katta harflar bilan chizganidek */}
                <div className="relative mb-32">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative inline-block"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter uppercase relative z-10">
                            Our Story <br />
                            <span className="text-blue-500 italic font-serif">& Mission</span>
                        </h2>
                        {/* Sarlavha tagidagi to'lqinli chiziq */}
                        <svg className="absolute -bottom-4 left-0 w-full" height="12" viewBox="0 0 400 12">
                            <path d="M0 10C50 2 150 2 200 8C250 12 350 2 400 8" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                    
                    <div className="absolute -top-10 right-0 md:right-20 rotate-6 bg-white p-4 border border-slate-200 shadow-sm max-w-[250px] hidden md:block">
                        <p className="font-mono text-[11px] text-slate-400 leading-tight italic">
                            "Since 2014, we've been sketching the future of English education in Uzbekistan..."
                        </p>
                    </div>
                </div>

                {/* Content - "Tartibsiz" joylashgan varaqlar */}
                <div className="relative min-h-[600px] md:min-h-[400px]">

                    {/* 1. Clear Path - Chapda yuqorida */}
                    <motion.div 
                        initial={{ opacity: 0, rotate: -5 }}
                        whileInView={{ opacity: 1, rotate: -2 }}
                        whileHover={{ rotate: 0, scale: 1.02, zIndex: 50 }}
                        className="md:absolute top-0 left-0 p-8 bg-emerald-50 border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm mb-10 md:mb-0"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-200 border border-slate-800 rounded-sm">
                                <Target className="w-6 h-6 text-emerald-700" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Clear Path</h3>
                        </div>
                        <p className="text-slate-700 font-serif italic text-lg leading-snug">
                            Step-by-step lessons designed to help learners progress from zero to hero.
                        </p>
                        <div className="mt-4 flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 bg-emerald-400 rounded-full" />)}
                        </div>
                    </motion.div>

                    {/* 2. Expert Guidance - Markazda biroz pastroqda */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ rotate: 0, scale: 1.02, zIndex: 50 }}
                        className="md:absolute top-20 left-1/2 md:-translate-x-1/2 p-8 bg-rose-50 border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm rotate-2 mb-10 md:mb-0"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <Paperclip className="text-slate-400 rotate-12" size={32} />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-200 border border-slate-800 rounded-sm">
                                <GraduationCap className="w-6 h-6 text-rose-700" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Expertise</h3>
                        </div>
                        <p className="text-slate-700 font-serif italic text-lg leading-snug">
                            Lessons are created by teachers who actually know how to communicate in the real world.
                        </p>
                    </motion.div>

                    {/* 3. Modern Tech - O'ngda yuqorida */}
                    <motion.div 
                        initial={{ opacity: 0, rotate: 5 }}
                        whileInView={{ opacity: 1, rotate: 3 }}
                        whileHover={{ rotate: 0, scale: 1.02, zIndex: 50 }}
                        className="md:absolute top-5 right-0 p-8 bg-blue-50 border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-200 border border-slate-800 rounded-sm">
                                <Sparkles className="w-6 h-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter">Modern Tech</h3>
                        </div>
                        <p className="text-slate-700 font-serif italic text-lg leading-snug">
                            Smart repetition and AI tools to make you remember 10x faster and longer.
                        </p>
                        {/* Markerli "Draft" chizig'i */}
                        <div className="mt-4 h-2 w-full bg-blue-200/50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '80%' }}
                                className="h-full bg-blue-500"
                            />
                        </div>
                    </motion.div>

                </div>

                {/* Pastki qismdagi qo'lda chizilgan "Eslatma" */}
                <div className="mt-32 relative text-center">
                    <div className="inline-block relative px-10 py-4 border-4 border-slate-800 border-dashed rounded-[50px_10px_40px_10px]">
                        <p className="font-mono text-sm font-black text-slate-800 uppercase tracking-widest">
                            We don't just teach, we build thinkers.
                        </p>
                        <PenLine className="absolute -right-8 -top-8 text-slate-300 -rotate-12" size={48} />
                    </div>
                </div>

            </div>
        </section>
    )
}