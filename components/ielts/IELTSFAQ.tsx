"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQList({ page }: { page: any }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white lg:py-32 selection:bg-red-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-600 font-black text-xs uppercase tracking-[0.2em]"
                    >
                        {page.eyebrow}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight"
                    >
                        {page.title}
                    </motion.h2>
                </div>

                {/* FAQ Grid: Mobile-da 1 ta, Desktop-da 2 ta ustun */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {page.items.map((item: any, i: number) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className={`group rounded-[2.5rem] border transition-all duration-500 ${isOpen
                                    ? "border-red-100 bg-white shadow-[0_20px_50px_-12px_rgba(220,38,38,0.12)]"
                                    : "border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-red-50"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="flex w-full cursor-pointer items-center justify-between p-6 md:p-8 text-left outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 shrink-0 rounded-2xl items-center justify-center transition-all duration-300 ${isOpen
                                            ? "bg-red-600 text-white shadow-lg shadow-red-200"
                                            : "bg-white text-slate-400 border border-slate-100 group-hover:border-red-100 group-hover:text-red-600"
                                            }`}>
                                            <HelpCircle size={22} />
                                        </div>
                                        <span className={`text-base md:text-lg font-bold leading-tight transition-colors ${isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-red-600"
                                            }`}>
                                            {item.question}
                                        </span>
                                    </div>

                                    <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen
                                        ? "bg-red-50 text-red-600 rotate-180"
                                        : "bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-600"
                                        }`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 text-slate-500 font-light leading-relaxed">
                                                <div className="pt-4 border-t border-slate-50 text-sm md:text-base">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}