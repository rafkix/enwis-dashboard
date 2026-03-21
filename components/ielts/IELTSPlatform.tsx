"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Award, CheckCircle2, ArrowRight } from "lucide-react";

export function IELTSPlatform({ locale, page }: { locale: any; page: any }) {
    return (
        <section className="py-24 bg-white lg:py-32 relative overflow-hidden">
            {/* Orqa fon effektlari */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-100/50 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* CHAP TOMON: Deep Red Engine Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1 perspective-2000 group"
                    >
                        <motion.div
                            style={{ transformStyle: "preserve-3d" }}
                            whileHover={{ rotateY: -10, rotateX: 5 }}
                            className="relative aspect-square max-w-[540px] mx-auto transition-all duration-700 ease-out"
                        >
                            {/* 1. ASOSIY QIZIL KARTA (BASE) */}
                            <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-red-600 via-red-700 to-red-900 shadow-[0_50px_100px_-20px_rgba(220,38,38,0.5)] border border-white/20 overflow-hidden">

                                {/* Dinamik yorug'lik va "Noise" teksturasi */}
                                <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                                <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-orange-400/20 blur-[120px] rounded-full animate-pulse" />

                                {/* Orqa fondagi katta ikonka (Dekor) */}
                                <TrendingUp
                                    className="text-white/[0.05] absolute -bottom-10 -left-10 rotate-12 transition-transform group-hover:scale-110 duration-1000"
                                    size={450}
                                />

                                <div className="relative z-10 p-12 h-full flex flex-col justify-between" style={{ transform: "translateZ(60px)" }}>
                                    <div>
                                        <div className="flex items-center justify-between mb-12">
                                            {/* Oq rangdagi Zap ikonkasi */}
                                            <div className="h-20 w-20 rounded-[1.8rem] bg-white text-red-600 flex items-center justify-center shadow-[0_20px_40px_rgba(255,255,255,0.2)]">
                                                <Zap size={42} fill="currentColor" />
                                            </div>

                                            {/* Live Badge */}
                                            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                                                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                                                <span className="text-[10px] text-white font-black uppercase tracking-widest text-left">{page.ai}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                                            {page.ai1} <br />
                                            <span className="text-red-100/80 italic">{page.ai2}</span>
                                        </h4>

                                        <p className="text-red-50 text-lg font-light leading-relaxed max-w-[320px] opacity-80">
                                            {page.ai_dec}
                                        </p>
                                    </div>

                                    {/* Markaziy Vidjet: Oq/Glassmorphism Dashboard */}
                                    <div
                                        className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl"
                                        style={{ transform: "translateZ(100px)" }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] text-red-50 font-black uppercase tracking-[0.2em] text-left">System Analysis</span>
                                            <span className="text-white text-xs font-bold text-left">Processing...</span>
                                        </div>

                                        <div className="flex items-end gap-2 mb-4">
                                            <span className="text-5xl font-black text-white tracking-tighter text-left">8.5</span>
                                            <div className="flex flex-col mb-1 text-left leading-none">
                                                <span className="text-red-100 font-bold text-[12px]">BAND SCORE</span>
                                                <span className="text-[10px] text-red-200 opacity-60">Expert Level</span>
                                            </div>
                                        </div>

                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "88%" }}
                                                transition={{ duration: 2, ease: "circOut" }}
                                                className="h-full bg-white rounded-full relative"
                                            >
                                                <div className="absolute inset-0 bg-red-400/20 animate-pulse" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. FLOATING WHITE BADGE (CONTRAST) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                style={{ transform: "translateZ(150px)" }}
                                className="absolute -right-8 top-1/3 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] rounded-[2.2rem] p-6 border border-white hidden xl:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-100">
                                        <Award size={26} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-left">Status</p>
                                        <p className="text-xl font-black text-slate-900 leading-none text-left">Elite 1%</p>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </motion.div>

                    {/* O'NG TOMON: Text Kontent */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 rounded-full bg-red-50 px-5 py-2.5 border border-red-100 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                            </span>
                            <span className="text-xs font-black uppercase tracking-[0.15em] text-red-600">{page.eyebrow}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1] tracking-tighter"
                        >
                            {page.title_part1}{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-red-600 italic">{page.title_highlight}</span>
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 w-full h-3"
                                    viewBox="0 0 100 10"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#FCA5A5" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                                </motion.svg>
                            </span>{" "}
                            {page.title_part2}
                        </motion.h2>

                        <p className="text-xl text-slate-500 font-light mb-12 leading-relaxed max-w-xl">
                            {page.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-12">
                            {page.items.map((item: string, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                                        <CheckCircle2 size={20} className="text-red-600 group-hover:text-white" />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={`/auth?lang=${locale}`}
                                className="group w-full sm:w-auto inline-flex h-16 items-center justify-center rounded-[1.5rem] bg-slate-900 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-red-600 hover:shadow-[0_20px_40px_rgba(220,38,38,0.3)]"
                            >
                                {page.cta}
                                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}