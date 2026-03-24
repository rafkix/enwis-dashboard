"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";

const languages: {
    locale: Locale;
    label: string;
    flag: string;
}[] = [
    { locale: "uz", label: "UZ", flag: "uz" },
    { locale: "ru", label: "RU", flag: "ru" },
    { locale: "en", label: "EN", flag: "gb" },
];

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return `/${nextLocale}`;

    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
}

type LanguageSwitcherProps = {
    currentLocale: Locale;
    mobile?: boolean;
};

export function LanguageSwitcher({
    currentLocale,
    mobile = false,
}: LanguageSwitcherProps) {
    const pathname = usePathname();

    if (mobile) {
        return (
            <div className="grid w-full grid-cols-3 gap-2">
                {languages.map((lang) => {
                    const isActive = lang.locale === currentLocale;

                    return (
                        <Link
                            key={lang.locale}
                            href={replaceLocaleInPath(
                                pathname || `/${currentLocale}`,
                                lang.locale
                            )}
                            className={[
                                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition-all",
                                isActive
                                    ? "bg-teal-600 text-white"
                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                            ].join(" ")}
                        >
                            <div className="relative h-4 w-6 overflow-hidden rounded-sm">
                                <Image
                                    src={`https://flagcdn.com/w40/${lang.flag}.png`}
                                    alt={lang.label}
                                    fill
                                    className="object-cover"
                                    sizes="24px"
                                />
                            </div>
                            <span>{lang.label}</span>
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
            {languages.map((lang) => {
                const isActive = lang.locale === currentLocale;

                return (
                    <Link
                        key={lang.locale}
                        href={replaceLocaleInPath(
                            pathname || `/${currentLocale}`,
                            lang.locale
                        )}
                        className={[
                            "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-all",
                            isActive
                                ? "bg-teal-600 text-white"
                                : "text-slate-600 hover:bg-slate-100",
                        ].join(" ")}
                    >
                        <div className="relative h-3.5 w-5 overflow-hidden rounded-sm">
                            <Image
                                src={`https://flagcdn.com/w40/${lang.flag}.png`}
                                alt={lang.label}
                                fill
                                className="object-cover"
                                sizes="20px"
                            />
                        </div>
                        <span>{lang.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}