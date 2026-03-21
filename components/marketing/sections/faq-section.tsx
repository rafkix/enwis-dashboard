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
        <section id="faq" className="relative overflow-hidden bg-white py-24">
            {/* Minimalist Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-teal-50/50 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

                    {/* CHAP TOMON: Sarlavha va Yordam kartasi */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-md"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-teal-700 ring-1 ring-teal-100">
                                <HelpCircle size={14} />
                                {dict.faq.eyebrow}
                            </div>
                            <h2 className="mt-6 text-4xl font-[1000] tracking-tight text-teal-950 md:text-5xl leading-[1.1]">
                                {dict.faq.title}
                            </h2>
                            <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                                {dict.faq.description}
                            </p>
                        </motion.div>

                        {/* Ixchamroq Yordam Kartasi (Chap ustunning pastida) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative mt-12 overflow-hidden rounded-[32px] bg-teal-950 p-8 text-white md:p-10"
                        >
                            <div className="relative z-10">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-400 backdrop-blur-md">
                                    <MessageCircle size={24} />
                                </div>
                                <h3 className="text-xl font-bold leading-tight">
                                    {dict.faq.footer.title}
                                </h3>
                                <p className="mt-3 text-sm text-teal-100/60 leading-relaxed">
                                    {dict.faq.footer.description}
                                </p>
                                <button className="mt-6 flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all hover:bg-teal-400 active:scale-95">
                                    {dict.faq.footer.cta}
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl" />
                        </motion.div>
                    </div>

                    {/* O'NG TOMON: FAQ Akkordeonlar */}
                    <div className="lg:col-span-7 space-y-4">
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
                                    className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${isOpen
                                            ? "border-teal-200 bg-teal-50/20 shadow-sm"
                                            : "border-slate-100 bg-white hover:border-teal-100"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between p-6 text-left md:p-8"
                                    >
                                        <span className={`pr-6 text-base font-bold tracking-tight transition-colors md:text-lg ${isOpen ? "text-teal-950" : "text-slate-700 hover:text-teal-700"
                                            }`}>
                                            {faqData.question}
                                        </span>
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${isOpen ? "bg-teal-600 text-white rotate-[135deg]" : "bg-slate-50 text-slate-400"
                                            }`}>
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
                                                    <div className="h-px w-full bg-teal-100/50 mb-6" />
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