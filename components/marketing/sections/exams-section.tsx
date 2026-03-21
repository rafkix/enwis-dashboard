"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type ExamsSectionProps = {
    dict: Dictionary;
    locale: Locale;
};

export function ExamsSection({ dict, locale }: ExamsSectionProps) {
    // Dizayn sozlamalari (faqat vizual qismi, matnlar dict dan keladi)
    const examDetails = [
        {
            key: "cefr" as const,
            icon: GraduationCap,
            gradient: "from-teal-500 to-emerald-400",
            bgLight: "bg-teal-50/50",
            border: "border-teal-100",
        },
        {
            key: "multilevel" as const,
            icon: Award,
            gradient: "from-emerald-500 to-lime-400",
            bgLight: "bg-emerald-50/50",
            border: "border-emerald-100",
        },
        {
            key: "ielts" as const,
            icon: Star,
            gradient: "from-cyan-500 to-teal-400",
            bgLight: "bg-cyan-50/50",
            border: "border-cyan-100",
        },
    ];

    return (
        <section id="exams" className="relative overflow-hidden bg-white py-24 xl:py-32">
            {/* Fon bezagi */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 xl:px-16">
                {/* Sarlavha qismi: Chapda sarlavha, o'ngda tavsif */}
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px]"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 ring-1 ring-emerald-100">
                            <CheckCircle2 size={14} />
                            {dict.exams.eyebrow}
                        </div>
                        <h2 className="mt-6 text-4xl font-[1000] tracking-[-0.04em] text-teal-950 md:text-5xl xl:text-6xl">
                            {dict.exams.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[500px]"
                    >
                        <p className="mb-4 text-lg leading-relaxed text-slate-600 md:text-right">
                            {dict.exams.description}
                        </p>
                        <div className="flex md:justify-end">
                            <Link
                                href={`/${locale}/exams`}
                                className="group inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition-colors hover:text-teal-600"
                            >
                                {dict.exams.viewAll}
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 transition-transform group-hover:translate-x-1">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Imtihon kartochkalari */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {examDetails.map((exam, index) => {
                        const examData = dict.exams[exam.key];

                        return (
                            <motion.article
                                key={exam.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`group relative overflow-hidden rounded-[40px] border ${exam.border} ${exam.bgLight} p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(16,153,136,0.15)]`}
                            >
                                {/* Abstrakt nur effekti */}
                                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${exam.gradient} opacity-[0.08] blur-2xl transition-transform duration-700 group-hover:scale-150`} />

                                <div className="relative">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 text-teal-600">
                                        <exam.icon size={28} strokeWidth={2.5} />
                                    </div>

                                    <h3 className="mt-8 text-2xl font-[1000] tracking-tight text-teal-950">
                                        {examData.title}
                                    </h3>

                                    <p className="mt-4 text-[15px] leading-7 text-slate-600">
                                        {examData.description}
                                    </p>

                                    {/* Imkoniyatlar ro'yxati */}
                                    <ul className="mt-8 space-y-3">
                                        {examData.features.map((feature: string, fIndex: number) => (
                                            <li key={fIndex} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                                <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${exam.gradient}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10">
                                        <Link
                                            href={`/${locale}/exams/${exam.key}`}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-teal-900 shadow-sm ring-1 ring-teal-100 transition-all hover:bg-teal-950 hover:text-white hover:shadow-md"
                                        >
                                            {dict.exams.startTest}
                                            <ArrowRight size={16} />
                                        </Link>
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