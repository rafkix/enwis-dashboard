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
        <main className="relative min-h-screen overflow-x-hidden bg-[#fafdfc] text-slate-900">
            <PageBackground />

            <div className="relative z-10">
                <HeroSection locale={locale} dict={dict} />
                <AnalyticsSection dict={dict} />
                <ExamsSection dict={dict} locale={locale} />
                <FeaturesSection dict={dict} />
                <FaqSection dict={dict} />
                <CTASection dict={dict} locale={locale} />
            </div>
        </main>
    );
}

function PageBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {/* Base color */}
            <div className="absolute inset-0 bg-[#fafdfc]" />

            {/* Soft radial gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(20,184,166,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(74,222,128,0.08),transparent_40%)]" />

            {/* Floating blurred circles */}
            <div className="absolute inset-0">
                <div className="animate-float-slow absolute left-[-60px] top-[120px] h-[280px] w-[280px] rounded-full bg-teal-400/10 blur-[110px]" />

                <div className="animate-float-slower absolute right-[-40px] top-[420px] h-[320px] w-[320px] rounded-full bg-emerald-400/10 blur-[130px]" />

                <div className="animate-float-medium absolute left-[20%] top-[55%] h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[95px]" />

                <div className="animate-float-slow absolute bottom-[8%] right-[18%] h-[260px] w-[260px] rounded-full bg-lime-300/10 blur-[110px]" />
            </div>

            {/* Decorative waves */}
            <svg
                className="absolute left-0 top-0 h-full w-full opacity-[0.3]"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 0 C 30 10 70 0 100 15 L 100 0 L 0 0 Z"
                    fill="rgba(20,184,166,0.03)"
                />
                <path
                    d="M0 100 C 40 90 60 100 100 85 L 100 100 L 0 100 Z"
                    fill="rgba(74,222,128,0.03)"
                />
            </svg>

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#109988_1px,transparent_1px),linear-gradient(90deg,#109988_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
    );
}