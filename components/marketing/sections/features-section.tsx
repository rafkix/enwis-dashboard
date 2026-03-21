"use client";

import { BookOpenCheck, BarChart3, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FeaturesSectionProps = {
    dict: Dictionary;
};

const icons = [BookOpenCheck, BarChart3, Brain] as const;

export function FeaturesSection({ dict }: FeaturesSectionProps) {
    return (
        <section
            id="features"
            className="relative overflow-hidden bg-white py-24 xl:py-32"
        >
            {/* Animatsiyali fon elementlari */}
            <SoftBackgroundShapes />

            <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 xl:px-16">
                {/* Sarlavha va tavsif - Ikki tomonga ajratilgan (Desktopda) */}
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px]"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 backdrop-blur-sm">
                            <Sparkles size={14} className="animate-pulse" />
                            {dict.features.eyebrow}
                        </div>

                        <h2 className="mt-8 text-4xl font-[1000] leading-[1.1] tracking-[-0.04em] text-teal-950 md:text-5xl lg:text-6xl">
                            {dict.features.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-[500px]"
                    >
                        <p className="text-lg leading-relaxed text-slate-600 md:text-right">
                            {dict.features.description}
                        </p>
                    </motion.div>
                </div>

                {/* Kartochkalar to'plami */}
                <div className="mt-20 grid gap-8 md:grid-cols-3">
                    {dict.features.items.map((item, index) => {
                        const Icon = icons[index] ?? Brain;

                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: [0.21, 1, 0.36, 1]
                                }}
                                className="group relative rounded-[40px] border border-slate-100 bg-white/60 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-[0_48px_96px_-32px_rgba(16,153,136,0.12)] xl:p-10"
                            >
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative">
                                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-400 text-white shadow-lg shadow-teal-200/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                        <Icon size={30} strokeWidth={2.5} />
                                    </div>

                                    <h3 className="text-2xl font-bold tracking-tight text-teal-950">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-slate-100">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            whileInView={{ x: "0%" }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full w-full bg-gradient-to-r from-teal-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function SoftBackgroundShapes() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                    x: [0, 20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -30, 0],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -bottom-20 h-[600px] w-[600px] rounded-full bg-emerald-100/30 blur-[120px]"
            />
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(16,153,136,0.02),transparent_60%)]" />
        </div>
    );
}