"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Brain,
  Award,
  MessageSquare,
  UserCheck,
  GraduationCap,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
    role: "student" | "teacher" | "mentor" | "admin"
    onNavigate?: () => void
}

export function Sidebar({ role, onNavigate }: SidebarProps) {
    const pathname = usePathname()

    const navItems = {
        student: [
        { href: "/student", label: "Home", icon: BookOpen },
        { href: "/student/vocabulary", label: "My Vocabulary", icon: Brain },
        { href: "/student/lessons", label: "Lessons", icon: GraduationCap },
        { href: "/student/reading-exams", label: "Reading Exams", icon: Zap },
        { href: "/student/achievements", label: "Achievements", icon: Award },
        { href: "/student/profile", label: "Profile", icon: UserCheck },
        ],
        teacher: [
        { href: "/teacher", label: "Overview", icon: BarChart3 },
        { href: "/teacher/courses", label: "Courses", icon: BookOpen },
        { href: "/teacher/lessons", label: "Lessons", icon: GraduationCap },
        { href: "/teacher/tasks", label: "Tasks", icon: Zap },
        { href: "/teacher/students", label: "Students", icon: Users },
        ],
        mentor: [
        { href: "/mentor", label: "Dashboard", icon: BarChart3 },
        { href: "/mentor/students", label: "Students", icon: Users },
        { href: "/mentor/feedback", label: "Feedback", icon: MessageSquare },
        { href: "/mentor/alerts", label: "Alerts", icon: UserCheck },
        ],
        admin: [
        { href: "/admin", label: "Analytics", icon: BarChart3 },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/content", label: "Content", icon: BookOpen },
        { href: "/admin/reports", label: "Reports", icon: Zap },
        { href: "/admin/settings", label: "Settings", icon: Settings },
        ],
    }

    const items = navItems[role]

    return (
        <div className="w-64 bg-sidebar border-r border-sidebar-border neu-soft flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                W
            </div>
            <div>
                <h1 className="font-bold text-lg">WALLE</h1>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
            </div>
            </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2">
            {items.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => onNavigate?.()}>
                <div
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    pathname === href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                )}
                >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
                </div>
            </Link>
            ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border flex gap-2">
            <button
            className="w-full flex items-center gap-2 px-4 py-3 text-sm rounded-lg hover:bg-sidebar-accent/10 transition-colors"
            onClick={() => onNavigate?.()}
            >
            <LogOut className="w-4 h-4" />
            Logout
            </button>
        </div>
        </div>
    )
}
