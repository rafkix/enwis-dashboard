"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, MessageCircle, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FaqSectionProps = {
    dict: Dictionary;
};

export function FaqSection({ dict }: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { key: "q1" as const },
        { key: "q2" as const },
        { key: "q3" as const },
        { key: "q4" as const },
        { key: "q5" as const },
    ];

    return (
        <section id="faq" className="relative overflow-hidden py-24 xl:py-32">
            <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12 xl:px-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    <div className="flex flex-col justify-between lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-[560px]"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 backdrop-blur-md">
                                <HelpCircle size={14} />
                                {dict.faq.eyebrow}
                            </div>

                            <h2 className="mt-6 text-4xl font-[1000] leading-[1.05] tracking-[-0.04em] text-teal-950 md:text-5xl xl:text-6xl">
                                {dict.faq.title}
                            </h2>

                            <p className="mt-6 text-lg leading-relaxed text-slate-600 xl:text-[19px]">
                                {dict.faq.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative mt-12 overflow-hidden rounded-[36px] border border-teal-900/80 bg-teal-950 p-8 text-white shadow-[0_40px_90px_-25px_rgba(15,23,42,0.45)] md:p-10"
                        >
                            <div className="relative z-10">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-300 backdrop-blur-md">
                                    <MessageCircle size={24} />
                                </div>

                                <h3 className="text-xl font-[1000] leading-tight tracking-tight">
                                    {dict.faq.footer.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-teal-100/70">
                                    {dict.faq.footer.description}
                                </p>

                                <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-teal-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all duration-300 hover:bg-teal-400 active:scale-95">
                                    {dict.faq.footer.cta}
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>

                            <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-teal-400/10 blur-3xl" />
                        </motion.div>
                    </div>

                    <div className="space-y-4 lg:col-span-7">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            const faqData = dict.faq.items[faq.key];

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`overflow-hidden rounded-[28px] border backdrop-blur-md transition-all duration-300 ${
                                        isOpen
                                            ? "border-teal-200/80 bg-white/82 shadow-[0_20px_50px_-20px_rgba(16,153,136,0.16)]"
                                            : "border-slate-200/70 bg-white/68 hover:border-teal-100 hover:bg-white/78"
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between p-6 text-left md:p-8"
                                    >
                                        <span
                                            className={`pr-6 text-base font-black tracking-tight transition-colors md:text-lg ${
                                                isOpen
                                                    ? "text-teal-950"
                                                    : "text-slate-700 hover:text-teal-700"
                                            }`}
                                        >
                                            {faqData.question}
                                        </span>

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                                                isOpen
                                                    ? "rotate-[135deg] bg-teal-600 text-white"
                                                    : "bg-white text-slate-400 ring-1 ring-slate-200/80"
                                            }`}
                                        >
                                            <Plus size={20} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-8 md:px-8 md:pb-10">
                                                    <div className="mb-6 h-px w-full bg-teal-100/60" />
                                                    <p className="text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
                                                        {faqData.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}