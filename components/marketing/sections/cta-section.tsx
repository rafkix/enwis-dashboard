"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";

type CTASectionProps = {
    dict: Dictionary;
    locale: Locale;
};

export function CTASection({ dict, locale }: CTASectionProps) {
    return (
        <section className="w-full py-24 bg-white">
            <div className="container-shell">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-50 border border-slate-100 px-8 py-16 md:px-16 md:py-20">

                    {/* Fon uchun nozik dekor (ko'zga tashlanmaydigan) */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
                        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-3xl text-center">
                        {/* Kichik sarlavha */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-teal-700"
                        >
                            <Sparkles size={14} />
                            {dict.cta.eyebrow}
                        </motion.div>

                        {/* Asosiy Sarlavha */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
                        >
                            {dict.cta.title}
                        </motion.h2>

                        {/* Tavsif */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-lg font-medium leading-relaxed text-slate-500 md:text-xl"
                        >
                            {dict.cta.description}
                        </motion.p>

                        {/* Tugmalar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Link
                                href={`${siteConfig.authUrl}?lang=${locale}`}
                                className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-teal-600 px-8 text-base font-bold text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-200 active:scale-95"
                            >
                                {dict.cta.primaryBtn}
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>

                            {/* Qo'shimcha ma'lumot (Social proof) */}
                            <div className="flex items-center gap-3 px-4 py-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-50 bg-slate-200" />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-slate-400">
                                    {dict.cta.stats}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}