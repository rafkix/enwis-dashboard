'use client'

import { BookOpen, CheckCircle, Trophy, Coffee, Star, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
    {
        icon: BookOpen,
        title: "Free teacher support",
        description: "Assistant teachers available 24/7 for student help. Don't hesitate to ask!",
        marker: "bg-[#b0fc40]/40", 
        sketch: "border-b-2 border-dashed border-lime-500",
        note: "Always online ✨"
    },
    {
        icon: CheckCircle,
        title: "Test Center",
        description: "Separate test center for MOCK and real IELTS exams. Special biology & chemistry tests.",
        marker: "bg-[#2ec500]/30",
        sketch: "ring-2 ring-green-400 ring-offset-4 rounded-[20%_80%_20%_80%]",
        note: "IELTS 8.5 Zone"
    },
    {
        icon: Trophy,
        title: "Free Events",
        description: "Student battles, quizzes, and chess tournaments with prizes. Join the fun!",
        marker: "bg-[#2b85ff]/30",
        sketch: "border-2 border-blue-400 rounded-lg skew-x-3",
        note: "Win Prizes! 🏆"
    },
    {
        icon: Coffee,
        title: "Study Zones",
        description: "Comfortable zones for remote learning with refreshments. Best coffee in town.",
        marker: "bg-[#ff7eb9]/30",
        sketch: "border-b-4 border-double border-pink-400",
        note: "Coffee is free ☕"
    },
]

export function WhyChooseUs() {
    return (
        <section className="py-20 bg-[#fdfdfb] relative overflow-hidden font-sans" id="why-choose-us">
            
            {/* PAPER BACKGROUND EFFECT */}
            {/* Horizontal lines */}
            <div className="absolute inset-0 z-0 opacity-[0.15]" 
                 style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
            />
            {/* Vertical margin line (Daftar hoshiyasi) */}
            <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                
                {/* Header Section */}
                <div className="mb-24 relative inline-block">
                    <motion.span 
                        initial={{ rotate: -5, scale: 0.9 }}
                        whileInView={{ rotate: -12, scale: 1 }}
                        className="absolute -top-8 -left-8 bg-blue-600 text-white text-[10px] px-2 py-1 font-bold rounded-sm shadow-sm"
                    >
                        TOP SECRET? NO!
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
                        Why choose <span className="relative">
                            ENWIS
                            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                                <path d="M0 5C30 2 70 2 100 5" stroke="#2b85ff" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>?
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                    {reasons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative group"
                        >
                            {/* Marker Highlight behind Title */}
                            <div className="relative inline-block mb-4">
                                <div className={`absolute -inset-1 sm:-inset-2 ${item.marker} -skew-x-12 transform group-hover:scale-110 transition-transform duration-300 rounded-sm`} />
                                <h3 className="relative text-2xl font-black text-slate-900 flex items-center gap-3">
                                    <span className="text-slate-400 font-mono text-sm">0{i+1}.</span>
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description with Sketch styles */}
                            <div className={`p-4 transition-all duration-300 ${item.sketch} hover:bg-white/50 backdrop-blur-[1px]`}>
                                <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                                    {item.description}
                                </p>
                            </div>

                            {/* Hand-written Side Note */}
                            <div className="mt-4 flex items-center gap-2">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                    Note: {item.note}
                                </span>
                            </div>

                            {/* Random Scribbles (Faqat ayrimlarida chiqadi) */}
                            {i === 0 && (
                                <div className="absolute -right-8 top-0 text-blue-300/40 -rotate-12 hidden lg:block">
                                    <ArrowRight size={60} strokeWidth={1} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Scribble */}
                <div className="mt-24 text-center">
                    <div className="inline-block relative p-4 border-2 border-slate-200 border-dashed rounded-xl">
                        <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">
                            End of notes — See you in class!
                        </p>
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center border border-red-200 text-red-500 font-bold text-xs rotate-12">
                            OK!
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Scribble SVGs */}
            <div className="absolute top-[20%] right-[5%] opacity-[0.05] pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <path d="M20,50 Q80,20 150,80 T180,150" fill="none" stroke="black" strokeWidth="2" />
                    <circle cx="150" cy="50" r="20" fill="none" stroke="black" strokeWidth="2" />
                </svg>
            </div>
        </section>
    )
}