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
        <section className="relative w-full py-24 xl:py-0">
            <div className="container-shell">
                <div className="relative overflow-hidden  border border-teal-200/40 bg-[linear-gradient(135deg,rgba(15,118,110,0.96),rgba(13,148,136,0.92),rgba(5,150,105,0.9))] px-8 py-16 shadow-[0_45px_100px_-30px_rgba(13,148,136,0.45)] md:px-16 md:py-20 xl:px-20 xl:py-24">
                    <CTABackgroundPattern />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur-md"
                        >
                            <Sparkles size={14} className="text-teal-100" />
                            {dict.cta.eyebrow}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mx-auto mt-8 max-w-[13ch] text-4xl font-[1000] leading-[1.02] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl xl:text-7xl"
                        >
                            {dict.cta.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl"
                        >
                            {dict.cta.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
                        >
                            <Link
                                href={`${siteConfig.authUrl}?lang=${locale}`}
                                className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-8 text-sm font-black text-teal-900 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-teal-50 active:scale-[0.97]"
                            >
                                {dict.cta.primaryBtn}
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-8 w-8 rounded-full border-2 border-teal-700/40 bg-white/70"
                                        />
                                    ))}
                                </div>

                                <span className="text-sm font-bold text-white/80">
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

function CTABackgroundPattern() {
    return (
        <div className="pointer-events-none absolute inset-0">
            {/* base light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(110,231,183,0.16),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_35%)]" />

            {/* floating glows */}
            <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute -right-12 top-16 h-64 w-64 rounded-full bg-cyan-200/15 blur-3xl" />
            <div className="absolute bottom-0 left-[18%] h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            {/* subtle grid */}
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:36px_36px]" />

            {/* top line glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* decorative ring */}
            <div className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute right-[10%] top-[20%] h-24 w-24 rounded-full border border-white/10" />

            {/* diagonal texture */}
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(135deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
    );
}