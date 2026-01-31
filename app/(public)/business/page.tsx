"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
    Building2, Users, Zap, ShieldCheck, 
    BarChart3, CheckCircle2, ArrowLeft, Mail, Phone,
    Globe, LayoutDashboard, MonitorSmartphone, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- COMPONENTS ---

const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden ${className}`}>
        <div className="max-w-[1440px] mx-auto relative z-10 w-full">
            {children}
        </div>
    </section>
)

const Noise = () => (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
)

export default function BusinessPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-[#17776A]/20">
            
            {/* 0. HEADER / NAV (Back Button) */}
            <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-white hover:shadow-lg transition-all">
                        <ArrowLeft size={16} /> Asosiyga qaytish
                    </Link>
                </div>
                {/* Logo */}
                <div className="hidden md:block font-[1000] text-xl text-slate-900 pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200">
                    ENWIS <span className="text-emerald-600">BUSINESS</span>
                </div>
            </div>

            {/* 1. HERO SECTION (B2B) */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 text-white">
                <Noise />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Building2 size={14} /> O'quv Markazlar Uchun
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[1000] tracking-tighter leading-[1.1] mb-8">
                            O'z brendingiz ostida <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Mock Exam Platformasi
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                            O'quv markazingizda xalqaro standartdagi <b>IELTS, CEFR va DTM</b> imtihonlarini tashkil qiling. 
                            Biz sizga tayyor <b>App + Admin Panel</b> beramiz.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Button className="h-16 px-10 bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-600 shadow-2xl shadow-emerald-500/30 transition-all text-sm w-full sm:w-auto">
                                <Phone className="mr-2" size={18}/> Aloqaga Chiqish
                            </Button>
                            <Button variant="outline" className="h-16 px-10 border-white/10 bg-white/5 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-sm backdrop-blur-sm w-full sm:w-auto">
                                <MonitorSmartphone className="mr-2" size={18}/> Demo Versiya
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. MUAMMO (DAVLAT NARXLARI) */}
            <div className="border-b border-slate-200 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <h3 className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-2">Bozordagi Muammo</h3>
                        <h2 className="text-3xl md:text-4xl font-[1000] text-slate-900 leading-tight mb-4">
                            Nega o'quvchilar rasmiy imtihonlarga ko'p pul sarflashi kerak?
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Rasmiy tashkilotlarda 1 ta Mock imtihon narxi o'rtacha <b>150,000 so'm</b> atrofida. 
                            Bu o'quvchi uchun qimmat, o'quv markazi uchun esa foydasiz.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-lg">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                            <span className="text-slate-500 font-bold">Rasmiy Mock (1 ta)</span>
                            <span className="text-red-500 font-black text-xl opacity-40"><del>~150,000 UZS</del></span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-900 font-bold flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={20}/> Sizdagi narx (Enwis)</span>
                            <span className="text-emerald-600 font-black text-2xl">59,960 UZS</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-4 font-medium">*Bizning platforma orqali tannarxni 3 barobargacha tushirasiz.</p>
                    </div>
                </div>
            </div>

            {/* 3. YECHIM (PLATFORMA) */}
            <SectionWrapper>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em]">Bizning Yechim</span>
                    <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 mt-3">Tayyor IT Ekotizim</h2>
                    <p className="text-slate-500 mt-4 text-lg">Sizga shunchaki login va parol beramiz. Kompyuterlaringizga o'rnatib, darhol daromad qilishni boshlaysiz.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            title: "Mock Exam App", 
                            desc: "Windows/Mac uchun maxsus ilova. Xuddi haqiyqiy imtihondagi interfeys. Internet uzilib qolsa ham ishlaydi.", 
                            icon: MonitorSmartphone, color: "bg-blue-50 text-blue-600" 
                        },
                        { 
                            title: "Admin Panel", 
                            desc: "Markaz direktori uchun boshqaruv paneli. Kim qancha ball oldi? Qaysi kompyuter band? Hammasi kaftdek.", 
                            icon: LayoutDashboard, color: "bg-purple-50 text-purple-600" 
                        },
                        { 
                            title: "AI Examiner", 
                            desc: "Writing va Speaking javoblarini Sun'iy Intellekt tekshiradi. O'qituvchi vaqtini sarflamaydi.", 
                            icon: Zap, color: "bg-amber-50 text-amber-600" 
                        },
                    ].map((f, i) => (
                        <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                            <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                                <f.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-3 relative z-10">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium relative z-10">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* 4. PRICING (TARIFLAR - YANGILANGAN) */}
            <SectionWrapper className="bg-slate-900 relative overflow-visible">
                <div className="absolute inset-0 z-0">
                    <Noise />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 via-[#0f172a] to-slate-900" />
                </div>
                
                <div className="relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 text-white">
                        <span className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Hamkorlik Paketlari</span>
                        <h2 className="text-4xl md:text-5xl font-[1000] leading-tight">Biznesingiz Hajmiga Mos <br/> Tariflar</h2>
                        <p className="text-slate-400 mt-6 text-lg font-medium leading-relaxed">
                            Kompyuterlar sonidan kelib chiqib o'z paketingizni tanlang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        
                        {/* 1. KICHIK MARKAZ (Start) */}
                        <div className="p-8 bg-white text-slate-900 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 transform lg:scale-105 z-20 border border-slate-200 relative">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black uppercase px-6 py-2 rounded-full tracking-widest shadow-lg">
                                Eng Hamyonbop
                            </div>

                            <h3 className="text-2xl font-[1000] mb-2 text-slate-900">Kichik Markaz</h3>
                            <p className="text-sm text-slate-500 font-medium mb-8">Boshlanishiga ajoyib tanlov</p>
                            
                            <div className="mb-2 flex items-baseline gap-2">
                                <span className="text-5xl font-[1000] text-slate-900">59,960</span>
                                <span className="text-slate-400 font-bold text-sm"> so'm / test</span>
                            </div>
                            <div className="text-emerald-700 text-xs font-bold bg-emerald-100 px-4 py-2 rounded-xl inline-block mb-8 border border-emerald-200">
                                Minimal: 15 ta kompyuter
                            </div>
                            
                            <ul className="space-y-4 mb-10 text-slate-700 text-sm font-bold">
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> Mock Exam App</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> Admin Panel</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> AI Feedback (Basic)</li>
                            </ul>
                            
                            <Button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-600 shadow-xl transition-all text-sm">
                                Tanlash
                            </Button>
                        </div>

                        {/* 2. KATTA MARKAZ (Pro) */}
                        <div className="p-8 bg-slate-800/40 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 hover:border-slate-600 transition-colors relative group">
                            <h3 className="text-xl font-extrabold text-white mb-2">Katta Markaz</h3>
                            <p className="text-sm text-slate-400 font-medium mb-8">Rivojlangan o'quv markazlari</p>
                            
                            <div className="mb-2">
                                <span className="text-4xl font-[1000] text-white">69,450</span>
                                <span className="text-slate-500 font-bold text-xs"> so'm / test</span>
                            </div>
                            <div className="text-slate-300 text-xs font-bold bg-slate-700/50 px-3 py-1.5 rounded-lg inline-block mb-8">
                                Sig'im: 30 tagacha kompyuter
                            </div>
                            
                            <ul className="space-y-4 mb-8 text-slate-300 text-sm font-medium">
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> Shaxsiy Brending (Logo)</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> AI Examiner Pro</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> Premium Support</li>
                            </ul>
                            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-600 text-slate-300 hover:bg-white hover:text-slate-900 bg-transparent transition-all">
                                Tanlash
                            </Button>
                        </div>

                        {/* 3. ENTERPRISE */}
                        <div className="p-8 bg-slate-800/40 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 hover:border-slate-600 transition-colors">
                            <h3 className="text-xl font-extrabold text-white mb-2">Tarmoq</h3>
                            <p className="text-sm text-slate-400 font-medium mb-8">Katta filiallar uchun</p>
                            
                            <div className="mb-2">
                                <span className="text-3xl font-[1000] text-white">Kelishuv</span>
                            </div>
                            <div className="text-slate-400 text-xs font-bold bg-slate-700/50 px-3 py-1.5 rounded-lg inline-block mb-8">
                                Depozit: Individual
                            </div>
                            
                            <ul className="space-y-4 mb-8 text-slate-300 text-sm font-medium">
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> API Integratsiya</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> To'liq White Label</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> Shaxsiy menejer</li>
                            </ul>
                            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-600 text-slate-300 hover:bg-white hover:text-slate-900 bg-transparent transition-all">
                                Bog'lanish
                            </Button>
                        </div>

                    </div>
                </div>
            </SectionWrapper>

            {/* 5. CALCULATOR (FOYDA) */}
            <SectionWrapper className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 leading-tight mb-6">
                            Qancha daromad qilasiz?
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                            Keling, hisoblab ko'ramiz. Test narxini hamyonbop <b>59,960 so'm</b> qilib belgiladingiz va haftasiga 3 marta "Mock Day" (imtihon kuni) o'tkazdingiz.
                            <br/>
                            <span className="text-sm text-slate-400 mt-2 block">
                                (20 ta kompyuter × haftasiga 3 ta test)
                            </span>
                        </p>
                        
                        <div className="space-y-6">
                            {/* 1. Sotuv Narxi */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-600">Sotuv narxi (O'quvchi):</span>
                                <span className="font-black text-slate-900 text-xl">59,960 UZS</span>
                            </div>

                            {/* 2. Platforma Xarajati (60%) */}
                            <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100">
                                <span className="font-bold text-slate-600">Platforma to'lovi (60%):</span>
                                <span className="font-black text-red-500 text-xl">-35,976 UZS</span>
                            </div>

                            {/* 3. Sof Foyda (40%) */}
                            <div className="flex items-center justify-between p-6 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20">
                                <span className="font-bold">Sof foyda (1 ta testdan):</span>
                                <span className="font-black text-3xl">23,984 UZS</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Oylik Natija */}
                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
                        <Noise />
                        <div className="relative z-10 text-center">
                            <TrendingUp className="mx-auto text-emerald-400 mb-6" size={64} />
                            <h3 className="text-2xl font-bold mb-2">Oylik Sof Foyda</h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                20 kompyuter × 12 test (oyiga) = 240 test
                            </p>
                            
                            {/* 23,984 * 240 = 5,756,160 */}
                            <div className="text-5xl md:text-7xl font-[1000] text-emerald-400 tracking-tighter mb-4">
                                5.7 MLN
                            </div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                                Qo'shimcha daromad (so'mda)
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. CONTACT FORM */}
            <div className="bg-[#F8FAFC] py-20 px-6">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-[1000] text-slate-900 mb-2">Hamkorlikni Boshlaymiz</h2>
                        <p className="text-slate-500 font-medium">Ma'lumotlaringizni qoldiring, menejerimiz 15 daqiqada aloqaga chiqadi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-3 mb-1 block">Ismingiz</label>
                                <input type="text" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-900 outline-none focus:border-emerald-500 transition-colors" placeholder="Ism Familiya" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-3 mb-1 block">Markaz Nomi</label>
                                <input type="text" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-900 outline-none focus:border-emerald-500 transition-colors" placeholder="Cambridge LC" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-3 mb-1 block">Telefon Raqam</label>
                                <input type="text" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-900 outline-none focus:border-emerald-500 transition-colors" placeholder="+998 90 123 45 67" />
                            </div>
                            <div className="pt-6">
                                <Button className="w-full h-14 bg-slate-900 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-lg">
                                    Yuborish
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}