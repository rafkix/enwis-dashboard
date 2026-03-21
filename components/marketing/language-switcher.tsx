"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";

const languages: { locale: Locale; label: string; flag: string; name: string }[] = [
    { locale: "uz", label: "UZ", flag: "uz", name: "O'zbekcha" },
    { locale: "en", label: "EN", flag: "gb", name: "English" },
    { locale: "ru", label: "RU", flag: "ru", name: "Русский" },
];

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${nextLocale}`;
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    // Tashqariga bosilganda menyuni yopish
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLang = languages.find((l) => l.locale === currentLocale) || languages[0];

    return (
        <div className="relative" ref={containerRef}>
            {/* Asosiy Tugma */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-md transition-all active:scale-95 ${isOpen ? "ring-2 ring-teal-500/20" : ""
                    }`}
            >
                <div className="relative h-4 w-6 overflow-hidden rounded-sm shadow-sm">
                    <Image
                        src={`https://flagcdn.com/w40/${currentLang.flag}.png`}
                        alt={currentLang.label}
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-xs font-black text-slate-700">{currentLang.label}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Ro'yxati */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl shadow-slate-200/50"
                    >
                        {languages.map((lang) => {
                            const active = lang.locale === currentLocale;
                            const href = replaceLocaleInPath(pathname || `/${currentLocale}`, lang.locale);

                            return (
                                <Link
                                    key={lang.locale}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active ? "bg-slate-50" : "hover:bg-teal-50/50 group"
                                        }`}
                                >
                                    <div className="relative h-4 w-6 shrink-0 overflow-hidden rounded-sm shadow-sm">
                                        <Image
                                            src={`https://flagcdn.com/w40/${lang.flag}.png`}
                                            alt={lang.label}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[11px] font-black leading-none ${active ? "text-teal-600" : "text-slate-700 group-hover:text-teal-600"}`}>
                                            {lang.name}
                                        </span>
                                    </div>
                                    {active && (
                                        <div className="ml-auto h-1 w-1 rounded-full bg-teal-500" />
                                    )}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}