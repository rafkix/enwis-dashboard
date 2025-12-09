'use client'

import { Play } from 'lucide-react'
import { useState, useRef } from "react"

const teams = [
    {
        id: 1,
        name: "Diyorbek Abdumutalibov",
        role: "Software Engineer",
        specialty: "Backend Development",
        about: "Mr. Abdumutalibov — python developer with over 3+ years of experience. He has a strong background in web development and data analysis. In addition to his technical skills, Mr. Abdumutalibov is known for his excellent communication skills and ability to explain complex concepts in a clear and concise manner.",
        experience: "3+ years",
        achievements: "Python projects",
        success: "20+",
        accentColor: "bg-green-500",
        image: "https://image2url.com/images/1764943692780-5bec61b3-e3c4-4d31-8d3d-66a13442acd1.jpg",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", // keep empty if none
    },
    {
        id: 2,
        name: "Emrico",
        role: "Advisor",
        specialty: "Speaker & English Coach",
        about: "Emrico is an experienced English coach and speaker with a passion for helping others improve their language skills. With over 5 years of experience in teaching and coaching, Emrico has worked with a diverse range of students, from beginners to advanced learners.",
        experience: "5+ years",
        achievements: "Students coached",
        success: "1000+",
        accentColor: "bg-red-500",
        image: "https://image2url.com/images/1764956341521-85f4a16a-aa9b-40a3-8e0a-0c9cca4ec6b7.jpg",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
]

export function TeamSection() {
    const [selectedTeam, setSelectedTeam] = useState(teams[0])
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showPause, setShowPause] = useState(false)

    return (
        <section className="py-32 mb-24 bg-linear-to-b from-[#F8FAFC] to-green" id="team">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                        Our Team
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our team of experts is dedicated to helping you achieve your language learning goals with personalized support and guidance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Left Teachers List */}
                    <div className="lg:col-span-3 space-y-3">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                onClick={() => {
                                    setSelectedTeam(team)
                                    setIsPlaying(false)
                                    setShowPause(false)
                                    videoRef.current?.pause()
                                    videoRef.current!.muted = true
                                }}
                                className={`p-4 rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-300
                                ${
                                    selectedTeam.id === team.id
                                        ? `${team.accentColor} text-white shadow-lg scale-[1.02]`
                                        : "bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-xl hover:bg-white/60"
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={team.image}
                                        alt={team.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{team.name.split(" ")[0]}</p>
                                    <p className="text-xs opacity-70">{team.specialty}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video */}
                    <div className="lg:col-span-4 flex justify-center">
                        <div className="relative w-full max-w-xs">
                            <div
                                className="bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                                rounded-3xl overflow-hidden aspect-9/13 relative"
                                onMouseEnter={() => isPlaying && setShowPause(true)}
                                onMouseLeave={() => setShowPause(false)}
                            >
                                <video
                                    ref={videoRef}
                                    src={selectedTeam.video}
                                    className="w-full h-full object-cover"
                                    muted={!isPlaying}
                                    playsInline
                                />

                                {!isPlaying && (
                                    <button
                                        onClick={() => {
                                            videoRef.current?.play()
                                            setIsPlaying(true)
                                        }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </button>
                                )}

                                {isPlaying && showPause && (
                                    <button
                                        onClick={() => {
                                            videoRef.current?.pause()
                                            setIsPlaying(false)
                                            setShowPause(false)
                                        }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <rect x="6" y="5" width="4" height="14"></rect>
                                                <rect x="14" y="5" width="4" height="14"></rect>
                                            </svg>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right info */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                {selectedTeam.name}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {selectedTeam.about}
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="
                                p-6 rounded-2xl text-center
                                bg-white/20 dark:bg-white/10 backdrop-blur-xl
                                border border-white/40 dark:border-white/10
                                shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                            ">
                                <div className="flex items-center justify-center mb-2">
                                    <div className={`w-3 h-3 rounded-full ${selectedTeam.accentColor}`}></div>
                                </div>
                                <p className="text-3xl font-bold text-foreground">{selectedTeam.experience}</p>
                                <p className="text-sm text-muted-foreground mt-1">years of experience</p>
                            </div>

                            <div className="
                                p-6 rounded-2xl text-center
                                bg-white/20 dark:bg-white/10 backdrop-blur-xl
                                border border-white/40 dark:border-white/10
                                shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                            ">
                                <div className="flex items-center justify-center mb-2">
                                    <div className="w-3 h-3 rounded-full bg-ring"></div>
                                </div>
                                <p className="text-3xl font-bold text-foreground">{selectedTeam.success}</p>
                                <p className="text-sm text-muted-foreground mt-1">{selectedTeam.achievements}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
