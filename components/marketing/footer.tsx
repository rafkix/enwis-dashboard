"use client";

import Link from "next/link";
import { Send, Instagram, Youtube, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type FooterProps = {
    locale: Locale;
    dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-slate-100 bg-white pt-20 pb-10">
            <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">

                {/* 1. Asosiy Footer Grid */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

                    {/* Brend va Ijtimoiy tarmoqlar */}
                    <div className="lg:col-span-5 flex flex-col items-start">
                        <Link href={`/${locale}`} className="group">
                            <h3 className="text-3xl font-[1000] tracking-tighter text-teal-950 transition-colors group-hover:text-teal-600">
                                ENWIS
                            </h3>
                        </Link>
                        <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed text-slate-500">
                            {dict.footer.description}
                        </p>

                        {/* Ijtimoiy tarmoqlar ikonkalari */}
                        <div className="mt-10 flex items-center gap-4">
                            {[
                                { icon: Send, href: "https://t.me/enwis_uz" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-teal-50 hover:text-teal-600 hover:shadow-lg hover:shadow-teal-100"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Linklar Grid */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

                            {/* Navigatsiya */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {dict.footer.sections.navigation}
                                </h4>
                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    {[
                                        { label: dict.footer.links.home, href: `/${locale}` },
                                        { label: dict.footer.links.pricing, href: `/${locale}/pricing` },
                                        { label: dict.footer.links.business, href: `/${locale}/business` },
                                        { label: "Blog", href: `/${locale}/blog` }
                                    ].map((link, i) => (
                                        <Link key={i} href={link.href} className="transition-colors hover:text-teal-600">
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Imtihonlar */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {dict.footer.sections.tests}
                                </h4>
                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    {[
                                        { label: "IELTS Mock", href: `/${locale}/ielts` },
                                        { label: "CEFR Multi-level", href: `/${locale}/cefr` },
                                        { label: "DTM Tests", href: `/${locale}/dtm` },
                                        { label: "Placement Test", href: `/${locale}/placement` }
                                    ].map((link, i) => (
                                        <Link key={i} href={link.href} className="flex items-center gap-1 transition-colors hover:text-teal-600">
                                            {link.label}
                                            <ArrowUpRight size={14} className="opacity-0 transition-all -translate-y-1 translate-x-1 group-hover:opacity-100" />
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Aloqa / Support */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    Support
                                </h4>
                                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600">
                                    <Link href="/help" className="hover:text-teal-600">Yordam markazi</Link>
                                    <Link href="/privacy" className="hover:text-teal-600">Maxfiylik siyosati</Link>
                                    <Link href="/terms" className="hover:text-teal-600">Foydalanish shartlari</Link>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 2. Pastki qism: Copyright va Attribution */}
                <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 md:flex-row">
                    <p className="text-sm font-medium text-slate-400">
                        © {currentYear} ENWIS. {dict.footer.copyright}
                    </p>

                    <div className="flex items-center gap-8">
                        <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Status: Online
                        </p>
                        <div className="h-4 w-px bg-slate-200" />
                        <p className="text-sm font-medium text-slate-400 hover:text-teal-600 cursor-default">
                            Made with Passion in Uzbekistan
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}