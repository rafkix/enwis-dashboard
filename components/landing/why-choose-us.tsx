'use client'

import { BookOpen, CheckCircle, Trophy, Coffee } from 'lucide-react'

const reasons = [
    {
        icon: BookOpen,
        title: "Free teacher support",
        description: "Assistant teachers available 24/7 for student help.",
        color: "bg-[#b0fc40]" // Lunix
    },
    {
        icon: CheckCircle,
        title: "Test Center",
        description: "Separate test center for MOCK and real IELTS exams. Additional practice biologies, chemistry, and physics tests.",
        color: "bg-[#2ec500]" // Verdix
    },
    {
        icon: Trophy,
        title: "Free Events",
        description: "Student battles, quizzes, and chess tournaments with prizes.",
        color: "bg-[#2b85ff]" // Skylen
    },
    {
        icon: Coffee,
        title: "Distance Learning Zones",
        description: "Comfortable zones for remote learning with refreshments.",
        color: "bg-[#0c3033]" // Obscure
    },
]

export function WhyChooseUs() {
    return (
        <section className="py-30  bg-foreground" id="why-choose-us">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-background/60 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Why are people choosing us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                ENWIS has been teaching languages worldwide with AI-powered personalization and proven methodology.
            </p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">

            {/* Left Cards */}
            <div className="space-y-6">
                {reasons.slice(0, 2).map((reason, index) => {
                const Icon = reason.icon
                return (
                    <div
                    key={index}
                    className="group rounded-2xl p-6 glass border border-white/10 backdrop-blur-md hover:shadow-xl transition shadow-md"
                    >
                    <div className={`w-12 h-12 ${reason.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason.description}
                    </p>
                    </div>
                )
                })}
            </div>

            {/* Center Teacher Image */}
            <div className="flex flex-col items-center text-center rounded-3xl p-8 glass border border-white/10 backdrop-blur-md shadow-lg">
                <div className="relative overflow-hidden rounded-2xl">
                <img
                    src="https://image2url.com/images/1764945800461-3f2e306f-9f7f-45d8-851b-09b6e73b1d52.png"
                    alt="Experienced English Test Zone"
                    className="object-cover w-full h-full"
                />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">Experienced Test Blocks</h3>
                <p className="text-muted-foreground text-sm max-w-sm mt-1">
                Learn from certified instructors with modern teaching methods and AI assistance.
                </p>
            </div>

            {/* Right Cards */}
            <div className="space-y-6">
                {reasons.slice(2, 4).map((reason, index) => {
                const Icon = reason.icon
                return (
                    <div
                    key={index}
                    className="group rounded-2xl p-6 glass border border-white/10 backdrop-blur-md hover:shadow-xl transition shadow-md"
                    >
                    <div className={`w-12 h-12 ${reason.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason.description}
                    </p>
                    </div>
                )
                })}
            </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4 mt-8">
            {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                <div
                    key={index}
                    className="rounded-2xl p-5 bg-white/70 border border-gray-200 shadow-md backdrop-blur"
                >
                    <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center shadow`}>
                        <Icon size={26} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{reason.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{reason.description}</p>
                    </div>
                    </div>
                </div>
                )
            })}
            </div>

        </div>
        </section>
    )
}
