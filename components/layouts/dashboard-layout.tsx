"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { MobileNav } from "./mobile-nav"

interface DashboardLayoutProps {
    children: React.ReactNode
    role: "student" | "teacher" | "mentor" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const closeSidebar = () => setSidebarOpen(false)

    return (
        <div className="flex h-screen bg-background relative">
            
        {/* Only show toggle on desktop */}
        <div className="hidden md:block absolute top-4 left-4 z-50">
            <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
            {sidebarOpen ? "Close" : "Menu"}
            </button>
        </div>

        {/* Sidebar (desktop only) */}
        <div
            className={`
            hidden md:block 
            h-full border-r border-border bg-card 
            w-64
            `}
        >
            <Sidebar role={role} onNavigate={closeSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden w-full pb-16 md:pb-0">
            <TopNav role={role} />

            <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
            </main>

            {/* Mobile bottom nav */}
            <MobileNav role={role} />
        </div>
        </div>
    )
}
