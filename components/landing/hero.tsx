'use client'

import { useEffect, useRef } from "react"
import { Play, BadgeCheck, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AOS from "aos"
import "aos/dist/aos.css"

export function Hero() {
    const cardRef = useRef<HTMLDivElement | null>(null)
    const glowRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    /* INIT AOS */
    useEffect(() => {
        AOS.init({ duration: 600, once: true })
    }, [])

    /* ENABLE 3D ONLY ON DESKTOP */
    useEffect(() => {
        if (window.innerWidth < 1024) return // ❗ tablet & phone → stop

        const card = cardRef.current
        const glow = glowRef.current
        const img = imgRef.current
        if (!card || !glow || !img) return

        const width = card.clientWidth
        const height = card.clientHeight
        const MAX_ROTATE = 18
        const DEPTH = 70

        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const rotateY = ((x - width / 2) / (width / 2)) * MAX_ROTATE
            const rotateX = ((y - height / 2) / (height / 2)) * -MAX_ROTATE

            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.08, 1.08, 1.08)
            `

            img.style.transform = `translateZ(${DEPTH}px) scale(1.08)`

            const glowX = (x / width) * 100
            const glowY = (y / height) * 100

            glow.style.opacity = "0.25"
            glow.style.transform = `translate(-50%, -50%) translate(${glowX}%, ${glowY}%)`

            document.querySelectorAll(".float-badge").forEach((el) => {
                (el as HTMLElement).style.transform = `
                    translateZ(65px)
                    translate(${(x - width / 2) * 0.04}px, ${(y - height / 2) * 0.04}px)
                `
            })
        }

        const reset = () => {
            card.style.transform = `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `
            img.style.transform = "translateZ(0px) scale(1)"
            glow.style.opacity = "0"

            document.querySelectorAll(".float-badge").forEach((el) => {
                ;(el as HTMLElement).style.transform = `translateZ(0px)`
            })
        }

        card.addEventListener("mousemove", handleMove)
        card.addEventListener("mouseleave", reset)

        return () => {
            card.removeEventListener("mousemove", handleMove)
            card.removeEventListener("mouseleave", reset)
        }
    }, [])

    return (
        <section className="pt-28 pb-20 lg:pt-36 bg-linear-to-b from-white to-[#F7F8FA]" id="home">

            {/* MAIN GRID */}
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                {/* LEFT TEXT */}
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-6xl font-bold leading-tight text-[#1F2937] flex flex-wrap justify-center lg:justify-start gap-2">
                        ENWIS helps users learn vocabulary efficiently through smart AI guidance
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        ENWIS helps learners build real exam confidence by offering smart tools, interactive practice, and authentic CEFR-IELTS simulations.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <Button className="bg-destructive text-white px-6 py-4 text-lg rounded-full shadow-lg hover:bg-accent transition">
                            <Play className="mr-2" /> Start Mock Test
                        </Button>
                        <Button className="bg-destructive text-white px-6 py-4 text-lg rounded-full shadow-lg hover:bg-accent transition">
                            Try Free Demo
                        </Button>
                    </div>
                </div>

                {/* RIGHT 3D CARD – DESKTOP ONLY */}
                <div className="hidden lg:flex justify-end">
                    <div className="flex flex-col items-center">
                        <div
                            ref={cardRef}
                            className="relative rounded-2xl overflow-hidden group shadow-2xl"
                            style={{
                                width: "650px",
                                height: "480px",
                                transformStyle: "preserve-3d",
                                transition: "transform 450ms cubic-bezier(.03,.98,.52,.99)"
                            }}
                        >
                            {/* GLOW */}
                            <div
                                ref={glowRef}
                                className="absolute w-48 h-48 bg-red-500/30 blur-2xl rounded-full pointer-events-none"
                                style={{ opacity: 0, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                            />

                            {/* IMAGE */}
                            <img
                                ref={imgRef}
                                src="/person.png"
                                className="w-full h-full object-cover rounded-2xl select-none"
                                style={{ transition: "transform 0.5s ease", transformStyle: "preserve-3d" }}
                            />

                            {/* BADGES */}
                            <div className="absolute top-6 left-6 float-badge bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-semibold">
                                <BadgeCheck className="text-green-600 w-5 h-5" /> IELTS 7.5
                            </div>

                            <div className="absolute top-6 right-6 float-badge bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg font-semibold">
                                CEFR C1
                            </div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 float-badge bg-yellow-500 text-black px-6 py-2 rounded-xl shadow-lg flex items-center gap-2 font-bold">
                                <Crown className="w-5 h-5" /> Advanced English
                            </div>

                            <div className="absolute bottom-6 right-6 float-badge bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="text-yellow-500 w-5 h-5" />
                                ))}
                            </div>

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white text-center">
                                <div className="px-6">
                                    <h3 className="text-2xl font-semibold mb-2">ENWIS learning app</h3>
                                    <p className="text-sm opacity-90">Realistic environment for IELTS preparation</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-700 text-base font-medium">
                            ENWIS Prep — Premium Study Environment
                        </p>
                    </div>
                </div>
            </div>

            {/* STAT CARDS */}
            <div
                data-aos="fade-up"
                className="max-w-7xl mx-auto px-6 xl:px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { num: "11+", text: "years of experience", color: "bg-blue-500" },
                    { num: "100,000+", text: "students learned English", color: "bg-red-500" },
                    { num: "14", text: "branches across Uzbekistan", color: "bg-orange-500" },
                    { num: "500+", text: "employees in Cambridge", color: "bg-green-500" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="relative p-6 rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        <div className={`absolute w-16 h-16 rounded-full opacity-0 ${item.color} blur-2xl -top-3 -right-3 transition-all duration-500`} />
                        <p className="text-3xl md:text-4xl font-bold text-blue-700">{item.num}</p>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">{item.text}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}
