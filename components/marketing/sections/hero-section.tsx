"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    ArrowRight,
    Sparkles,
    GraduationCap,
    Brain,
    Layers3,
    Headphones,
    CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";

type HeroSectionProps = {
    locale: Locale;
    dict: Dictionary;
};

const TITLE_ACCENTS = [
    "from-teal-600 via-emerald-500 to-cyan-500",
    "from-emerald-600 via-teal-500 to-lime-500",
    "from-cyan-600 via-teal-500 to-emerald-500",
    "from-teal-700 via-cyan-500 to-emerald-400",
];

export function HeroSection({ locale, dict }: HeroSectionProps) {
    const titleWords = useMemo(
        () => dict.hero.title.split(" ").filter(Boolean),
        [dict.hero.title]
    );

    const [activeWordIndex, setActiveWordIndex] = useState(0);

    useEffect(() => {
        if (titleWords.length <= 1) return;

        const interval = window.setInterval(() => {
            setActiveWordIndex((prev) => (prev + 1) % titleWords.length);
        }, 1400);

        return () => window.clearInterval(interval);
    }, [titleWords.length]);

    return (
        <section className="relative overflow-hidden text-slate-900">
            <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 pb-20 pt-28 sm:px-8 md:px-10 md:pb-24 md:pt-32 lg:px-12 xl:px-16 xl:pb-28 xl:pt-36">
                <div className="grid items-center gap-14 lg:gap-16 xl:grid-cols-[0.88fr_1.12fr] xl:gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-[620px] xl:max-w-[640px]"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-teal-700 backdrop-blur-md">
                            <Sparkles size={14} className="text-teal-500" />
                            {dict.hero.badge}
                        </div>

                        <h1 className="mt-7 max-w-[12ch] text-5xl font-[1000] leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[84px]">
                            <span className="flex flex-wrap gap-x-[0.22em] gap-y-[0.06em]">
                                {titleWords.map((word, index) => {
                                    const isActive = index === activeWordIndex;
                                    const gradientClass =
                                        TITLE_ACCENTS[index % TITLE_ACCENTS.length];

                                    return (
                                        <motion.span
                                            key={`${word}-${index}`}
                                            initial={false}
                                            animate={{
                                                y: isActive ? -2 : 0,
                                                scale: isActive ? 1.02 : 1,
                                            }}
                                            transition={{
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className={[
                                                "relative inline-block transition-all duration-500",
                                                isActive
                                                    ? `bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`
                                                    : "text-teal-950",
                                            ].join(" ")}
                                        >
                                            {word}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.span
                                                        initial={{ opacity: 0, scaleX: 0.6 }}
                                                        animate={{ opacity: 1, scaleX: 1 }}
                                                        exit={{ opacity: 0, scaleX: 0.6 }}
                                                        transition={{ duration: 0.35 }}
                                                        className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </motion.span>
                                    );
                                })}
                            </span>
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
                                className="inline-flex h-14 items-center justify-center rounded-2xl border border-teal-200/80 bg-white/75 px-8 text-sm font-black text-teal-800 backdrop-blur-md transition-all duration-300 hover:border-[#109988] hover:bg-white"
                            >
                                {dict.hero.secondaryCta}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.95, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative mx-auto w-full max-w-[720px]">
                            <div className="absolute inset-0 -z-10 rounded-full bg-teal-400/20 blur-[100px]" />

                            <div className="relative rounded-[40px] border border-teal-100/70 bg-white/80 p-4 shadow-[0_40px_100px_-20px_rgba(16,153,136,0.12)] backdrop-blur-md">
                                <div className="flex h-full flex-col rounded-[32px] border border-slate-100/80 bg-[#f8fbfa]/90 p-5">
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
                                        <div className="relative overflow-hidden rounded-[28px] border border-teal-100/80 bg-white/90 p-5 shadow-sm xl:p-6">
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
                                                            <span className="text-[#109988]">
                                                                {dict.hero.preview.readinessValue}
                                                            </span>
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
                                                    <FeatureRow
                                                        title={dict.hero.preview.badges[0]}
                                                        text={dict.hero.preview.badgeDescriptions[0]}
                                                    />
                                                    <FeatureRow
                                                        title={dict.hero.preview.badges[1]}
                                                        text={dict.hero.preview.badgeDescriptions[1]}
                                                    />
                                                    <FeatureRow
                                                        title={dict.hero.preview.badges[2]}
                                                        text={dict.hero.preview.badgeDescriptions[2]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-3 top-8 z-20 rounded-2xl border border-teal-100/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md"
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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-b from-transparent to-[#fafdfc]" />
        </section>
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
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 backdrop-blur-sm">
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
        <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200/80 bg-[#f8fbfa]/90 px-4 py-4 transition hover:bg-[#f2fbf8]">
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