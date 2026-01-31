"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Clock, Users, Star, CheckCircle2, ShieldCheck, Globe,
    Share2, MessageSquare, Headphones, PenTool, Mic,
    BookOpen, ArrowLeft, ChevronRight, PlayCircle, Award,
    Smartphone, Infinity, Zap, BrainCircuit, Feather, LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- 1. MOCK DATABASE (TO'LIQ MA'LUMOTLAR) ---
const examsDatabase = [
    {
        id: 1,
        title: "IELTS Full Mock Exam (AI Powered)",
        shortDesc: "Cambridge standartlari asosida to'liq simulyatsiya.",
        description: "Ushbu imtihon IELTS imtihonining haqiqiy atmosferasini his qilish uchun mo'ljallangan. Barcha 4 ta bo'lim (Listening, Reading, Writing, Speaking) qamrab olingan. Writing va Speaking javoblaringiz eng so'nggi Sun'iy Intellekt modellari orqali tekshiriladi va 5 daqiqa ichida natija olasiz.",
        price: "49,000 UZS",
        oldPrice: "100,000 UZS",
        rating: 4.9,
        reviews: 1240,
        students: "2,450",
        duration: "2 soat 45 daqiqa",
        level: "7+ - 9",
        language: "English",
        lastUpdate: "Jan 23, 2026",
        category: "IELTS",
        tags: ["Best Seller", "AI Feedback", "Certificate"],
        gradient: "from-rose-600 via-red-600 to-orange-600", // IELTS Rangi
        icon: Globe,
        sections: [
            { name: "Listening", time: "30 daqiqa", qs: "40 ta savol", icon: Headphones },
            { name: "Reading", time: "60 daqiqa", qs: "40 ta savol", icon: BookOpen },
            { name: "Writing", time: "60 daqiqa", qs: "2 ta Task", icon: PenTool },
            { name: "Speaking", time: "15 daqiqa", qs: "3 ta Part", icon: Mic },
        ],
        whatYouLearn: [
            "Haqiqiy imtihon bosimini his qilasiz",
            "AI orqali Writing va Speaking xatolaringizni ko'rasiz",
            "CEFR darajangizni aniq bilib olasiz",
            "Vaqtni to'g'ri taqsimlashni o'rganasiz"
        ]
    },
    {
        id: 2,
        title: "DTM (Ingliz tili) - Multilevel",
        shortDesc: "UzBMB standarti: Leksika va Grammatika bilan.",
        description: "O'zbekiston Respublikasi Bilim va malakalarni baholash agentligi (UzBMB) tomonidan o'tkaziladigan Multilevel imtihonining to'liq simulyatsiyasi. Ushbu testda IELTSdan farqli ravishda, alohida Grammatika va Leksika bo'limi mavjud bo'lib, B1, B2 va C1 darajalarini aniqlashga yordam beradi.",
        price: "35,000 UZS",
        oldPrice: "70,000 UZS",
        rating: 4.8,
        reviews: 940,
        students: "3,200",
        duration: "3 soat 10 daqiqa", // Real vaqtga yaqin
        level: "B1 - C1", // Multilevel tizimi
        language: "English",
        lastUpdate: "Jan 18, 2026",
        category: "CEFR", // Yoki "DTM" qilsangiz ham bo'ladi
        tags: ["Multilevel", "Grammar Focus", "Official"],
        gradient: "from-blue-700 via-indigo-700 to-violet-800",
        icon: BookOpen,
        site: "https://cefr.enwis.uz",

        // DTM (CHET TILI) STANDARTI BO'YICHA BO'LIMLAR (5 TA):
        sections: [
            {
                name: "Listening",
                time: "35 daqiqa",
                qs: "35 ta savol",
                icon: Headphones
            },
            {
                name: "Reading",
                time: "60 daqiqa",
                qs: "35 ta savol",
                icon: BookOpen
            },
            {
                name: "Writing",
                time: "45 daqiqa",
                qs: "Task 1.1 / 1.2 (Letter) & Task 2 (Essay)",
                icon: PenTool
            },
            {
                name: "Speaking",
                time: "15 daqiqa",
                qs: "3 ta Part",
                icon: Mic
            },
        ],

        whatYouLearn: [
            "Leksik va Grammatik kompetensiyani kuchaytirish",
            "Multilevel tizimida vaqtni to'g'ri taqsimlash",
            "Rasmiy xat (Formal Letter) yozish qoidalari",
            "Haqiqiy DTM savollari bazasi bilan ishlash"
        ]
    },
    {
        id: 3,
        title: "Milliy Sertifikat (Ona tili va Adabiyot)",
        shortDesc: "OTMga kirishda maksimal ball olish imkoniyati.",
        description: "Umumta'lim fanlari bo'yicha Milliy sertifikat sinovi. Ushbu test maktab dasturi (5-11 sinf) asosida tuzilgan bo'lib, yopiq (variantli) va ochiq (yozma) turdagi topshiriqlarni o'z ichiga oladi. Yuqori natija (A+, A) OTMga kirishda imtihonsiz maksimal ball beradi.",
        price: "45,000 UZS",
        oldPrice: "90,000 UZS",
        rating: 4.8,
        reviews: 5200,
        students: "12,500",
        duration: "3 soat",
        level: "A+, A, B...", // Milliy sertifikat darajalari
        language: "O'zbek", // Ona tili bo'lgani uchun
        lastUpdate: "Jan 25, 2026",
        category: "DTM",
        tags: ["A+ Daraja", "Majburiy Fan", "Maksimal Ball"],
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
        icon: ShieldCheck,

        // DTM (UMUMTA'LIM) STANDARTI BO'YICHA BO'LIMLAR:
        sections: [
            // 1-qism: Odatda variantli testlar (Yopiq)
            {
                name: "Yopiq Testlar (1-qism)",
                time: "90 daqiqa",
                qs: "30 ta savol",
                icon: CheckCircle2 // Variant tanlash belgisi
            },
            // 2-qism: Yozma yoki qisqa javobli (Ochiq)
            {
                name: "Ochiq Testlar (2-qism)",
                time: "90 daqiqa",
                qs: "10 ta savol",
                icon: PenTool // Yozma javob belgisi
            },
            // Ba'zi fanlarda 3-qism ham bo'lishi mumkin yoki umumiy bo'ladi
            {
                name: "Tahlil va Esse",
                time: "Kiritilgan",
                qs: "Matn ustida ishlash",
                icon: BookOpen
            },
        ],

        whatYouLearn: [
            "A+ daraja (Maksimal ball) olish strategiyasi",
            "Ochiq turdagi savollarga to'g'ri javob yozish",
            "Maktab dasturidagi bo'shliqlarni to'ldirish",
            "Vaqtni to'g'ri taqsimlash (Time Management)"
        ]
    },
    {
        id: 4,
        title: "General English A2 (Beginner)",
        shortDesc: "Ingliz tilini endi boshlaganlar uchun maxsus.",
        description: "Boshlang'ich darajadagi o'quvchilar uchun soddalashtirilgan test. Asosiy grammatika, kundalik so'zlashuv va oson matnlar orqali bilimingizni mustahkamlang.",
        price: "20,000 UZS",
        oldPrice: "40,000 UZS",
        rating: 4.8,
        reviews: 320,
        students: "800",
        duration: "1 soat 30 daqiqa",
        level: "A2",
        language: "English",
        lastUpdate: "Nov 20, 2025",
        category: "General",
        tags: ["Beginner", "Easy Start"],
        gradient: "from-sky-500 via-blue-500 to-azure-600", // General Rangi
        icon: Feather,
        sections: [
            { name: "Grammar", time: "30 daqiqa", qs: "25 ta savol", icon: PenTool },
            { name: "Vocabulary", time: "20 daqiqa", qs: "20 ta savol", icon: BookOpen },
            { name: "Reading", time: "40 daqiqa", qs: "3 ta matn", icon: BookOpen },
        ],
        whatYouLearn: [
            "Ingliz tili bazasini mustahkamlash",
            "Yangi so'zlarni o'rganish",
            "O'ziga bo'lgan ishonchni oshirish"
        ]
    },
    {
        id: 5,
        title: "AI Speaking Simulator (Pro)",
        shortDesc: "Sun'iy intellekt bilan jonli suhbat.",
        description: "Examinator bilan yuzma-yuz gaplashishdan qo'rqasizmi? Bizning AI simulyatorimiz orqali istalgan vaqtda Speaking qiling. Talaffuz, grammatika va ravonlik bo'yicha darhol feedback oling.",
        price: "15,000 UZS",
        oldPrice: "30,000 UZS",
        rating: 5.0,
        reviews: 540,
        students: "3,100",
        duration: "15 daqiqa",
        level: "All Levels",
        language: "English",
        lastUpdate: "Jan 20, 2026",
        category: "AI Tools",
        tags: ["AI", "Speaking", "New Technology"],
        gradient: "from-violet-600 via-purple-600 to-fuchsia-700", // AI Rangi
        icon: BrainCircuit,
        sections: [
            { name: "Part 1", time: "4-5 daqiqa", qs: "Introduction", icon: Mic },
            { name: "Part 2", time: "3-4 daqiqa", qs: "Cue Card", icon: Mic },
            { name: "Part 3", time: "4-5 daqiqa", qs: "Discussion", icon: Mic },
        ],
        whatYouLearn: [
            "O'z talaffuzingizni (Pronunciation) tuzatish",
            "Hayajonni yengish",
            "Turli mavzularda erkin gapirish",
            "AI dan to'g'ri va xolis baho olish"
        ]
    },
    {
        id: 6,
        title: "IELTS Writing Task 2 Masterclass",
        shortDesc: "Insholarni 7.0+ darajasida yozishni o'rganing.",
        description: "Faqat Writing bo'limiga qaratilgan maxsus test. 5 xil turdagi insholar (Opinion, Discussion, Problem-Solution...) bo'yicha amaliyot. Har bir insho AI tomonidan tekshiriladi.",
        price: "15,000 UZS",
        oldPrice: "25,000 UZS",
        rating: 4.6,
        reviews: 410,
        students: "1,200",
        duration: "40 daqiqa",
        level: "B2 - C1",
        language: "English",
        lastUpdate: "Dec 05, 2025",
        category: "IELTS",
        tags: ["Writing", "Essay", "Feedback"],
        gradient: "from-rose-600 via-red-600 to-orange-600", // IELTS Rangi
        icon: PenTool,
        sections: [
            { name: "Task 2 Essay", time: "40 daqiqa", qs: "1 ta Insho", icon: PenTool },
        ],
        whatYouLearn: [
            "Insho strukturasini to'g'ri qurish",
            "Coherence va Cohesion ni yaxshilash",
            "Grammatik xatolarni kamaytirish"
        ]
    }
]

// --- NOISE COMPONENT ---
const Noise = ({ opacity = "opacity-20" }: { opacity?: string }) => (
    <div
        className={`absolute inset-0 z-0 pointer-events-none mix-blend-overlay ${opacity}`}
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '150px'
        }}
    />
)

export default function ExamDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [exam, setExam] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // --- DATA FETCHING ---
    useEffect(() => {
        if (params.id) {
            const found = examsDatabase.find(e => e.id === Number(params.id))
            // Simulyatsiya qilingan kechikish (real hayotda API call bo'ladi)
            setTimeout(() => {
                setExam(found)
                setLoading(false)
            }, 400)
        }
    }, [params.id])

    // --- LOADING ---
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Yuklanmoqda...</p>
            </div>
        </div>
    )

    // --- NOT FOUND ---
    if (!exam) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center p-6">
            <h2 className="text-3xl font-black text-slate-900 mb-2">404</h2>
            <p className="text-slate-500 mb-6">Ushbu imtihon topilmadi.</p>
            <Button onClick={() => router.push('/exams')} variant="outline">Katalogga qaytish</Button>
        </div>
    )

    // --- MAIN CONTENT ---
    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans">

            {/* 1. DYNAMIC HERO SECTION */}
            <div className={`pt-32 pb-20 relative overflow-hidden bg-slate-900`}>

                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exam.gradient} opacity-20`} />
                <Noise opacity="opacity-30" />

                {/* Orqa fon dekoratsiyasi */}
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-bold text-white/60 mb-8 uppercase tracking-wider">
                        <Link href="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
                        <ChevronRight size={12} />
                        <Link href="/exams" className="hover:text-white transition-colors">Imtihonlar</Link>
                        <ChevronRight size={12} />
                        <span className="text-white">{exam.category}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 justify-between items-start">
                        <div className="max-w-3xl space-y-6">

                            {/* Tags */}
                            <div className="flex gap-2">
                                {exam.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-white tracking-tight leading-tight">
                                {exam.title}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl">
                                {exam.shortDesc}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-bold pt-4">
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md text-yellow-300">
                                    <Star size={18} fill="currentColor" /> {exam.rating} <span className="text-white/50 font-medium">({exam.reviews} sharh)</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users size={18} /> {exam.students} o'quvchi
                                </span>
                                <span className="flex items-center gap-2">
                                    <Globe size={18} /> {exam.language}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock size={18} /> Yangilangan: {exam.lastUpdate}
                                </span>
                            </div>
                        </div>

                        {/* Big Icon (Hero Right) */}
                        <div className="hidden lg:flex items-center justify-center w-64 h-64 relative">
                            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
                            <div className="relative w-full h-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-[3rem] flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-500">
                                <exam.icon size={100} className="text-white drop-shadow-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (DETAILS) --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* What you'll learn */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-10 -mt-10" />
                            <h3 className="text-xl font-extrabold text-slate-900 mb-6 relative z-10">Nimalarga ega bo'lasiz?</h3>
                            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                {exam.whatYouLearn.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1 bg-emerald-100 rounded-full">
                                            <CheckCircle2 size={16} className="text-emerald-600" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600 leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Syllabus (Sections) */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-extrabold text-slate-900 mb-6">Imtihon Tarkibi</h3>
                            <div className="space-y-4">
                                {exam.sections.map((sec: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-700 shadow-sm group-hover:scale-110 transition-transform">
                                                <sec.icon size={22} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base mb-0.5">{sec.name}</h4>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{sec.qs}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                                            {sec.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Batafsil ma'lumot</h3>
                            <p className="text-slate-500 leading-relaxed font-medium text-base">
                                {exam.description}
                            </p>
                        </div>

                        {/* Instructor / AI Profile */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl relative overflow-hidden text-white">
                            <Noise opacity="opacity-20" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />

                            <div className="relative z-10 flex items-center gap-6">
                                <div className={`w-20 h-20 bg-gradient-to-br ${exam.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
                                    <Zap size={40} />
                                </div>
                                <div>
                                    <h4 className="font-black text-2xl mb-1">Enwis AI Examiner</h4>
                                    <p className="text-sm text-slate-400 font-medium mb-3">Sun'iy intellektga asoslangan xolis baholash tizimi.</p>
                                    <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Star size={12} /> Pro Version</span>
                                        <span className="flex items-center gap-1"><ShieldCheck size={12} /> Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">

                            {/* ACTION CARD */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
                                {/* Top highlight line */}
                                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${exam.gradient}`} />

                                <div className="flex items-baseline gap-3 mb-2 mt-4">
                                    <h2 className="text-4xl font-[1000] text-slate-900 tracking-tighter">{exam.price}</h2>
                                    {exam.price !== "Bepul" && (
                                        <span className="text-sm font-bold text-slate-400 line-through decoration-2">{exam.oldPrice}</span>
                                    )}
                                </div>

                                {/* Timer */}
                                {exam.price !== "Bepul" && (
                                    <div className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase tracking-widest mb-8 bg-rose-50 inline-flex px-3 py-1.5 rounded-lg">
                                        <Clock size={14} /> 2 soat qoldi
                                    </div>
                                )}

                                <div className="space-y-3 mb-8 mt-4">
                                    <Button
                                        onClick={() => {
                                            // 👇 MANTIQ SHU YERDA O'ZGARDI
                                            if (exam.site) {
                                                window.open(exam.site, '_blank') // Sayt bo'lsa, yangi oynada ochish
                                                // Yoki shu oynada ochish uchun: window.location.href = exam.site
                                            } else {
                                                router.push(`/exam/${exam.id}/take`) // Sayt bo'lmasa, ichki testga o'tish
                                            }
                                        }}
                                        className="w-full h-16 bg-slate-900 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-[#17776A] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/20 text-sm flex items-center gap-2"
                                    >
                                        <PlayCircle size={20} />
                                        {/* Tugma matnini ham dinamik qilish mumkin */}
                                        {exam.site ? "Saytga o'tish" : "Sinovni Boshlash"}
                                    </Button>

                                    {exam.price !== "Bepul" && !exam.site && (
                                        <Button variant="outline" className="w-full h-14 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all uppercase tracking-widest text-xs">
                                            Savatga qo'shish
                                        </Button>
                                    )}
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 pt-6 border-t border-slate-100">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Imkoniyatlar:</h4>
                                    {[
                                        { icon: Smartphone, text: "Mobil telefonda ishlash" },
                                        { icon: Infinity, text: "Umrbod foydalanish" },
                                        { icon: Award, text: "Bitiruv sertifikati" },
                                        { icon: MessageSquare, text: "AI Feedback & Sharh" }
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <f.icon size={14} />
                                            </div>
                                            {f.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Business Link */}
                            <Link href="/business" className="block"> {/* 👈 Link qo'shildi */}
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 text-center shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                    <h4 className="font-bold text-slate-900 mb-1">Jamoaviy obuna kerakmi?</h4>
                                    <p className="text-xs text-slate-500 mb-4 font-medium">O'quv markazlar uchun maxsus takliflarimiz bor.</p>
                                    <span className="text-[#17776A] text-xs font-black uppercase tracking-widest group-hover:underline flex items-center justify-center gap-1 transition-all">
                                        Biznes uchun Enwis 
                                        {/* Hover bo'lganda strelka biroz o'ngga siljiydi */}
                                        <ArrowLeft size={12} className="rotate-180 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}