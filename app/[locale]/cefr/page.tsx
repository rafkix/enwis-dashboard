import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    Languages,
    LineChart,
    PenSquare,
    Zap,
    Users,
    Trophy,
    PlayCircle,
    Monitor,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";

type PageProps = {
    params: Promise<{
        locale: Locale;
    }>;
};

const CONTAINER_CLASS =
    "mx-auto max-w-[1440px] px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-0";

export default async function Page({ params }: PageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900 selection:bg-[#109988]/20">
            <HeroSection locale={locale} dict={dict} />
            <StatsSection dict={dict} />
            <TracksSection locale={locale} dict={dict} />
            <ExperienceSection dict={dict} />
            <ProcessSection dict={dict} />
            <PlatformSection dict={dict} />
            <BenefitsSection dict={dict} />
            <FAQSection dict={dict} />
            <FinalCTASection locale={locale} dict={dict} />
        </main>
    );
}

function HeroSection({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dictionary;
}) {
    return (
        <section className="relative overflow-hidden pb-16 pt-12 md:pb-32 md:pt-24 lg:pb-40 lg:pt-32">
            <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,153,136,0.15),transparent_70%)]" />

            <div className={CONTAINER_CLASS}>
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d7f72] shadow-sm backdrop-blur-sm sm:text-xs">
                        <GraduationCap size={16} />
                        {dict.hero.badge}
                    </div>

                    <h1 className="text-4xl font-[1000] leading-[0.9] tracking-[-0.04em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px]">
                        {dict.hero.title} <span className="text-[#109988]">.</span>
                    </h1>

                    <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl lg:text-2xl">
                        {dict.hero.description}
                    </p>

                    <div className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                        <a
                            href={`${siteConfig.authUrl}?lang=${locale}`}
                            className="inline-flex h-16 items-center justify-center rounded-full bg-[#109988] px-12 text-lg font-black text-white shadow-[0_20px_40px_-12px_rgba(16,153,136,0.4)] transition-all hover:scale-105 hover:bg-[#0d7f72] active:scale-95"
                        >
                            {dict.hero.primaryCta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>

                        <Link
                            href="#tracks"
                            className="inline-flex h-16 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-12 text-lg font-black text-slate-900 transition-all hover:border-[#109988] hover:text-[#109988]"
                        >
                            {dict.hero.secondaryCta}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatsSection({ dict }: { dict: Dictionary }) {
    const stats = [
        {
            label: dict.landing.stats.items[0].label,
            value: dict.landing.stats.items[0].value,
            icon: <PenSquare />,
        },
        {
            label: dict.landing.stats.items[1].label,
            value: dict.landing.stats.items[1].value,
            icon: <Users />,
        },
        {
            label: dict.landing.stats.items[2].label,
            value: dict.landing.stats.items[2].value,
            icon: <Trophy />,
        },
        {
            label: dict.landing.stats.items[3].label,
            value: dict.landing.stats.items[3].value,
            icon: <Zap />,
        },
    ];

    return (
        <section className="border-y border-slate-100 bg-white py-12 shadow-sm">
            <div className={CONTAINER_CLASS}>
                <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4 lg:gap-16">
                    {stats.map((s) => (
                        <div key={s.label} className="group flex items-center gap-5">
                            <div className="rounded-2xl bg-[#ecfffd] p-4 text-[#109988] transition-transform group-hover:scale-110">
                                {s.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-black leading-none text-slate-900 sm:text-3xl">
                                    {s.value}
                                </div>
                                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                                    {s.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TracksSection({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dictionary;
}) {
    const tracks = [
        {
            slug: "ielts",
            title: dict.landing.tracks.items[0].title,
            description: dict.landing.tracks.items[0].description,
        },
        {
            slug: "cefr",
            title: dict.landing.tracks.items[1].title,
            description: dict.landing.tracks.items[1].description,
        },
        {
            slug: "dtm",
            title: dict.landing.tracks.items[2].title,
            description: dict.landing.tracks.items[2].description,
        },
        {
            slug: "writing",
            title: dict.landing.tracks.items[3].title,
            description: dict.landing.tracks.items[3].description,
        },
    ];

    return (
        <section id="tracks" className="bg-[#f8fafc] py-24">
            <div className={CONTAINER_CLASS}>
                <div className="flex flex-col items-start gap-16 lg:flex-row">
                    <div className="lg:sticky lg:top-24 lg:w-1/3">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[#109988]">
                            {dict.tracks.eyebrow}
                        </span>
                        <h2 className="mt-4 text-4xl font-black italic leading-tight text-slate-950 md:text-5xl lg:text-6xl">
                            {dict.tracks.title}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            {dict.tracks.description}
                        </p>
                    </div>

                    <div className="grid w-full gap-6 sm:grid-cols-2 lg:w-2/3">
                        {tracks.map((track) => (
                            <Link
                                key={track.slug}
                                href={`/${locale}/${track.slug}`}
                                className="group rounded-[40px] border border-slate-100 bg-white p-10 transition-all hover:-translate-y-2 hover:border-[#109988]/30 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)]"
                            >
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all group-hover:bg-[#109988] group-hover:text-white">
                                    <Zap size={24} />
                                </div>

                                <div className="mb-2 text-4xl font-black text-slate-900">
                                    {track.title}
                                </div>

                                <p className="mb-8 text-sm leading-relaxed text-slate-500">
                                    {track.description}
                                </p>

                                <div className="flex items-center text-sm font-black text-[#109988]">
                                    {dict.landing.tracks.openTrack}
                                    <ArrowRight
                                        size={18}
                                        className="ml-2 transition-transform group-hover:translate-x-2"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceSection({ dict }: { dict: Dictionary }) {
    const items = dict.landing.experience.items;

    return (
        <section className="py-12 md:py-24">
            <div className={CONTAINER_CLASS}>
                <div className="relative overflow-hidden rounded-[48px] bg-slate-950 p-8 text-white md:rounded-[64px] md:p-20">
                    <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_80%_20%,#10998833,transparent_50%)]" />

                    <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-10 text-4xl font-black leading-[1.05] md:text-6xl">
                                {dict.landing.experience.title}
                            </h2>

                            <div className="grid gap-6">
                                {items.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#109988]">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black">{item.title}</h4>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="group relative cursor-pointer">
                            <div className="aspect-video overflow-hidden rounded-[40px] bg-gradient-to-br from-[#109988] to-teal-900 shadow-2xl">
                                <div className="flex h-full items-center justify-center">
                                    <PlayCircle
                                        size={80}
                                        className="text-white opacity-80 transition-transform group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProcessSection({ dict }: { dict: Dictionary }) {
    return (
        <section className="border-y border-slate-100 bg-white py-24">
            <div className={CONTAINER_CLASS}>
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter text-slate-950 md:text-6xl">
                        {dict.landing.process.title}
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-3 lg:gap-20">
                    {dict.landing.process.items.map((step, i) => (
                        <div key={step.title} className="group relative">
                            <div className="absolute -top-20 left-0 -z-10 select-none text-[120px] font-black text-slate-50 transition-colors group-hover:text-teal-50">
                                0{i + 1}
                            </div>

                            <div className="pt-10">
                                <h3 className="mb-4 text-2xl font-black text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="text-lg leading-relaxed text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PlatformSection({ dict }: { dict: Dictionary }) {
    const items = [
        {
            icon: <Languages size={24} />,
            title: dict.features.items[0].title,
            text: dict.features.items[0].description,
        },
        {
            icon: <LineChart size={24} />,
            title: dict.features.items[1].title,
            text: dict.features.items[1].description,
        },
        {
            icon: <PenSquare size={24} />,
            title: dict.features.items[2].title,
            text: dict.features.items[2].description,
        },
    ];

    return (
        <section id="features" className="bg-[#f8fafc] py-24 lg:py-32">
            <div className={CONTAINER_CLASS}>
                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-[48px] border border-slate-100 bg-white p-12 transition-all hover:shadow-2xl hover:shadow-teal-900/5"
                        >
                            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ecfffd] text-[#109988]">
                                {item.icon}
                            </div>
                            <h3 className="mb-4 text-2xl font-[1000] tracking-tight text-slate-950">
                                {item.title}
                            </h3>
                            <p className="text-lg leading-relaxed text-slate-600">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BenefitsSection({ dict }: { dict: Dictionary }) {
    return (
        <section className="py-24 lg:py-32">
            <div className={CONTAINER_CLASS}>
                <div className="grid items-center gap-20 lg:grid-cols-2">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[#109988]">
                            {dict.benefits.eyebrow}
                        </span>
                        <h2 className="mt-6 text-4xl font-black italic leading-tight text-slate-950 md:text-5xl lg:text-6xl">
                            {dict.benefits.title}
                        </h2>
                        <p className="mt-8 text-xl leading-relaxed text-slate-600">
                            {dict.benefits.description}
                        </p>
                    </div>

                    <div className="grid gap-5">
                        {dict.benefits.items.map((item, i) => (
                            <div
                                key={item}
                                className="group flex items-center gap-8 rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm transition-transform hover:scale-[1.02]"
                            >
                                <span className="text-3xl font-black text-teal-100 transition-colors group-hover:text-[#109988]">
                                    0{i + 1}
                                </span>
                                <span className="text-xl font-bold text-slate-800">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQSection({ dict }: { dict: Dictionary }) {
    const faqItems = Array.isArray(dict?.faq?.items)
        ? dict.faq.items
        : dict?.faq?.items && typeof dict.faq.items === "object"
            ? Object.values(dict.faq.items)
            : [];

    return (
        <section id="faq" className="border-t border-slate-100 bg-white py-24">
            <div className={CONTAINER_CLASS}>
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-black italic tracking-tighter text-slate-950 md:text-6xl">
                        {dict?.faq?.title ?? "FAQ"}
                    </h2>
                </div>

                <div className="mx-auto max-w-4xl space-y-6">
                    {faqItems.map((item, index) => {
                        const question =
                            typeof item === "object" && item && "question" in item
                                ? String(item.question)
                                : `Question ${index + 1}`;

                        const answer =
                            typeof item === "object" && item && "answer" in item
                                ? String(item.answer)
                                : "";

                        return (
                            <div
                                key={`${question}-${index}`}
                                className="rounded-[40px] border border-slate-50 bg-[#f8fafc] p-10 transition-colors hover:border-teal-100"
                            >
                                <h3 className="mb-4 text-xl font-black tracking-tight text-slate-900 md:text-2xl">
                                    {question}
                                </h3>
                                <p className="text-lg leading-relaxed text-slate-600">
                                    {answer}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FinalCTASection({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dictionary;
}) {
    return (
        <section className="py-24 lg:pb-40">
            <div className={CONTAINER_CLASS}>
                <div className="relative overflow-hidden rounded-[60px] bg-[#109988] p-12 text-center text-white shadow-2xl shadow-teal-900/30 md:rounded-[80px] md:p-32">
                    <Monitor
                        size={400}
                        className="pointer-events-none absolute -bottom-20 -right-20 -rotate-12 opacity-5"
                    />

                    <div className="relative z-10">
                        <h2 className="mb-10 text-4xl font-[1000] leading-none tracking-tighter md:text-7xl lg:text-8xl">
                            {dict.landing.finalCta.title}
                        </h2>

                        <p className="mx-auto mt-8 max-w-2xl text-xl font-medium leading-relaxed text-teal-50 opacity-90 md:text-2xl">
                            {dict.landing.finalCta.description}
                        </p>

                        <div className="mt-16">
                            <a
                                href={`${siteConfig.authUrl}?lang=${locale}`}
                                className="inline-flex h-20 items-center justify-center rounded-full bg-white px-16 text-xl font-black text-[#109988] transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
                            >
                                {dict.landing.finalCta.cta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}