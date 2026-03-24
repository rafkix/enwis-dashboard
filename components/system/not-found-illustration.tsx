"use client";

import { motion } from "framer-motion";

export function NotFoundIllustration() {
    return (
        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full"
            >
                <div className="relative overflow-hidden rounded-[40px] border border-teal-100/70 bg-white/80 p-8 shadow-[0_40px_100px_-24px_rgba(16,153,136,0.14)] backdrop-blur-md">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-300/10 blur-3xl" />
                    <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative">
                        <div className="text-[96px] font-[1000] leading-none tracking-[-0.08em] text-teal-600 sm:text-[120px]">
                            404
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <FloatingCard delay={0} />
                            <FloatingCard delay={0.2} />
                            <FloatingCard delay={0.4} />
                        </div>

                        <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-[#f8fbfa]/90 p-5">
                            <div className="h-3 w-24 rounded-full bg-slate-200" />
                            <div className="mt-4 h-2 w-full rounded-full bg-slate-100" />
                            <div className="mt-2 h-2 w-[80%] rounded-full bg-slate-100" />
                            <div className="mt-2 h-2 w-[60%] rounded-full bg-slate-100" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function FloatingCard({ delay }: { delay: number }) {
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.2, delay, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm"
        >
            <div className="h-3 w-10 rounded-full bg-teal-100" />
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
            <div className="mt-2 h-2 w-[70%] rounded-full bg-slate-100" />
        </motion.div>
    );
}