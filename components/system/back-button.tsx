"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-700 backdrop-blur-md transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]"
        >
            <ArrowLeft size={18} />
            {label}
        </button>
    );
}