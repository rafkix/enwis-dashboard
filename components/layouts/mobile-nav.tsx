"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BookOpen,
    Brain,
    GraduationCap,
    Zap,
    Award,
    BarChart3,
    Users,
    MessageSquare,
    Settings,
    Home,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
    role: "student" | "teacher" | "mentor" | "admin"
}

export function MobileNav({ role }: MobileNavProps) {
    const pathname = usePathname()

    const navItems = {
        student: [
        { href: "/student", label: "Home", icon: Home },
        { href: "/student/vocabulary", label: "Words", icon: Brain },
        { href: "/student/lessons", label: "Learn", icon: GraduationCap },
        { href: "/student/achievements", label: "Awards", icon: Award },
        { href: "/student/profile", label: "Profile", icon: Settings }
        ],
        teacher: [
        { href: "/teacher", label: "Home", icon: Home },
        { href: "/teacher/courses", label: "Courses", icon: BookOpen },
        { href: "/teacher/students", label: "Class", icon: Users },
        { href: "/teacher/tasks", label: "Tasks", icon: Zap },
        ],
        mentor: [
        { href: "/mentor", label: "Home", icon: Home },
        { href: "/mentor/students", label: "Students", icon: Users },
        { href: "/mentor/feedback", label: "Feedback", icon: MessageSquare },
        { href: "/mentor/alerts", label: "Alerts", icon: Settings },
        ],
        admin: [
        { href: "/admin", label: "Home", icon: Home },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/content", label: "Content", icon: BookOpen },
        { href: "/admin/reports", label: "Reports", icon: BarChart3 },
        ],
    } as const

    const items = navItems[role]

    return (
        <nav
        className="
            md:hidden 
            fixed bottom-0 left-0 right-0 
            bg-sidebar 
            border-t border-sidebar-border 
            flex justify-around 
            z-40
            px-1
        "
        style={{
            paddingBottom: "env(safe-area-inset-bottom)", // iOS telegram support
        }}
        >
        {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href

            return (
            <Link key={href} href={href} className="flex-1">
                <div
                className={cn(
                    "flex flex-col items-center justify-center py-3 gap-1 transition-colors",
                    active
                    ? "text-primary"
                    : "text-sidebar-foreground hover:text-sidebar-foreground/80"
                )}
                >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
                </div>
            </Link>
            )
        })}
        </nav>
    )
}
