import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";

type LogoProps = {
    locale: Locale;
};

export function Logo({ locale }: LogoProps) {
    return (
        <Link
            href={`/${locale}`}
            className="inline-flex items-center"
            aria-label="ENWIS home"
        >
            <Image
                src="/enwis.png"
                alt="ENWIS"
                width={132}
                height={40}
                priority
                className="h-10 w-auto object-contain md:h-11"
            />
        </Link>
    );
}