"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "./language-switcher";
import { siteConfig } from "@/lib/config/site";
import { getMarketingNavigation } from "@/lib/config/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type HeaderProps = {
    locale: Locale;
    dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

    const navigation = useMemo(() => getMarketingNavigation(locale), [locale]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setOpenMobileSubmenu(null);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    const isItemActive = (item: {
        href?: string;
        children?: { href: string }[];
    }) => {
        const currentPath = pathname || `/${locale}`;

        if (item.href && currentPath === item.href) return true;

        if (item.children) {
            return item.children.some((child) => currentPath === child.href);
        }

        return false;
    };

    return (
        <header
            className={[
                "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
                scrolled ? "py-3" : "py-5",
            ].join(" ")}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <nav
                    className={[
                        "relative flex items-center justify-between transition-all duration-500",
                        scrolled
                            ? "rounded-2xl border border-slate-200/70 bg-white/88 px-3 py-2 shadow-[0_10px_35px_-15px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:px-4"
                            : "rounded-2xl bg-transparent px-0 py-2",
                    ].join(" ")}
                >
                    {/* LOGO */}
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            href={`/${locale}`}
                            className="relative z-[110] shrink-0 transition-transform active:scale-95"
                        >
                            <Image
                                src="/enwis.png"
                                alt="ENWIS"
                                width={120}
                                height={35}
                                priority
                                className="h-8 w-auto sm:h-9"
                            />
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navigation.map((item) => {
                            const active = isItemActive(item);

                            if (item.children) {
                                return (
                                    <div key={item.key} className="group relative">
                                        <button
                                            type="button"
                                            className={[
                                                "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                                                active
                                                    ? "bg-teal-50 text-teal-700"
                                                    : "text-slate-600 hover:bg-white/70 hover:text-teal-600",
                                            ].join(" ")}
                                        >
                                            {dict.navigation[item.key]}
                                            <ChevronDown
                                                size={15}
                                                className="transition-transform duration-300 group-hover:rotate-180"
                                            />
                                        </button>

                                        <div className="absolute left-0 top-full hidden w-60 pt-2 group-hover:block">
                                            <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                                                {item.children.map((child) => {
                                                    const childActive = pathname === child.href;

                                                    return (
                                                        <Link
                                                            key={child.key}
                                                            href={child.href}
                                                            className={[
                                                                "block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                                                                childActive
                                                                    ? "bg-teal-50 text-teal-700"
                                                                    : "text-slate-600 hover:bg-slate-50 hover:text-teal-600",
                                                            ].join(" ")}
                                                        >
                                                            {dict.navigation[child.key]}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.key}
                                    href={item.href || "#"}
                                    className={[
                                        "relative rounded-xl px-4 py-2 text-sm font-bold transition-colors",
                                        active
                                            ? "bg-teal-50 text-teal-700"
                                            : "text-slate-600 hover:bg-white/70 hover:text-teal-600",
                                    ].join(" ")}
                                >
                                    {dict.navigation[item.key]}
                                </Link>
                            );
                        })}
                    </div>

                    {/* DESKTOP ACTIONS */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <LanguageSwitcher currentLocale={locale} mobile={false} />
                        <Link
                            href={`${siteConfig.authUrl}?lang=${locale}`}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-100 active:scale-95"
                        >
                            {dict.common.login}
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* MOBILE ACTIONS */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            type="button"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="relative z-[110] inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-white/90 text-slate-900 shadow-sm backdrop-blur-md transition active:scale-95"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[95] bg-slate-950/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-x-4 top-[88px] z-[100] max-h-[calc(100vh-104px)] overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/96 shadow-[0_30px_80px_-24px_rgba(15,23,42,0.24)] backdrop-blur-xl lg:hidden"
                        >
                            <div className="flex max-h-[calc(100vh-104px)] flex-col">
                                <div className="overflow-y-auto px-3 pb-3 pt-3">
                                    {/* MOBILE LANGUAGE SWITCHER */}
                                    <div className="mb-4">
                                        <div className="mb-2 px-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                            Language
                                        </div>
                                        <LanguageSwitcher currentLocale={locale} mobile />
                                    </div>

                                    {navigation.map((item) => {
                                        const isSubOpen = openMobileSubmenu === item.key;
                                        const active = isItemActive(item);

                                        return (
                                            <div
                                                key={item.key}
                                                className="border-b border-slate-100 last:border-b-0"
                                            >
                                                {item.children ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setOpenMobileSubmenu(
                                                                    isSubOpen ? null : item.key
                                                                )
                                                            }
                                                            className={[
                                                                "flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-base font-bold transition-colors",
                                                                active
                                                                    ? "text-teal-700"
                                                                    : "text-slate-900 hover:bg-slate-50",
                                                            ].join(" ")}
                                                        >
                                                            {dict.navigation[item.key]}
                                                            <ChevronDown
                                                                size={20}
                                                                className={`transition-transform duration-300 ${
                                                                    isSubOpen ? "rotate-180" : ""
                                                                }`}
                                                            />
                                                        </button>

                                                        <AnimatePresence initial={false}>
                                                            {isSubOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{
                                                                        height: "auto",
                                                                        opacity: 1,
                                                                    }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.22 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pb-3 pl-3 pr-2">
                                                                        {item.children.map((child) => {
                                                                            const childActive =
                                                                                pathname === child.href;

                                                                            return (
                                                                                <Link
                                                                                    key={child.key}
                                                                                    href={child.href}
                                                                                    className={[
                                                                                        "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                                                                                        childActive
                                                                                            ? "bg-teal-50 text-teal-700"
                                                                                            : "text-slate-600 hover:bg-slate-50",
                                                                                    ].join(" ")}
                                                                                >
                                                                                    {dict.navigation[child.key]}
                                                                                </Link>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href || "#"}
                                                        className={[
                                                            "block rounded-2xl px-4 py-4 text-base font-bold transition-colors",
                                                            active
                                                                ? "text-teal-700"
                                                                : "text-slate-900 hover:bg-slate-50",
                                                        ].join(" ")}
                                                    >
                                                        {dict.navigation[item.key]}
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-slate-100 p-3">
                                    <Link
                                        href={`${siteConfig.authUrl}?lang=${locale}`}
                                        className="flex h-12 w-full items-center justify-center rounded-2xl bg-teal-600 text-sm font-bold text-white shadow-lg shadow-teal-100 active:scale-[0.98]"
                                    >
                                        {dict.common.login}
                                        <ArrowRight className="ml-2" size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}