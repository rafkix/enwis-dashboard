import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { HeroSection } from "./sections/hero-section";
import { FeaturesSection } from "./sections/features-section";
import { ExamsSection } from "./sections/exams-section";
import { CTASection } from "./sections/cta-section";
import { AnalyticsSection } from "./sections/analytics-section";
import { FaqSection } from "./sections/faq-section";

type LandingPageProps = {
    locale: Locale;
    dict: Dictionary;
};

export function LandingPage({ locale, dict }: LandingPageProps) {
    return (
        // bg-white qildik, chunki seksiyalarimiz yorqin dizaynda
        <main className="min-h-screen overflow-x-hidden bg-white">

            {/* 1. Kirish qismi */}
            <HeroSection locale={locale} dict={dict} />

            {/* 2. Ijtimoiy isbot va statistika (Darhol ishonch uyg'otadi) */}
            <AnalyticsSection dict={dict} />

            {/* 3. Asosiy xizmatlar (Imtihonlar) */}
            <ExamsSection dict={dict} locale={locale} />

            {/* 4. Tizim qanday ishlashi va afzalliklari */}
            <FeaturesSection dict={dict}/>

            {/* 5. Savol-javoblar (Shubhalarni yo'qotish uchun) */}
            <FaqSection dict={dict} />

            {/* 6. Yakuniy harakatga chaqiruv (Eng pastda bo'lishi shart) */}
            <CTASection dict={dict} locale={locale} />

        </main>
    );
}