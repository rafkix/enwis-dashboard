"use client";

import { useState, useEffect } from "react";

export function IELTSAnimatedTitle({ title }: { title: string }) {
    const words = title.split(" ");
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Almashinuv vaqti 3000ms (3 soniya) ga oshirildi
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % words.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <h1 className="max-w-5xl mx-auto text-center text-5xl font-[900] leading-[1.05] text-slate-900 sm:text-7xl lg:text-8xl tracking-tight">
            {words.map((word, index) => (
                <span
                    key={index}
                    /* duration-1000 qilib yanada sekin va silliq qilindi */
                    className={`relative inline-block transition-all duration-1000 ease-in-out ${index === activeIndex
                            ? "text-red-600 scale-110"
                            : "text-slate-900 opacity-80" // Aktiv bo'lmagan so'zlar biroz xira bo'ladi
                        }`}
                >
                    {word}
                    {index === activeIndex && (
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none"></span>
                    )}
                    {index !== words.length - 1 && "\u00A0"}
                </span>
            ))}
        </h1>
    );
}