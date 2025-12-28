'use client'

import { Play, Paperclip, PenLine, RotateCcw, Highlighter, Hash } from 'lucide-react'
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const teams = [
    {
        id: 1,
        name: "Diyorbek Abdumutalibov",
        role: "Software Engineer",
        specialty: "Backend Development",
        about: "Mr. Abdumutalibov — python developer with over 3+ years of experience. He has a strong background in web development and data analysis. Known for his ability to explain complex concepts in a clear manner.",
        experience: "3+ years",
        achievements: "Python projects",
        success: "20+",
        markerColor: "bg-emerald-300", // Yashil marker
        underlineColor: "decoration-emerald-400",
        image: "https://image2url.com/images/1764943692780-5bec61b3-e3c4-4d31-8d3d-66a13442acd1.jpg",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        rotate: "-rotate-2"
    },
    {
        id: 2,
        name: "Emrico",
        role: "Advisor",
        specialty: "Speaker & English Coach",
        about: "Emrico is an experienced English coach and speaker with a passion for helping others improve their language skills. Over 5 years of experience in teaching and coaching diverse learners.",
        experience: "5+ years",
        achievements: "Students coached",
        success: "1000+",
        markerColor: "bg-rose-300", // Qizil/Pushti marker
        underlineColor: "decoration-rose-400",
        image: "https://image2url.com/images/1764956341521-85f4a16a-aa9b-40a3-8e0a-0c9cca4ec6b7.jpg",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        rotate: "rotate-2"
    }
]

export function TeamSection() {
    const [selectedTeam, setSelectedTeam] = useState(teams[0])
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause()
            else videoRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <section className="py-24 bg-[#fffdfa] relative overflow-hidden min-h-screen font-sans" id="team">
            
            {/* 1. ASOSIY DAFTAR YO'LLARI (Ko'k chiziqlar) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
            />
            
            <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header Section */}
                <div className="mb-24 relative inline-block ml-[12%]">
                    <span className="absolute -top-12 -left-8 text-yellow-500 -rotate-12 opacity-50">
                        <Highlighter size={48} />
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter uppercase italic">
                        Our <span className="relative inline-block text-green-500">
                             Team
                             <svg className="absolute -bottom-3 left-0 w-full" height="15" viewBox="0 0 400 16">
                            <path d="M0 10C50 2 150 2 200 8C250 12 350 2 400 8" stroke="#EAB308" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                        </span>
                        
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* LEFT: ISMLAR RO'YXATI (Daftar chetidagi qaydlar) */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center gap-2 mb-6 text-slate-400 font-mono text-xs font-bold uppercase tracking-widest">
                            <Hash size={14} /> index_01
                        </div>
                        {teams.map((team) => (
                            <motion.div
                                key={team.id}
                                onClick={() => { setSelectedTeam(team); setIsPlaying(false); }}
                                whileHover={{ x: 10 }}
                                className={`cursor-pointer group relative p-4 transition-all ${
                                    selectedTeam.id === team.id 
                                    ? "scale-105" : "opacity-40 grayscale hover:opacity-100"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden ${selectedTeam.id === team.id ? 'ring-4 ring-yellow-200' : ''}`}>
                                        <img src={team.image} className="w-full h-full object-cover" alt={team.name} />
                                    </div>
                                    <div>
                                        <h4 className={`font-black text-sm uppercase ${selectedTeam.id === team.id ? 'text-slate-900' : 'text-slate-500'}`}>
                                            {team.name.split(" ")[0]}
                                        </h4>
                                        <div className={`h-1 w-full ${team.markerColor} mt-0.5`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* MIDDLE: VIDEO PLAYER (Daftarga yopishtirilgan Polaroid) */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className={`relative w-full max-w-[340px] p-4 bg-white border-[3px] border-slate-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] ${selectedTeam.rotate} transition-transform duration-500`}>
                            
                            {/* SKOTCH EFFEKTI (Moviy rangli yarim shaffof) */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-blue-100/60 backdrop-blur-sm z-20 -rotate-2 border-x border-blue-200/50" 
                                 style={{ clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)' }} />

                            <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden group border-2 border-slate-900">
                                <video
                                    key={selectedTeam.video}
                                    ref={videoRef}
                                    src={selectedTeam.video}
                                    className={`w-full h-full object-cover transition-all duration-700 ${!isPlaying ? 'grayscale sepia-[0.3]' : ''}`}
                                    playsInline
                                    loop
                                />
                                <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                                    {!isPlaying && (
                                        <div className="w-16 h-16 rounded-full bg-yellow-400 border-3 border-slate-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform">
                                            <Play size={28} className="fill-slate-900 ml-1" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Video ostidagi qo'lyozma yozuv */}
                            <div className="mt-4 text-center">
                                <p className="font-serif text-slate-500 italic text-sm border-b border-dashed border-slate-300 pb-1">
                                    @{selectedTeam.name.toLowerCase().replace(" ", "_")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: MA'LUMOT (Markerlar bilan belgilangan) */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="relative">
                            <PenLine className="absolute -left-14 top-0 text-slate-200 hidden xl:block" size={40} />
                            
                            <h3 className={`text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic leading-none`}>
                                {selectedTeam.name}
                            </h3>

                            <div className="relative group">
                                {/* Matn orqasidagi rangli marker effekti */}
                                <p className="text-2xl text-slate-700 font-serif italic leading-[38px] relative z-10">
                                    <span className={`${selectedTeam.markerColor} py-1 px-2 box-decoration-clone shadow-sm`}>
                                        {selectedTeam.about}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* STATS: QALAMDA CHIZILGAN QUTILARDAGI STATISTIKA */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="relative p-6 bg-white border-[3px] border-slate-900 -rotate-2 shadow-[8px_8px_0px_0px_rgba(59,130,246,0.5)]">
                                <p className="text-4xl font-black text-slate-900">{selectedTeam.experience}</p>
                                <p className="text-xs font-mono font-bold uppercase text-blue-500 mt-2 tracking-widest underline decoration-wavy">Experience</p>
                            </div>
                            
                            <div className="relative p-6 bg-white border-[3px] border-slate-900 rotate-3 shadow-[8px_8px_0px_0px_rgba(244,63,94,0.5)]">
                                <p className="text-4xl font-black text-slate-900">{selectedTeam.success}</p>
                                <p className="text-xs font-mono font-bold uppercase text-rose-500 mt-2 tracking-widest underline decoration-wavy">
                                    {selectedTeam.achievements.split(" ")[0]}
                                </p>
                            </div>
                        </div>

                        {/* FOOTER: DAFTARNING OXIRI */}
                        <div className="pt-10 flex items-center justify-between border-t-2 border-dashed border-slate-200">
                            <div className="flex gap-2">
                                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                                <div className="w-4 h-4 rounded-full bg-rose-400" />
                                <div className="w-4 h-4 rounded-full bg-blue-400" />
                            </div>
                            <button className="flex items-center gap-2 text-sm font-black uppercase italic hover:underline decoration-yellow-400 decoration-4 underline-offset-4">
                                <RotateCcw size={16} /> Re-play intro
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}