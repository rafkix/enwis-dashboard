'use client'

import dynamic from "next/dynamic"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { TeamSection } from "@/components/landing/team-section"
import { Footer } from "@/components/landing/footer"
import DailyWordsSection from "@/components/landing/daily-words-section"
import { AboutUsSection } from "@/components/landing/about-us-section"

// ✅ Framer Motion-ni dinamik import qilish (SSR xatosini oldini oladi)
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
  ssr: false,
})

function TapeSeparator({ text = "ENWIS SYSTEM" }: { text?: string }) {
  const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
    ssr: false,
  })

  return (
    // h-0 va overflow-visible sectionlar orasidagi bo'shliqni nolga tushiradi
    <div className="relative h-0 w-full overflow-visible flex items-center justify-center z-30">
      
      {/* Skotch tanasi - endi u mutlaq markazda */}
      <MotionDiv
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "120%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute h-11 bg-[#EAB308]/90 backdrop-blur-[1px] -rotate-1 flex items-center justify-center border-y border-yellow-600/20 shadow-lg"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Skotch teksturasi */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 3px)' }} 
        />

        {/* Skotch ichidagi matn */}
        <div className="flex gap-16 items-center whitespace-nowrap px-4">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-yellow-950 font-mono font-black text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-50">
              {text} // {i + 1}
            </span>
          ))}
        </div>
      </MotionDiv>

      {/* Skotchning chetki yirtilgan qismlari */}
      <div className="absolute left-[-2%] w-8 h-12 bg-[#EAB308] -rotate-1 z-40" 
           style={{ clipPath: 'polygon(100% 0, 0 25%, 100% 50%, 0 75%, 100% 100%)' }} />
      <div className="absolute right-[-2%] w-8 h-12 bg-[#EAB308] -rotate-1 z-40" 
           style={{ clipPath: 'polygon(0 0, 100% 25%, 0 50%, 100% 75%, 0 100%)' }} />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFCF9] text-foreground relative overflow-hidden font-sans">
      <Header />
      <Hero />
      
      <TapeSeparator text="Why Choose ENWIS" />
      <WhyChooseUs />
      
      <TapeSeparator text="Learn About Us" />
      <AboutUsSection />
      
      <TapeSeparator text="Meet Our Experts" />
      <TeamSection />
      
      <TapeSeparator text="Daily Vocabulary Lab" />
      <DailyWordsSection />

      <TapeSeparator text="Connect with ENWIS" />
      <Footer />
    </main>
  )
}