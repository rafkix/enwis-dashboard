'use client'

import Link from "next/link"
import { Mail, Github, Twitter, Youtube, Instagram, Pencil, Hash, ArrowUpRight } from 'lucide-react'
import { motion } from "framer-motion"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#fffdfa] py-16 relative overflow-hidden">
            
            {/* DAFTAR FON EFFEKTI (Hoshiya chiziqlari) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
            />
            <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    
                    {/* LOGO VA TA'RIF */}
                    <div className="flex flex-col items-start space-y-6">
                        <motion.div 
                            whileHover={{ rotate: -5 }}
                            className="relative inline-block p-2 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <img
                                src="https://image2url.com/images/1764944410839-0e0e3e25-d678-4801-9f49-011a4d8f6de0.png"
                                alt="ENWIS"
                                className="w-16 h-16 object-contain"
                            />
                        </motion.div>
                        
                        <div className="relative">
                            <p className="text-slate-700 font-serif italic leading-relaxed max-w-[240px]">
                                AI-powered vocabulary learning platform that 
                                <span className="bg-yellow-200 px-1 ml-1">remembers what you struggle with.</span>
                            </p>
                            <Pencil className="absolute -bottom-6 -right-4 text-slate-300 -rotate-12" size={24} />
                        </div>
                    </div>

                    {/* PRODUCT - Plomaster underline effekti bilan */}
                    <div>
                        <h4 className="font-black text-slate-900 mb-6 uppercase tracking-tighter italic border-b-2 border-slate-900 inline-block">
                            Product
                        </h4>
                        <ul className="space-y-3">
                            {['Features', 'Pricing', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm">
                                        <Hash size={12} className="text-slate-300" />
                                        {item}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="font-black text-slate-900 mb-6 uppercase tracking-tighter italic border-b-2 border-slate-900 inline-block">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {['About', 'Blog', 'Careers'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="group flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-bold text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-400" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONNECT - Rangli stiker uslubida */}
                    <div>
                        <h4 className="font-black text-slate-900 mb-6 uppercase tracking-tighter italic border-b-2 border-slate-900 inline-block">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' },
                                { icon: Youtube, color: 'hover:bg-red-500', label: 'Youtube' },
                                { icon: Instagram, color: 'hover:bg-pink-500', label: 'Instagram' }
                            ].map((social, i) => (
                                <Link 
                                    key={i} 
                                    href="#" 
                                    className={`w-10 h-10 flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white transition-all hover:-translate-y-1 hover:shadow-none ${social.color} hover:text-white`}
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] font-mono text-slate-400 leading-tight uppercase">
                            // stay_tuned <br />
                            // follow_the_journey
                        </p>
                    </div>
                </div>

                {/* BOTTOM FOOTER - Daftarning eng quyi qismi */}
                <div className="pt-8 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <p className="text-xs font-black text-slate-800 uppercase italic tracking-widest">
                            &copy; {currentYear} E N W I S. Project_Final_v1.0
                        </p>
                    </div>
                    
                    <div className="flex gap-8">
                        <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 hover:underline decoration-yellow-400 decoration-2 underline-offset-4 transition-all">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 hover:underline decoration-yellow-400 decoration-2 underline-offset-4 transition-all">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            {/* DEKORATIV PLOMASTER CHIZIG'I (Footerning eng pastida) */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 opacity-50" />
        </footer>
    )
}