"use client";

import Link from "next/link";
import {
    ArrowRight,
    Sparkles,
    GraduationCap,
    Brain,
    Layers3,
    Headphones,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";

type HeroSectionProps = {
    locale: Locale;
    dict: Dictionary;
};

export function HeroSection({ locale, dict }: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-[#fafdfc] text-slate-900">
            {/* 1. Yangilangan Navro'z uslubidagi fon */}
            <HeroBackground />

            <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 pb-20 pt-28 sm:px-8 md:px-10 md:pb-24 md:pt-32 lg:px-12 xl:px-16 xl:pb-28 xl:pt-36">
                <div className="grid items-center gap-14 lg:gap-16 xl:grid-cols-[0.88fr_1.12fr] xl:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[620px] xl:max-w-[640px]"
                    >
                        {/* Bayramona Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-teal-700 backdrop-blur">
                            <Sparkles size={14} className="text-teal-500" />
                            {dict.hero.badge}
                        </div>

                        <h1 className="mt-7 max-w-[12ch] text-5xl font-[1000] leading-[0.95] tracking-[-0.06em] text-teal-950 sm:text-6xl lg:text-7xl xl:text-[84px]">
                            {dict.hero.title}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-8 xl:text-2xl xl:leading-9">
                            {dict.hero.description}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href={`${siteConfig.authUrl}?lang=${locale}`}
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#109988] px-8 text-sm font-black text-white shadow-[0_22px_40px_-15px_rgba(16,153,136,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#0d7f72] active:scale-[0.97]"
                            >
                                {dict.hero.primaryCta}
                                <ArrowRight size={18} className="ml-2" />
                            </a>

                            <Link
                                href={`/${locale}#tracks`}
                                className="inline-flex h-14 items-center justify-center rounded-2xl border border-teal-200 bg-white px-8 text-sm font-black text-teal-800 transition-all duration-300 hover:border-[#109988] hover:bg-[#109988]/5"
                            >
                                {dict.hero.secondaryCta}
                            </Link>
                        </div>
                    </motion.div>

                    {/* O'ng tarafdagi interaktiv karta */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.95, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative mx-auto w-full max-w-[720px]">
                            {/* Yashil glow effekti */}
                            <div className="absolute inset-0 -z-10 rounded-full bg-teal-400/20 blur-[100px]" />

                            <div className="relative aspect-[3.5/3] rounded-[40px] bg-white p-4 shadow-[0_40px_100px_-20px_rgba(16,153,136,0.12)] border border-teal-50">
                                <div className="flex h-full flex-col rounded-[32px] border border-slate-100 bg-[#f8fbfa] p-5">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-600">
                                                ENWIS
                                            </div>
                                            <div className="mt-2 text-xl font-[1000] tracking-tight text-slate-950 xl:text-2xl">
                                                {dict.hero.preview.leftCardLabel}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <WhiteTrackCard
                                            icon={<Headphones size={18} />}
                                            title={dict.hero.preview.tiles[0].title}
                                            subtitle={dict.hero.preview.tiles[0].subtitle}
                                        />
                                        <WhiteTrackCard
                                            icon={<GraduationCap size={18} />}
                                            title={dict.hero.preview.tiles[1].title}
                                            subtitle={dict.hero.preview.tiles[1].subtitle}
                                        />
                                        <WhiteTrackCard
                                            icon={<Layers3 size={18} />}
                                            title={dict.hero.preview.tiles[2].title}
                                            subtitle={dict.hero.preview.tiles[2].subtitle}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <div className="relative overflow-hidden rounded-[28px] border border-teal-100 bg-white p-5 shadow-sm xl:p-6">
                                            {/* Bahoriy dekoratsiya (Sumalak/Maysa ramziy ma'noda) */}
                                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-400/10 blur-3xl" />

                                            <div className="relative flex h-full flex-col justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
                                                                {dict.hero.preview.rightCardLabel}
                                                            </div>
                                                            <div className="mt-3 max-w-[18ch] text-xl font-[1000] leading-tight tracking-tight text-slate-950 xl:text-2xl">
                                                                {dict.hero.preview.rightCardTitle}
                                                            </div>
                                                        </div>
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-[#109988]">
                                                            <Brain size={20} />
                                                        </div>
                                                    </div>

                                                    <div className="mt-5">
                                                        <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-teal-700">
                                                            <span>{dict.hero.preview.readinessLabel}</span>
                                                            <span className="text-[#109988]">{dict.hero.preview.readinessValue}</span>
                                                        </div>
                                                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                            <div
                                                                className="h-full rounded-full bg-gradient-to-r from-[#109988] to-[#4ade80]"
                                                                style={{ width: dict.hero.preview.readinessValue }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                                    <FeatureRow title={dict.hero.preview.badges[0]} text={dict.hero.preview.badgeDescriptions[0]} />
                                                    <FeatureRow title={dict.hero.preview.badges[1]} text={dict.hero.preview.badgeDescriptions[1]} />
                                                    <FeatureRow title={dict.hero.preview.badges[2]} text={dict.hero.preview.badgeDescriptions[2]} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-3 top-8 rounded-2xl border border-teal-100 bg-white px-4 py-3 shadow-xl z-20"
                                >
                                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-500">
                                        {dict.hero.preview.floatingTopTitle}
                                    </div>
                                    <div className="mt-1 text-sm font-black text-slate-950">
                                        {dict.hero.preview.floatingTopText}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function HeroBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0">
            {/* Navro'z ranglari: Ochiq yashil va ko'k gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(20,184,166,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(74,222,128,0.08),transparent_40%)]" />

            {/* Dekorativ to'lqinlar (SVG) */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-[0.4]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 30 10 70 0 100 15 L 100 0 L 0 0 Z" fill="rgba(20,184,166,0.03)" />
                <path d="M0 100 C 40 90 60 100 100 85 L 100 100 L 0 100 Z" fill="rgba(74,222,128,0.03)" />
            </svg>

            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#109988_1px,transparent_1px),linear-gradient(90deg,#109988_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
    );
}

function HeroProof({ text }: { text: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-bold text-slate-200 backdrop-blur">
            {text}
        </div>
    );
}

function WhiteTrackCard({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ecfffd] text-[#109988]">
                {icon}
            </div>
            <div className="text-sm font-black text-slate-950">{title}</div>
            <div className="mt-1 text-[11px] font-medium leading-5 text-slate-500">
                {subtitle}
            </div>
        </div>
    );
}

function FeatureRow({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-[#f8fbfa] px-4 py-4 transition hover:bg-[#f2fbf8]">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#109988] shadow-sm">
                <CheckCircle2 size={16} />
            </div>

            <div className="min-w-0">
                <div className="text-sm font-black text-slate-900">{title}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{text}</div>
            </div>
        </div>
    );
}