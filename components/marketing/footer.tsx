"use client";

import Link from "next/link";
import {
    Send,
    Instagram,
    Youtube,
    ArrowUpRight,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type FooterProps = {
    locale: Locale;
    dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const navigationLinks = [
        { label: dict.footer.links.home, href: `/${locale}` },
        { label: dict.footer.links.pricing, href: `/${locale}/pricing` },
        { label: dict.footer.links.business, href: `/${locale}/business` },
        { label: dict.footer.links.blog, href: `/${locale}/blog` },
    ];

    const testLinks = [
        { label: dict.footer.tests.ielts, href: `/${locale}/ielts` },
        { label: dict.footer.tests.cefr, href: `/${locale}/cefr` },
        { label: dict.footer.tests.dtm, href: `/${locale}/dtm` },
        { label: dict.footer.tests.placement, href: `/${locale}/placement` },
    ];

    const supportLinks = [
        { label: dict.footer.support.help, href: `/${locale}/help` },
        { label: dict.footer.support.privacy, href: `/${locale}/privacy` },
        { label: dict.footer.support.terms, href: `/${locale}/terms` },
    ];

    const socialLinks = [
        { icon: Send, href: "https://t.me/enwis_uz", label: "Telegram" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="relative border-t border-slate-100 bg-white/70 pt-20 pb-10 backdrop-blur-sm">
            <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    <div className="flex flex-col items-start lg:col-span-5">
                        <Link href={`/${locale}`} className="group">
                            <h3 className="text-3xl font-[1000] tracking-tighter text-teal-950 transition-colors group-hover:text-teal-600">
                                ENWIS
                            </h3>
                        </Link>

                        <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed text-slate-500">
                            {dict.footer.description}
                        </p>

                        <div className="mt-10 flex items-center gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-teal-50 hover:text-teal-600 hover:shadow-lg hover:shadow-teal-100"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {dict.footer.sections.navigation}
                                </h4>

                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    {navigationLinks.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.href}
                                            className="transition-colors hover:text-teal-600"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {dict.footer.sections.tests}
                                </h4>

                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    {testLinks.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.href}
                                            className="group flex items-center gap-1 transition-colors hover:text-teal-600"
                                        >
                                            {link.label}
                                            <ArrowUpRight
                                                size={14}
                                                className="translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                                            />
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {dict.footer.sections.support}
                                </h4>

                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    {supportLinks.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.href}
                                            className="transition-colors hover:text-teal-600"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 md:flex-row">
                    <p className="text-sm font-medium text-slate-400">
                        © {currentYear} ENWIS. {dict.footer.copyright}
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
                        <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {dict.footer.status.online}
                        </p>

                        <div className="hidden h-4 w-px bg-slate-200 sm:block" />

                        <p className="text-sm font-medium text-slate-400">
                            {dict.footer.madeIn}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}