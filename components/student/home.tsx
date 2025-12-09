"use client"

import { useEffect, useState } from "react"
import { getAllCoursesAPI } from "@/lib/api/courses"
import { useUserStore } from "@/lib/store/useUserStore"
import { Loader2 } from "lucide-react"
import { CourseCard } from "../ui/course-card"

interface Course {
    id: number
    title: string
    description?: string
    image?: string
}

export function StudentHome() {
    const { user, fetchUser } = useUserStore()
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
        try {
            await fetchUser()

            const res = await getAllCoursesAPI()
            setCourses(res.data)
        } catch (e) {
            console.error("StudentHome load error:", e)
        } finally {
            setLoading(false)
        }
        }

        init()
    }, [fetchUser])

    if (loading) {
        return (
        <div className="flex justify-center items-center h-80">
            <Loader2 className="animate-spin" />
        </div>
        )
    }

    return (
        <div className="space-y-8">

        {/* Greeting */}
        <div>
            <h1 className="text-2xl font-bold">
            Welcome back{user?.full_name ? `, ${user.full_name}` : ""} 👋
            </h1>
            <p className="text-muted-foreground">
            Continue your learning journey
            </p>
        </div>

        {/* Courses */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

            {courses.length === 0 ? (
            <p className="text-muted-foreground">
                No courses available yet.
            </p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
                ))}
            </div>
            )}
        </div>
        </div>
    )
}
