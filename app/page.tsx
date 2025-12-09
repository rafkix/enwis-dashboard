import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { TeamSection } from "@/components/landing/team-section"
import { Footer } from "@/components/landing/footer"
import DailyWordsSection from "@/components/landing/daily-words-section"
import { AboutUsSection } from "@/components/landing/about-us-section"


export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Header />
            <Hero />
            <WhyChooseUs />
            <AboutUsSection />
            <TeamSection />
            <DailyWordsSection/>
            <Footer />
        </main>
    )
}