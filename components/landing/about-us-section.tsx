"use client"

import { Sparkles, Target, GraduationCap } from "lucide-react"

export function AboutUsSection() {
    return (
        <section className="py-32 bg-linear-to-b from-[#F8FAFC] to-white" id="about-us">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                        About Us
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We help people master English through structured learning,
                        real practice, and modern technology.
                    </p>
                </div>

                {/* Content grid */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="
                        p-8 rounded-3xl
                        bg-white/20 dark:bg-white/10
                        backdrop-blur-xl
                        border border-white/30
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                        transition-all
                    ">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Clear Learning Path
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We provide step-by-step lessons designed to help learners
                            progress naturally from basics to advanced English skills.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="
                        p-8 rounded-3xl
                        bg-white/20 dark:bg-white/10
                        backdrop-blur-xl
                        border border-white/30
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                        transition-all
                    ">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                            <GraduationCap className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Expert Guidance
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Lessons are created and reviewed by experienced teachers
                            who understand real-world English communication.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="
                        p-8 rounded-3xl
                        bg-white/20 dark:bg-white/10
                        backdrop-blur-xl
                        border border-white/30
                        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                        transition-all
                    ">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Modern Approach
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We combine technology, practice, and smart repetition
                            to help you learn faster and remember longer.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
