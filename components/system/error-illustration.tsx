"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ErrorIllustration() {
    return (
        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 0.4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full"
            >
                <div className="relative overflow-hidden rounded-[40px] border border-red-100/70 bg-white/80 p-8 shadow-[0_40px_100px_-24px_rgba(239,68,68,0.12)] backdrop-blur-md">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-300/10 blur-3xl" />
                    <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange-300/10 blur-3xl" />

                    <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-red-50 text-red-500 shadow-sm">
                            <AlertTriangle size={42} />
                        </div>

                        <div className="mt-6 text-5xl font-[1000] tracking-[-0.06em] text-slate-950">
                            Error
                        </div>

                        <div className="mt-6 w-full rounded-[28px] border border-slate-200/80 bg-[#fcfcfc]/90 p-5">
                            <div className="mx-auto h-3 w-28 rounded-full bg-red-100" />
                            <div className="mt-4 h-2 w-full rounded-full bg-slate-100" />
                            <div className="mt-2 h-2 w-[82%] rounded-full bg-slate-100" />
                            <div className="mt-2 h-2 w-[60%] rounded-full bg-slate-100" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}