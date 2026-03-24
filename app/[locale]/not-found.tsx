import Link from "next/link";
import { Home } from "lucide-react";
import { BackButton } from "@/components/system/back-button";
import { NotFoundIllustration } from "@/components/system/not-found-illustration";

export default function NotFound() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#fafdfc] text-slate-900">
            <PageBackground />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    <div className="order-2 max-w-xl text-center lg:order-1 lg:text-left">
                        <div className="inline-flex items-center rounded-full border border-teal-100/80 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-teal-700 backdrop-blur-md">
                            404
                        </div>

                        <h1 className="mt-6 text-4xl font-[1000] leading-[0.98] tracking-[-0.05em] text-teal-950 sm:text-5xl lg:text-6xl">
                            Page not found
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                            Sorry, the page you are looking for does not exist or has been moved.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                            <Link
                                href="/"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#109988] px-6 text-sm font-black text-white shadow-[0_20px_40px_-16px_rgba(16,153,136,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#0d7f72] active:scale-[0.98]"
                            >
                                <Home size={18} />
                                Go home
                            </Link>

                            <BackButton label="Go back" />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <NotFoundIllustration />
                    </div>
                </div>
            </div>
        </main>
    );
}

function PageBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#fafdfc]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.08),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(74,222,128,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.05),transparent_30%)]" />

            <div className="absolute left-[-40px] top-[120px] h-[260px] w-[260px] rounded-full bg-teal-400/10 blur-[110px] animate-float-slow" />
            <div className="absolute right-[-30px] top-[200px] h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-[130px] animate-float-slower" />
            <div className="absolute bottom-[8%] left-[18%] h-[220px] w-[220px] rounded-full bg-cyan-400/10 blur-[95px] animate-float-medium" />

            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#109988_1px,transparent_1px),linear-gradient(90deg,#109988_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
    );
}