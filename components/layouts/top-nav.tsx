"use client"

import {
    Bell,
    Search,
    User,
    Settings,
    UserCircle,
    LogOut,
} from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { API_STATIC_URL } from "@/lib/api/config"
import { useUserStore } from "@/lib/store/useUserStore"
import { useState, useRef, useEffect } from "react"

interface TopNavProps {
    role: "student" | "teacher" | "mentor" | "admin"
}

export function TopNav({ role }: TopNavProps) {
    const user = useUserStore((s) => s.user)
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const roleNames = {
        student: "Student Dashboard",
        teacher: "Teacher Control Center",
        mentor: "Mentor Hub",
        admin: "Admin Control Panel",
    } as const

    return (
        <header
            className={cn(
                "h-16 border-b border-border bg-card",
                "flex items-center justify-between px-4 md:px-6",
                "sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-card/80"
            )}
        >
            <h2 className="text-lg md:text-xl font-semibold">
                {roleNames[role]}
            </h2>

            <div className="flex items-center gap-3 md:gap-4">

                {/* SEARCH */}
                <div className="hidden sm:flex items-center gap-2 bg-input rounded-lg px-3 border border-border/40">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none py-2 text-sm w-40 md:w-52"
                    />
                </div>

                {/* NOTIFICATIONS */}
                <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5" />
                </Button>
                
                {/* AVATAR + DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="
                            w-12 h-12 rounded-full overflow-hidden 
                            border-2 border-[#229ED9]/40 shadow 
                            cursor-pointer
                        "
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {user?.profile_image ? (
                            <img
                                src={`${API_STATIC_URL}/static/avatars/${user.profile_image}`}
                                className="w-full h-full object-cover"
                                alt="Avatar"
                            />
                        ) : (
                            <User className="w-full h-full p-3 text-neutral-400" />
                        )}
                    </div>

                    {/* DROPDOWN MENU */}
                    {open && (
                        <div
                            className="
                                absolute right-0 mt-2 w-56 
                                bg-white dark:bg-neutral-900 
                                border border-neutral-200 dark:border-neutral-700 
                                rounded-xl shadow-xl py-2 z-50
                            "
                        >
                            <div className="px-4 py-2">
                                <p className="font-medium">{user?.full_name}</p>
                                <p className="text-xs text-muted-foreground">@{user?.username}</p>
                            </div>

                            <hr className="my-2 border-neutral-200 dark:border-neutral-700" />

                            <Link
                                href="/student/profile"
                                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <UserCircle className="w-4 h-4" /> Profile
                            </Link>

                            <Link
                                href="/student/settings"
                                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <Settings className="w-4 h-4" /> Settings
                            </Link>

                            <hr className="my-2 border-neutral-200 dark:border-neutral-700" />

                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}
