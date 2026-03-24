import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";
import { Analytics } from "@vercel/analytics/next"

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        return {};
    }

    const dict = await getDictionary(locale);

    const baseUrl = siteConfig.url;

    return {
        metadataBase: new URL(baseUrl),

        title: {
            default: dict.meta.home.title,
            template: `%s | ${dict.meta.home.title}`,
        },

        description: dict.meta.home.description,

        // ✅ SEO keywords
        keywords: [
            "DTM test 2026",
            "IELTS mock test online",
            "CEFR level test",
            "English test Uzbekistan",
            "online test platform",
            "Enwis platform",
            "grammar test",
            "vocabulary test",
            "mock exam",
            "student testing system"
        ],

        // ✅ Open Graph (Facebook, Telegram, etc.)
        openGraph: {
            title: dict.meta.home.title,
            description: dict.meta.home.description,
            url: `${baseUrl}/${locale}`,
            siteName: "Enwis",
            locale: locale,
            type: "website",
        },

        // ✅ Twitter preview
        twitter: {
            card: "summary_large_image",
            title: dict.meta.home.title,
            description: dict.meta.home.description,
        },

        // ✅ Icons / favicon
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            ],
            apple: [
                { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
            ],
            other: [
                {
                    rel: "android-chrome-192x192",
                    url: "/android-chrome-192x192.png",
                },
                {
                    rel: "android-chrome-512x512",
                    url: "/android-chrome-512x512.png",
                },
            ],
        },

        manifest: "/site.webmanifest",

        // ✅ hreflang (multi-language SEO)
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                uz: `${baseUrl}/uz`,
                ru: `${baseUrl}/ru`,
                en: `${baseUrl}/en`,
            },
        },

        // ✅ Robots (SEO indexing control)
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale as Locale);

    return (
        <div className="relative flex min-h-screen flex-col">
            <Analytics/>
            <Header locale={locale as Locale} dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale as Locale} dict={dict} />
        </div>
    );
}