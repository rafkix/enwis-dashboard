"use client"

import React from "react"
import Link from "next/link"
import { 
    Instagram, Youtube, Send, Mail, MapPin, 
    ArrowRight 
} from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#020617] text-slate-400 font-sans border-t border-slate-900 relative overflow-hidden">
            
            {/* Orqa fon nuri */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#17776A]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Asosiy Container */}
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 relative z-10">
                
                {/* 1. MAIN GRID (Yuqori qism) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-12 pb-12 border-b border-slate-900">
                    
                    {/* BRAND (Chap) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#17776A] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#17776A]/20">E</div>
                            <span className="text-2xl font-bold text-white tracking-tight">Enwis</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Sun'iy intellekt yordamida bilimingizni aniq baholang. Biz ta'lim sifatini yangi bosqichga olib chiqamiz.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {[{ icon: Instagram }, { icon: Youtube }, { icon: Send }].map((item, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-[#17776A] hover:text-white transition-all">
                                    <item.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* LINKS (O'rta) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Platforma</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                {['Test Topshirish', 'Tariflar', 'Natijalar', 'Yangiliklar'].map(l => <li key={l}><Link href="#" className="hover:text-[#17776A] transition-colors">{l}</Link></li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Kompaniya</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                {['Biz Haqimizda', 'Xayriya', 'Aloqa', 'Ommaviy Oferta'].map(l => <li key={l}><Link href="#" className="hover:text-[#17776A] transition-colors">{l}</Link></li>)}
                            </ul>
                        </div>
                    </div>

                    {/* CONTACT (O'ng) */}
                    <div className="lg:col-span-4 space-y-5">
                        <h4 className="text-white font-bold mb-1 text-sm uppercase tracking-wider">Yangiliklar</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email manzilingiz" className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#17776A] transition-colors" />
                            <button className="bg-[#17776A] hover:bg-[#136358] text-white rounded-xl px-4 transition-colors"><ArrowRight size={20} /></button>
                        </div>
                        <div className="pt-2 space-y-2">
                            <a href="mailto:info@enwis.uz" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                                <Mail size={16} className="text-[#17776A]" /> info@enwis.uz
                            </a>
                            <div className="flex items-start gap-3 text-sm text-slate-400">
                                <MapPin size={16} className="text-[#17776A] mt-0.5" /> Farg'ona sh., Qirguli, 108-uy
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR (IXCHAM VA MARKAZLASHGAN) */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-slate-500 font-medium">
                    <p>&copy; {currentYear} ENWIS Inc. Barcha huquqlar himoyalangan.</p>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Maxfiylik Siyosati</Link>
                        <Link href="#" className="hover:text-white transition-colors">Foydalanish Shartlari</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}