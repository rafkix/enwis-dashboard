"use client"

import type React from "react"
import { useState } from "react"
import { Home, Brain, BookOpen, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileAppLayoutProps {
    children: React.ReactNode
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
    const [activeTab, setActiveTab] = useState("home")

    const tabs = [
        { id: "home", label: "Home", icon: Home },
        { id: "vocabulary", label: "Words", icon: Brain },
        { id: "lessons", label: "Lessons", icon: BookOpen },
        { id: "achievements", label: "Awards", icon: Trophy },
        { id: "profile", label: "Profile", icon: User },
    ]

    return (
        <div className="flex flex-col h-screen bg-background max-w-md mx-auto relative">
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 pt-4 px-4 safe-area-inset-bottom safe-area-inset-top">
            {children}
        </main>

        {/* Bottom Tab Navigation - Telegram Style */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-sidebar border-t border-sidebar-border flex justify-around safe-area-inset-bottom z-50">
            {tabs.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                "flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-200 relative",
                activeTab === id ? "text-primary" : "text-sidebar-foreground hover:text-sidebar-foreground/80",
                )}
            >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
                {activeTab === id && <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-b-full" />}
            </button>
            ))}
        </nav>
        </div>
    )
}
