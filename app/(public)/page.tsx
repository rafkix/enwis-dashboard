"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Zap, Mic, PenTool, ShieldCheck, BarChart3,
    ArrowRight, Clock, Users,  Timer,
    ChevronRight, Database, FileCheck, Globe, ArrowUpRight, Lock, FileText,
    Cpu, Star, Play, Heart, HandHeart, // ❤️ Yangi iconlar
    GraduationCap, Lightbulb,
    Brain
} from "lucide-react"
import { TypeAnimation } from 'react-type-animation'
import { Button } from "@/components/ui/button"

// --- 🛠️ REUSABLE COMPONENTS ---

const NoiseOverlay = ({ opacity = "0.02" }) => (
    <div className="absolute inset-0 mix-blend-overlay pointer-events-none z-0"
        style={{ opacity, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
)

const SectionWrapper = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={`relative py-16 md:py-24 px-6 md:px-12 lg:px-20 overflow-hidden ${className}`}>
        <div className="max-w-[1440px] mx-auto relative z-10 w-full">
            {children}
        </div>
    </section>
)

const SectionHeader = ({ subtitle, title, accent }: { subtitle: string, title: string, accent: string }) => (
    <div className="relative mb-12 md:mb-20 pl-8">
        <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-0 top-0 w-1.5 bg-gradient-to-b from-[#17776A] to-teal-400 rounded-full"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-[1000] text-slate-900 leading-none tracking-tighter"
            >
                {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17776A]/30 via-[#17776A] to-[#17776A] italic">
                    {accent}
                </span>
            </motion.h2>
        </div>
    </div>
)

const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-slate-100 last:border-0">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-6 text-left group"
        >
            <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {question}
            </span>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 transition-all duration-300 ${isOpen ? 'bg-blue-100 rotate-180' : ''}`}>
                <ChevronRight size={18} className={`transition-transform ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
            </span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-slate-500 font-medium leading-relaxed">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function Home() {
    const [activeTab, setActiveTab] = useState("DTM")
    const [openFaq, setOpenFaq] = useState(0)
    const router = useRouter()

    const testModules = useMemo(() => [
        { id: "DTM", label: "DTM (Milliy)", color: "#10b981", icon: FileCheck, users: "45k+", glow: "rgba(16,185,129,0.15)" },
        { id: "IELTS", label: "IELTS Mock", color: "#f43f5e", icon: Globe, users: "12k+", glow: "rgba(244,63,94,0.15)" },
        { id: "CEFR", label: "CEFR / Multi", color: "#3b82f6", icon: Database, users: "32k+", glow: "rgba(59,130,246,0.15)" },
        { id: "SAT", label: "SAT / GMAT", color: "#f59e0b", icon: Cpu, users: "5k+", glow: "rgba(245,158,11,0.15)" }
    ], [])

    const activeModule = testModules.find(m => m.id === activeTab)

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#17776A]/20 overflow-x-hidden">

            {/* --- 🚀 1. HERO SECTION (SAQLANDI) --- */}
            <SectionWrapper className="min-h-screen flex items-center pt-28 md:pt-36 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-1/4 right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -z-10"
                        style={{ background: activeModule?.glow }}
                    />
                </AnimatePresence>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
                    {/* ... (Hero chap tomoni) ... */}
                    <div className="lg:col-span-7 space-y-8 text-center lg:text-left relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-default"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-[#17776A] animate-pulse"></span>
                            <span className="text-[11px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                                Enwis Baholash Markazi
                            </span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-[1000] text-blue-800 leading-[0.95] tracking-tighter uppercase">
                            O'zbekistondagi <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 italic pr-2">
                                <TypeAnimation
                                    sequence={[
                                        'Birinchi AI Tizim', 2000,
                                        'Tezkor Natija', 2000,
                                        'Adolatli Baholash', 2000,
                                        'Aniq Tahlil', 2000
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0 border-l-0 lg:border-l-4 border-[#17776A]/30 lg:pl-8">
                            Enwis — shunchaki test emas. Bu sizning bilimingizni sun'iy intellekt yordamida <span className="text-slate-900 font-bold">99.2% aniqlikda</span> baholovchi xavfsiz ekotizim.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                            <Button className="h-16 px-10 bg-slate-900 text-white rounded-[1.2rem] font-black text-sm uppercase tracking-widest hover:bg-[#17776A] shadow-xl hover:shadow-[#17776A]/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                                <Zap size={20} fill="currentColor" /> Sinovni boshlash
                            </Button>

                            <Button variant="outline" className="h-16 px-10 bg-white text-slate-700 border-2 border-slate-200 rounded-[1.2rem] font-black text-sm uppercase tracking-widest hover:border-[#17776A] hover:text-[#17776A] hover:bg-teal-50 transition-all duration-300 flex items-center gap-3">
                                <Play size={20} fill="currentColor" className="opacity-50" />
                                Video qo'llanma
                            </Button>
                        </div>

                        {/* ❤️ YANGI STATISTIKA BLOKI (XAYRIYA BILAN) */}
                        <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Users size={18} /> <span className="text-sm font-bold">50,000+ Foydalanuvchi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={18} /> <span className="text-sm font-bold">4.9/5 Reyting</span>
                            </div>
                            <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 animate-pulse">
                                <Heart size={14} fill="currentColor" /> <span className="text-xs font-black uppercase tracking-wider">5% Foyda Xayriyaga</span>
                            </div>
                        </div>
                    </div>

                    {/* ... (Hero o'ng tomoni - Test Karta - SAQLANDI) ... */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ boxShadow: `0 40px 80px -20px ${activeModule?.glow || 'rgba(0,0,0,0.1)'}` }}
                            className="w-full max-w-[500px] bg-white/70 backdrop-blur-[50px] rounded-[3rem] p-8 md:p-10 border border-white/60 relative z-20 transition-shadow duration-500"
                        >
                            {/* ... (Test karta ichi o'zgarishsiz) ... */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center border border-slate-200">
                                            <Timer size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Qolgan vaqt</p>
                                            <span className="text-2xl font-[1000] text-slate-900 tabular-nums tracking-tight">00:45:12</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-900/20">
                                        24 / 40
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {testModules.map((item) => {
                                        const isActive = activeTab === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                style={{
                                                    borderColor: isActive ? item.color : 'transparent',
                                                    backgroundColor: isActive ? 'white' : 'rgba(255,255,255,0.4)'
                                                }}
                                                className={`w-full flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all duration-300 group ${isActive ? "shadow-xl scale-[1.03] z-10" : "hover:bg-white/60 hover:scale-[1.01]"}`}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div
                                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 ${isActive ? 'scale-110 rotate-0' : 'scale-100 rotate-0 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}
                                                        style={{ backgroundColor: item.color, boxShadow: isActive ? `0 10px 20px -5px ${item.color}80` : 'none' }}
                                                    >
                                                        <item.icon size={22} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className={`text-base font-black tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                                            {item.label}
                                                        </p>
                                                        {isActive && (
                                                            <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                                {item.users} Faol Foydalanuvchi
                                                            </motion.p>
                                                        )}
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    size={20}
                                                    className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : 'text-slate-300'}`}
                                                    style={{ color: isActive ? item.color : '' }}
                                                />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </SectionWrapper>

            {/* --- 💎 2. NEGA BIZ (SAQLANDI) --- */}
            <SectionWrapper className="bg-white border-y border-slate-100">
                <SectionHeader subtitle="Asosiy Afzalliklari" title="NEGA AYNAN" accent="ENWIS TIZIMI?" />
                {/* ... (Bu qism o'zgarishsiz qoldi) ... */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-100 to-transparent -translate-y-1/2 z-0" />
                    {[
                        { id: "01", title: "AI Aniqligi", desc: "Insholarni va nutqni 99.2% aniqlikda tekshiruvchi algoritm.", icon: Cpu },
                        { id: "02", title: "Strategiya", desc: "Shaxsiy reja.", icon: Lightbulb, color: "text-orange-500", bg: "bg-orange-50" },
                        { id: "03", title: "Xalqaro Standart", desc: "IELTS va CEFR mezonlariga to'liq javob beradi.", icon: Globe },
                        { id: "04", title: "Tezkor Natija", desc: "Imtihon tugashi bilan 3 daqiqada sertifikat oling.", icon: Zap }
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 group">
                            <div className="h-full p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-[#17776A]/20 hover:shadow-[0_20px_40px_-15px_rgba(23,119,106,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden text-center">
                                <div className="absolute -right-6 -top-6 text-[100px] font-[1000] text-slate-50 group-hover:text-[#17776A]/5 transition-colors select-none leading-none z-0">
                                    {item.id}
                                </div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#17776A] mb-6 border border-slate-100 group-hover:scale-110 group-hover:bg-[#17776A] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#17776A]/30 transition-all duration-300">
                                        <item.icon size={28} />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-700 p-10 md:p-16 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                    <NoiseOverlay opacity="0.1" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                        <div className="space-y-4 max-w-xl">
                            <h4 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                TEST FORMATLARI <br /> <span className="italic">HAMMASI JAMLANDI</span>
                            </h4>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {[{ i: Clock, l: "Taymer" }, { i: FileText, l: "Format" }, { i: BarChart3, l: "Tahlil" }, { i: Lock, l: "Security" }].map((t, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 text-white">
                                        <t.i size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{t.l}</span>
                                </div>
                            ))}
                        </div>
                        <button className="h-14 px-10 bg-white text-[#0F172A] font-extrabold text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg">
                            Testni Ko'rish
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* --- 🆕 3. PLATFORMA IMKONIYATLARI (SAQLANDI) --- */}
            <SectionWrapper className="bg-[#F8FAFC]">
                <SectionHeader subtitle="Enwis platformasi orqali siz" title="PLATFORMA" accent="IMKONIYATLARI" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
                    {/* ... (Barcha bento grid kartalari o'zgarishsiz) ... */}
                    <div className="md:col-span-8 p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group hover:shadow-xl transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors" />
                        <div className="flex-1 space-y-5 relative z-10">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><PenTool size={24} /></div>
                            <h3 className="text-3xl font-extrabold text-slate-900">AI Writing Tahlili</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Insholarni 4 ta mezon bo‘yicha tekshiring:
                                <span className="text-slate-900 font-bold"> Grammatika, Leksika, Coherence va Task Response.</span>
                                Xatolarga to‘liq izoh oling.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">Grammar Check</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">Band Score</span>
                            </div>
                        </div>
                        <div className="w-full md:w-64 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative shadow-inner">
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-slate-200 rounded-full" />
                                <div className="h-2 w-full bg-slate-200 rounded-full" />
                                <div className="h-2 w-5/6 bg-red-100 rounded-full relative"><div className="absolute top-0 left-10 w-4 h-2 bg-red-400 rounded-full" /></div>
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 mt-2">
                                    <p className="text-[10px] text-red-500 font-bold">Error: "does not have"</p>
                                    <p className="text-[10px] text-green-600 font-bold">Fix: "lacks"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 p-8 bg-[#17776A] text-white rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-xl group hover:-translate-y-2 transition-transform duration-500">
                        <NoiseOverlay opacity="0.1" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6"><Mic size={24} /></div>
                            <h3 className="text-2xl font-extrabold mb-3">Speaking Simulator</h3>
                            <p className="text-emerald-50/80 text-sm font-medium leading-relaxed">
                                AI Examiner bilan jonli suhbat qiling. Talaffuz, ravonlik va lug‘at boyligi bo‘yicha real ball oling.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-300">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Recording...
                        </div>
                    </div>

                    <div className="md:col-span-6 p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                        <div className="mb-6 flex justify-between items-start">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                                <FileCheck size={28} />
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full tracking-widest">Official Format</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Online Milliy Sertifikat</h3>
                        <p className="text-slate-500 font-medium leading-relaxed mb-6">
                            DTM standarti asosida tuzilgan savollar bazasi. Listening, Reading va Lexical-Grammar competence bo'limlarini haqiqiy imtihon muhitida topshiring.
                        </p>
                        <div className="flex gap-2">
                            {['B1 Daraja', 'B2 Daraja', 'C1 Daraja'].map((lvl, i) => (
                                <span key={i} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white">
                                    {lvl}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-6 p-10 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                        <div className="mb-6 flex justify-between items-start">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                                <Globe size={28} />
                            </div>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase rounded-full tracking-widest">Global Mock</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-3">IELTS & Multilevel Mock</h3>
                        <p className="text-slate-500 font-medium leading-relaxed mb-6">
                            Xalqaro imtihonlarning to‘liq simulyatsiyasi. Vaqt nazorati, savollar qiyinligi va baholash mezoni 100% original imtihon bilan bir xil.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[80%] bg-orange-400 rounded-full" /></div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[65%] bg-blue-400 rounded-full" /></div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-2 text-right">Listening vs Reading Progress</p>
                    </div>

                    <div className="md:col-span-4 p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden shadow-xl flex flex-col justify-center">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6"><ShieldCheck size={24} /></div>
                        <h3 className="text-2xl font-extrabold mb-3">Proctoring</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-4">
                            Anti-cheat tizimi: Face ID tekshiruvi va brauzerdan chiqib ketishni bloklash.
                        </p>
                        <div className="flex gap-2 text-[10px] font-bold text-slate-500 uppercase">
                            <span className="px-2 py-1 bg-slate-800 rounded">Face ID</span>
                            <span className="px-2 py-1 bg-slate-800 rounded">Secure</span>
                        </div>
                    </div>

                    <div className="md:col-span-8 p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-10 overflow-hidden group">
                        <div className="flex-1 space-y-5">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center"><BarChart3 size={24} /></div>
                            <h3 className="text-3xl font-extrabold text-slate-900">Batafsil Statistika</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                O'zlashtirish darajangizni vaqt o'tishi bilan kuzatib boring. Biz sizga qaysi ko'nikmani (Listening vs Reading) rivojlantirish kerakligini aytamiz.
                            </p>
                        </div>
                        <div className="w-full md:w-72 h-40 bg-slate-50 rounded-2xl border border-slate-100 flex items-end justify-between p-4 px-6 gap-2">
                            {[40, 65, 50, 85, 70, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="w-8 bg-gradient-to-t from-[#17776A] to-teal-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* --- ❤️ 4. XAYRIYA VA TA'SIR (CHARITY & IMPACT) - YANGI BO'LIM --- */}
            <SectionWrapper>
                <div className="bg-rose-50/50 rounded-[3rem] p-10 md:p-16 border border-rose-50">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 space-y-8 text-center md:text-left">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white text-rose-600 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                                <HandHeart size={16} /> Ijtimoiy Mas'uliyat
                            </div>
                            <h2 className="text-4xl md:text-6xl font-[900] text-slate-900 leading-tight">
                                Har bir test — <span className="text-rose-500">ezgu maqsad.</span>
                            </h2>
                            <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                Biz foydamizning <span className="font-bold text-slate-900">5% qismini</span> imkoniyati cheklangan yoshlar va ota-ona qaramog'idan mahrum bo'lgan bolalarning ta'lim olishiga yo'naltiramiz.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
                                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-rose-100 shadow-sm">
                                    <GraduationCap className="text-rose-500" size={28} />
                                    <div>
                                        <p className="text-xl font-[900] text-slate-900 leading-none">120+</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase mt-1">Grantlar</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-rose-100 shadow-sm">
                                    <Heart className="text-rose-500" size={28} />
                                    <div>
                                        <p className="text-xl font-[900] text-slate-900 leading-none">50m</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase mt-1">Xayriya</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-square bg-white rounded-full flex items-center justify-center shadow-xl shadow-rose-100">
                                <Heart size={140} className="text-rose-500 fill-rose-500 drop-shadow-2xl animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* --- 5. FAQ SECTION (SAQLANDI) --- */}
            <SectionWrapper className="bg-white border-t border-slate-100">
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <SectionHeader subtitle="Savollaringiz bormi?" title="KO'P SO'RALADIGAN" accent="SAVOLLAR" />
                        <p className="text-slate-500 mb-8">
                            Agar sizga kerakli javobni topa olmasangiz, bizning qo'llab-quvvatlash xizmatimizga yozing.
                        </p>
                        <Button variant="outline" className="border-slate-200 rounded-xl">
                            Telegram orqali yozish
                        </Button>
                    </div>
                    <div className="md:col-span-8">
                        <div className="bg-[#F8FAFC] rounded-[2rem] p-8 border border-slate-100">
                            {[
                                { q: "Enwis testi rasmiy DTM o'rniga o'tadimi?", a: "Yo'q, Enwis bu Mock (sinov) platformasi. Biz sizga rasmiy imtihonga tayyorgarlik darajangizni aniqlashga yordam beramiz." },
                                { q: "Natijalar qancha vaqtda chiqadi?", a: "Test yakunlanganidan so'ng AI algoritmlarimiz 3 daqiqa ichida barcha bo'limlarni (Speaking va Writing ham) tekshirib, shaxsiy kabinetingizga yuboradi." },
                                { q: "Face ID qanday ishlaydi?", a: "Imtihon davomida qurilmangiz kamerasiga ruxsat berishingiz kerak. Tizim sizning yuzingizni skaner qiladi va boshqa odam test topshirmasligini nazorat qiladi." },
                                { q: "To'lov turlari qanaqa?", a: "Siz Payme, Click yoki Uzcard/Humo kartalari orqali to'lov qilishingiz mumkin." }
                            ].map((item, i) => (
                                <FaqItem
                                    key={i}
                                    question={item.q}
                                    answer={item.a}
                                    isOpen={openFaq === i}
                                    onClick={() => setOpenFaq(i === openFaq ? -1 : i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* --- 6. BIZ HAQIMIZDA (SAQLANDI) --- */}
            <SectionWrapper className="bg-[#F8FAFC]">
                <SectionHeader subtitle="Bizning Falsafa" title="ENWIS" accent="HAQIDA" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Zap size={28} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">Dec 2025</div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Yangi Avlod</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Biz kecha paydo bo'ldik va bugun o'zgaryapmiz. Enwis — tezkor, zamonaviy va ortiqcha yuklamalarsiz platforma.
                            </p>
                        </div>
                    </div>

                    <div className="group p-8 bg-[#0F172A] text-white rounded-[2.5rem] shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                        <NoiseOverlay opacity="0.1" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 backdrop-blur-md border border-white/10">
                                <ShieldCheck size={28} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-emerald-500/20">No Bureaucracy</div>
                            <h3 className="text-xl font-extrabold text-white mb-3">Sertifikatsiz</h3>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                Biz eski qog'ozlarni tekshirmaymiz. Bizga sizning qachon o'qiganingiz emas, hozir nimani bilishingiz muhim.
                            </p>
                        </div>
                    </div>

                    <div className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(23,119,106,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-[#17776A] mb-6 group-hover:rotate-12 transition-transform duration-300">
                                <Brain size={28} />
                            </div>
                            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">100% AI</div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Inson Omilisiz</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Baholash jarayoniga hech kim aralashmaydi. Sun'iy intellekt xolis va adolatli natijani ta'minlaydi.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-700 shadow-2xl p-10 md:p-14 group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-200 font-black text-[10px] uppercase tracking-[0.3em]">
                                <Users size={14} /> Community
                            </div>
                            <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                                Biz kelajakni <br /> birga quramiz.
                            </h3>
                            <p className="text-blue-100 font-medium max-w-lg text-lg">
                                Enwis hamjamiyatiga qo'shiling va yangiliklardan birinchi bo'lib xabardor bo'ling.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <button className="h-16 w-16 md:h-20 md:w-20 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-110 hover:shadow-lg transition-all duration-300">
                                <ArrowRight size={32} />
                            </button>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}