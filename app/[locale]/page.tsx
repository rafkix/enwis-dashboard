import { LandingPage } from "@/components/marketing/landing-page";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale as Locale);

    return <LandingPage locale={locale as Locale} dict={dict} />;
}