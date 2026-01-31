"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Search, Star, ArrowRight, Zap, 
    ChevronRight, LayoutGrid, Globe, BookOpen, 
    ShieldCheck, CheckCircle2, BrainCircuit, Feather
} from "lucide-react"

// --- 1. BASE64 NOISE ---
const Noise = ({ opacity = "opacity-20" }: { opacity?: string }) => (
    <div 
        className={`absolute inset-0 z-0 pointer-events-none mix-blend-overlay ${opacity}`}
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '150px'
        }}
    />
)

// --- 2. CONFIG: RANGLAR VA ICONLAR ---
const categoryConfig: Record<string, any> = {
    "Barchasi": {
        title: "Barcha Imtihonlar",
        desc: "O'z bilim darajangizni aniqlash uchun eng mos sinovni tanlang.",
        gradient: "from-slate-900 via-slate-800 to-black",
        icon: LayoutGrid,
        accent: "text-white border-white/20 bg-white/10",
        iconColor: "text-slate-700"
    },
    "IELTS": {
        title: "IELTS Mock Exams",
        desc: "Cambridge standartlari. Writing va Speaking uchun AI tekshiruvi.",
        gradient: "from-rose-600 via-red-600 to-orange-600",
        icon: Globe,
        accent: "text-yellow-200 border-rose-400/30 bg-rose-500/20",
        iconColor: "text-rose-600"
    },
    "CEFR": {
        title: "CEFR Multilevel",
        desc: "Yevropa standartlari (A1-C2). DTM va Xalqaro sertifikatlar uchun.",
        gradient: "from-blue-700 via-indigo-700 to-violet-800",
        icon: BookOpen,
        accent: "text-blue-200 border-blue-400/30 bg-blue-500/20",
        iconColor: "text-indigo-600"
    },
    "DTM": {
        title: "Milliy Sertifikat",
        desc: "O'zbekiston OTMlariga kirish uchun maxsus testlar.",
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
        icon: ShieldCheck,
        accent: "text-emerald-200 border-emerald-400/30 bg-emerald-500/20",
        iconColor: "text-emerald-600"
    },
    "AI Tools": {
        title: "AI Simulators",
        desc: "Speaking va Writing ko'nikmalaringizni alohida rivojlantiring.",
        gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
        icon: BrainCircuit,
        accent: "text-fuchsia-200 border-purple-400/30 bg-purple-500/20",
        iconColor: "text-purple-600"
    },
    "General": {
        title: "General English",
        desc: "Boshlang'ich va o'rta darajadagi testlar.",
        gradient: "from-sky-500 via-blue-500 to-indigo-600",
        icon: Feather,
        accent: "text-sky-100 border-sky-400/30 bg-sky-500/20",
        iconColor: "text-sky-600"
    }
}

// --- MOCK DATA ---
const allExams = [
    { 
        id: 1, 
        title: "IELTS Full Mock (AI)", 
        category: "IELTS", 
        price: "49,000 UZS", 
        users: "2.4k", 
        rating: 4.9, 
        tag: "Best Seller",
        features: ["AI Feedback", "Band Score"]
    },
    { 
        id: 2, 
        title: "CEFR B2 Level Test", 
        category: "CEFR", 
        price: "35,000 UZS", 
        users: "1.8k", 
        rating: 4.7, 
        tag: "Popular",
        features: ["Certificate", "Detailed Report"]
    },
    { 
        id: 3, 
        title: "DTM (Milliy Sertifikat)", 
        category: "DTM", 
        price: "Bepul", 
        users: "5.2k", 
        rating: 4.5, 
        tag: "Free",
        features: ["Official Format", "UzBMB Standard"]
    },
    { 
        id: 4, 
        title: "General English A2", 
        category: "General", 
        price: "20,000 UZS", 
        users: "800", 
        rating: 4.8, 
        tag: "Beginner",
        features: ["Grammar", "Vocabulary"]
    },
    { 
        id: 5, 
        title: "AI Speaking Simulator", 
        category: "AI Tools", 
        price: "15,000 UZS", 
        users: "3.1k", 
        rating: 5.0, 
        tag: "New",
        features: ["Real-time", "Pronunciation"]
    },
    { 
        id: 6, 
        title: "IELTS Writing Task 2", 
        category: "IELTS", 
        price: "15,000 UZS", 
        users: "1.2k", 
        rating: 4.6, 
        tag: "Writing",
        features: ["Essay Check", "Correction"]
    },
]

const categories = Object.keys(categoryConfig)

// --- COMPONENT: EXAM CARD ---
const ExamCard = ({ exam }: { exam: any }) => {
    const config = categoryConfig[exam.category] || categoryConfig["Barchasi"]
    const Icon = config.icon

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative h-full flex flex-col"
        >
            <Link href={`/exams/${exam.id}`} className="block h-full">
                <div className="relative h-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 group-hover:border-slate-300">
                    
                    {/* Header: Dynamic Gradient */}
                    <div className={`h-36 bg-gradient-to-br ${config.gradient} relative p-6 flex flex-col justify-between overflow-hidden`}>
                        <Noise opacity="opacity-40" />
                        
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                        
                        <div className="relative z-10 flex justify-between items-start">
                            <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
                                {exam.category}
                            </span>
                            {exam.tag === "Free" && (
                                <span className="bg-white text-slate-900 px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm flex items-center gap-1">
                                    <Zap size={10} className="text-yellow-500 fill-yellow-500"/> Free
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Floating Icon */}
                    <div className="relative px-6 -mt-10 flex justify-between items-end z-10">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center border-4 border-[#F8FAFC] group-hover:scale-110 transition-transform duration-300 overflow-hidden relative">
                            {/* Icon rangi dinamik */}
                            <Icon size={36} className={`${config.iconColor} relative z-10`} />
                        </div>
                        <div className="mb-2 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                            <span className="text-sm font-bold text-slate-700">{exam.rating}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-3 flex-1 flex flex-col">
                        <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight line-clamp-2 min-h-[3rem] group-hover:text-[#17776A] transition-colors">
                            {exam.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {exam.features?.map((f: string, i: number) => (
                                <span key={i} className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                                    <CheckCircle2 size={10} /> {f}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between group/btn">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Narxi</p>
                                <p className="text-xl font-black text-slate-900">{exam.price}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-slate-100 text-slate-400 group-hover/btn:bg-slate-900 group-hover/btn:text-white group-hover/btn:scale-110`}>
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function ExamsCatalogPage() {
    const [activeCategory, setActiveCategory] = useState("Barchasi")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredExams = allExams.filter(exam => {
        const matchesCategory = activeCategory === "Barchasi" || exam.category === activeCategory
        const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const currentBanner = categoryConfig[activeCategory] || categoryConfig["Barchasi"]

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
            <div className="h-28" />

            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* --- LEFT SIDEBAR (FIXED COLORS) --- */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-28 space-y-6">
                            
                            {/* Mobile Search */}
                            <div className="lg:hidden relative">
                                <div className="relative bg-white rounded-2xl flex items-center border border-slate-200 h-14 shadow-sm">
                                    <Search className="ml-4 text-slate-400" size={22} />
                                    <input 
                                        type="text" 
                                        placeholder="Qidirish..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 h-full bg-transparent outline-none px-3 text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1 hidden lg:block">
                                    Bo'limlar
                                </h3>
                                <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-2 lg:pb-0 no-scrollbar">
                                    {categories.map((cat) => {
                                        const config = categoryConfig[cat]
                                        const Icon = config.icon
                                        const isActive = activeCategory === cat

                                        return (
                                            <button 
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                // 👇 RANG O'ZGARISHLARI SHU YERDA
                                                className={`relative flex items-center w-auto lg:w-full px-5 py-4 rounded-2xl text-sm font-bold transition-all shrink-0 border group overflow-hidden ${
                                                    isActive 
                                                        ? `bg-gradient-to-r ${config.gradient} text-white border-transparent shadow-xl shadow-slate-300/50 scale-[1.02]` // Active: Dinamik Gradient
                                                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                                                }`}
                                            >
                                                {isActive && <Noise opacity="opacity-30" />}
                                                
                                                <span className={`mr-3 relative z-10 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                                    <Icon size={20} />
                                                </span>
                                                <span className="whitespace-nowrap relative z-10">{cat}</span>
                                                {isActive && (
                                                    <motion.div layoutId="chevron" className="hidden lg:block absolute right-4 z-10">
                                                        <ChevronRight size={16} />
                                                    </motion.div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT CONTENT --- */}
                    <div className="lg:col-span-9 space-y-10">
                        
                        {/* A. DYNAMIC BANNER */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                className={`relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br ${currentBanner.gradient}`}
                            >
                                <Noise opacity="opacity-50" />
                                
                                <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

                                <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="max-w-lg space-y-6 text-center md:text-left">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-md border rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg ${currentBanner.accent}`}>
                                            <currentBanner.icon size={14} /> {activeCategory} Zone
                                        </div>
                                        <h1 className="text-4xl md:text-6xl font-[1000] text-white leading-none tracking-tight drop-shadow-lg">
                                            {currentBanner.title}
                                        </h1>
                                        <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed max-w-md">
                                            {currentBanner.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Glass Box */}
                                    <div className="hidden md:flex items-center justify-center w-48 h-48 relative group cursor-default">
                                        <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full scale-90 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/40 rounded-[2.5rem] flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden">
                                            <Noise opacity="opacity-20" />
                                            <currentBanner.icon size={80} className={`text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10`} />
                                            <div className="absolute top-6 right-6 w-3 h-3 bg-white/80 rounded-full blur-[1px]" />
                                            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* B. SEARCH BAR */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="w-full md:flex-1 relative group max-w-lg">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-100 rounded-2xl blur opacity-50 transition-opacity" />
                                <div className="relative bg-white rounded-2xl flex items-center shadow-sm border border-slate-200 h-14 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 transition-all">
                                    <Search className="ml-5 text-slate-400" size={22} />
                                    <input 
                                        type="text" 
                                        placeholder={`${activeCategory} bo'yicha qidirish...`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-full bg-transparent outline-none px-4 text-base font-medium text-slate-900 placeholder:text-slate-400 rounded-2xl"
                                    />
                                </div>
                            </div>
                            <div className="text-sm font-bold text-slate-500 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                                <span className="text-slate-900 font-black text-xl mr-1">{filteredExams.length}</span> natija
                            </div>
                        </div>

                        {/* C. GRID */}
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredExams.map((exam) => (
                                    <ExamCard key={exam.id} exam={exam} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* EMPTY STATE */}
                        {filteredExams.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">Ushbu bo'limda testlar topilmadi</h3>
                                <p className="text-slate-500 mb-6">Boshqa bo'limni tanlab ko'ring yoki qidiruv so'zini o'zgartiring.</p>
                                <button 
                                    onClick={() => {setSearchQuery(""); setActiveCategory("Barchasi")}}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#17776A] transition-colors"
                                >
                                    Barchasini ko'rsatish
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}