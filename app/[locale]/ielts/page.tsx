import { notFound } from "next/navigation";
import {
    ArrowRight,
    BookOpenCheck,
    CheckCircle2,
    Headphones,
    Mic,
    PenSquare,
    Zap,
    Target,
    TrendingUp,
    Star,
    AlertCircle,
    Award
} from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";
import { IELTSAnimatedTitle } from "@/components/ielts/IELTSAnimatedTitle";
import { FAQList } from "@/components/ielts/IELTSFAQ"; // Client componentni import qilish
import { IELTSPlatform } from "@/components/ielts/IELTSPlatform";

export default async function IELTSPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale as Locale);
    const page = dict.ieltsPage;

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-red-600 selection:text-white">
            <IELTSHero locale={locale as Locale} page={page.hero} />
            <IELTSIntro page={page.intro} />
            <IELTSFormat page={page.format} />
            <IELTSScoring page={page.scoring} />
            <IELTSChallenges page={page.challenges} />
            <IELTSPlatform locale={locale as Locale} page={page.platform} />
            <FAQList page={page.faq} />
        </main>
    );
}

// Qolgan barcha Section funksiyalari (IELTSHero, IELTSIntro, va hokazo) 
// o'z holaticha shu faylda qoladi, chunki ular interaktiv emas (statik).

function IELTSHero({ locale, page }: { locale: Locale; page: any }) {
    return (
        <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-40 lg:pb-32">
            <div className="absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full bg-red-50/40 blur-[120px] -z-10" />
            <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2 mb-8 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">{page.badge}</span>
                </div>

                <IELTSAnimatedTitle title={page.title} />

                <p className="mt-10 max-w-2xl mx-auto text-lg leading-relaxed text-slate-500 md:text-xl font-light">
                    {page.description}
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href={`${siteConfig.authUrl}?lang=${locale}`}
                        className="group relative flex h-16 items-center justify-center rounded-2xl bg-red-600 px-12 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-red-700 hover:shadow-[0_20px_40px_rgba(220,38,38,0.25)] active:scale-95">
                        {page.primaryCta} <ArrowRight size={18} className="ml-3 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-12">
                    {page.stats.map((stat: any, i: number) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function IELTSIntro({ page }: { page: any }) {
    return (
        <section id="intro" className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-video rounded-3xl bg-slate-200 overflow-hidden shadow-inner flex items-center justify-center text-slate-400 italic">
                        IELTS Explainer Visual
                    </div>
                    <div>
                        <span className="text-red-600 font-black text-xs uppercase tracking-widest">{page.eyebrow}</span>
                        <h2 className="text-4xl font-black text-slate-900 mt-4 mb-6 leading-tight">{page.title}</h2>
                        <p className="text-lg text-slate-500 font-light mb-8">{page.description}</p>
                        <ul className="space-y-4">
                            {page.points.map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                                    <span className="text-slate-700 font-medium">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function IELTSFormat({ page }: { page: any }) {
    const icons = [<Headphones key="1" />, <BookOpenCheck key="2" />, <PenSquare key="3" />, <Mic key="4" />];
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="text-red-600 font-black text-xs uppercase tracking-widest">{page.eyebrow}</span>
                    <h2 className="text-4xl font-black text-slate-900 mt-4">{page.title}</h2>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">{page.description}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {page.items.map((item: any, i: number) => (
                        <div key={i} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-red-100 hover:shadow-xl transition-all group">
                            <div className="h-14 w-14 rounded-2xl bg-slate-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                {icons[i]}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function IELTSScoring({ page }: { page: any }) {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-20 opacity-10">
                <Target size={400} />
            </div>
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-red-500 font-black text-xs uppercase tracking-widest">{page.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">{page.title}</h2>
                        <p className="text-slate-400 text-lg font-light mb-10">{page.description}</p>
                        <div className="space-y-4">
                            {page.items.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <span className="text-slate-200 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[9, 8, 7].map((num) => (
                            <div key={num} className="bg-white p-6 rounded-3xl flex items-center justify-between shadow-2xl transition-transform hover:scale-105">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-black">
                                        <Star size={18} fill="currentColor" />
                                    </div>
                                    <span className="text-slate-900 font-black tracking-tight">Band Score</span>
                                </div>
                                <span className="text-4xl font-black italic text-red-600">{num}.0</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function IELTSChallenges({ page }: { page: any }) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12 text-left">
                <div className="max-w-3xl">
                    <span className="text-red-600 font-black text-xs uppercase tracking-widest">{page.eyebrow}</span>
                    <h2 className="text-4xl font-black text-slate-900 mt-4 mb-12">{page.title}</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {page.items.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-red-50/50 border border-red-100">
                                <AlertCircle className="text-red-600 shrink-0" size={24} />
                                <span className="text-slate-700 font-semibold leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}