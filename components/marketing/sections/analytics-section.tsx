"use client";

import { motion } from "framer-motion";
import {
    Users,
    BookOpen,
    GraduationCap,
    Globe,
    CheckCircle2,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type AnalyticsSectionProps = {
    dict: Dictionary;
};

export function AnalyticsSection({ dict }: AnalyticsSectionProps) {
    const stats = [
        {
            label: dict.analytics.students,
            value: "15K+",
            icon: Users,
            gradient: "from-teal-500 to-emerald-400",
            border: "border-teal-100/70",
        },
        {
            label: dict.analytics.courses,
            value: "120+",
            icon: BookOpen,
            gradient: "from-emerald-500 to-lime-400",
            border: "border-emerald-100/70",
        },
        {
            label: dict.analytics.graduates,
            value: "98%",
            icon: GraduationCap,
            gradient: "from-cyan-500 to-teal-400",
            border: "border-cyan-100/70",
        },
        {
            label: dict.analytics.countries,
            value: "12+",
            icon: Globe,
            gradient: "from-slate-600 to-slate-400",
            border: "border-slate-200/80",
        },
    ];

    return (
        <section id="analytics" className="relative py-24 xl:py-32">
            <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 xl:px-16">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[760px]"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 backdrop-blur-md">
                            <CheckCircle2 size={14} />
                            {dict.analytics.eyebrow}
                        </div>

                        {/* 🔥 STATIC TITLE */}
                        <h2 className="mt-6 text-4xl font-[1000] tracking-[-0.04em] text-teal-950 md:text-5xl xl:text-6xl">
                            {dict.analytics.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[520px]"
                    >
                        <p className="text-lg leading-relaxed text-slate-600 md:text-right xl:text-[19px]">
                            {dict.analytics.description}
                        </p>
                    </motion.div>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`group relative overflow-hidden rounded-[40px] border ${stat.border} bg-white/72 p-8 xl:p-10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/90 hover:shadow-[0_40px_80px_-20px_rgba(16,153,136,0.15)]`}
                        >
                            <div
                                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-[0.08] blur-2xl transition-transform duration-700 group-hover:scale-150`}
                            />

                            <div className="relative">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 text-teal-600">
                                    <stat.icon size={28} strokeWidth={2.5} />
                                </div>

                                <div className="mt-8 xl:mt-10">
                                    <h3 className="text-4xl font-[1000] tracking-tighter text-teal-950 xl:text-5xl">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                        {stat.label}
                                    </p>
                                </div>

                                <div
                                    className={`mt-7 h-1 w-12 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-500 group-hover:w-full`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}