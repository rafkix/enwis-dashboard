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
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Sahifa o'zgarganda mobil menyuni yopish
    useEffect(() => {
        setIsOpen(false);
        setOpenMobileSubmenu(null);
    }, [pathname]);

    // Active holatni tekshirish uchun funksiya
    const isItemActive = (item: any) => {
        const currentPath = pathname || `/${locale}`;
        if (item.href && currentPath === item.href) return true;
        if (item.children) {
            return item.children.some((child: any) => currentPath === child.href);
        }
        return false;
    };

    return (
        <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <nav className={`flex items-center justify-between transition-all duration-500 ${scrolled
                        ? "rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-xl"
                        : "bg-transparent py-2"
                    }`}>

                    {/* 1. LOGO */}
                    <Link href={`/${locale}`} className="relative z-[110] shrink-0 transition-transform active:scale-95">
                        <Image src="/enwis.png" alt="ENWIS" width={120} height={35} priority className="h-8 w-auto" />
                    </Link>

                    {/* 2. DESKTOP NAVIGATION */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navigation.map((item) => {
                            const active = isItemActive(item);

                            if (item.children) {
                                return (
                                    <div key={item.key} className="group relative py-2">
                                        <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all ${active ? "text-teal-600" : "text-slate-600 hover:text-teal-600"
                                            }`}>
                                            {dict.navigation[item.key]}
                                            <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
                                        </button>

                                        {/* Dropdown Menu - Hoverda ko'rinadi */}
                                        <div className="absolute left-0 top-full hidden w-56 pt-2 group-hover:block">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl backdrop-blur-3xl"
                                            >
                                                {item.children.map((child) => {
                                                    const childActive = pathname === child.href;
                                                    return (
                                                        <Link
                                                            key={child.key}
                                                            href={child.href}
                                                            className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${childActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                                                                }`}
                                                        >
                                                            {dict.navigation[child.key]}
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.key}
                                    href={item.href || "#"}
                                    className={`relative px-4 py-2 text-sm font-bold transition-colors ${active ? "text-teal-600" : "text-slate-600 hover:text-teal-600"
                                        }`}
                                >
                                    {dict.navigation[item.key]}
                                    {active && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-teal-500"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3. ACTIONS */}
                    <div className="hidden items-center gap-4 lg:flex">
                        <LanguageSwitcher currentLocale={locale} />
                        <Link
                            href={`${siteConfig.authUrl}?lang=${locale}`}
                            className="flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-100 active:scale-95"
                        >
                            {dict.common.login}
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900 lg:hidden"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </nav>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-white px-6 pb-10 pt-28 lg:hidden"
                    >
                        <div className="flex flex-col gap-2 overflow-y-auto">
                            {navigation.map((item) => {
                                const isSubOpen = openMobileSubmenu === item.key;
                                const active = isItemActive(item);

                                return (
                                    <div key={item.key} className="flex flex-col">
                                        {item.children ? (
                                            <>
                                                <button
                                                    onClick={() => setOpenMobileSubmenu(isSubOpen ? null : item.key)}
                                                    className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-xl font-bold ${active ? "text-teal-600" : "text-slate-900"
                                                        }`}
                                                >
                                                    {dict.navigation[item.key]}
                                                    <ChevronDown size={20} className={`transition-transform duration-300 ${isSubOpen ? "rotate-180" : ""}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isSubOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden px-4"
                                                        >
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.key}
                                                                    href={child.href}
                                                                    className={`block border-l-2 py-3 pl-6 text-lg font-semibold ${pathname === child.href ? "border-teal-500 text-teal-600" : "border-slate-100 text-slate-500"
                                                                        }`}
                                                                >
                                                                    {dict.navigation[child.key]}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href || "#"}
                                                className={`rounded-xl px-4 py-4 text-xl font-bold ${active ? "text-teal-600" : "text-slate-900"
                                                    }`}
                                            >
                                                {dict.navigation[item.key]}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
                            <div className="flex justify-center scale-110">
                                <LanguageSwitcher currentLocale={locale} />
                            </div>
                            <Link href={`${siteConfig.authUrl}?lang=${locale}`} className="flex h-16 w-full items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white shadow-xl shadow-teal-100 active:scale-[0.98]">
                                {dict.common.login}
                                <ArrowRight className="ml-2" size={20} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}