"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Play } from "lucide-react"

export function ContinueLearning() {
    const courses = [
        { name: "Business English", lesson: "Negotiation Tactics", progress: 65 },
        { name: "IELTS Preparation", lesson: "Academic Writing", progress: 45 },
        { name: "Conversational English", lesson: "Small Talk", progress: 80 },
    ]

    return (
        <Card className="glass border-white/30 dark:border-white/10">
        <CardHeader>
            <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            <CardTitle>Continue Learning</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {courses.map((course, idx) => (
            <div
                key={idx}
                className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 hover:border-primary/30 transition-colors"
            >
                <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="font-semibold">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.lesson}</p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Play className="w-4 h-4" />
                </Button>
                </div>
                <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-linear-to-r from-secondary to-primary"
                    style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                </div>
            </div>
            ))}
        </CardContent>
        </Card>
    )
}
