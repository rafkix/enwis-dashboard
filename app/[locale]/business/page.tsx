import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

export default async function BusinessPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale as Locale);

    return (
        <section className="container-shell py-24">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                {dict.navigation.Business}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Business page placeholder.
            </p>
        </section>
    );
}