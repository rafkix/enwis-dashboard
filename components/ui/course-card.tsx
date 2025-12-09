import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
    course: {
        id: number
        title: string
        description?: string
        image?: string
    }
}

export function CourseCard({ course }: Props) {
    return (
        <Card className="hover:shadow-lg transition">
        <CardContent className="p-5 space-y-3">

            <div className="flex items-center gap-2">
            <BookOpen className="text-emerald-600" />
            <h3 className="font-semibold text-lg">{course.title}</h3>
            </div>

            {course.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
            </p>
            )}

            <Link href={`/student/course/${course.id}`}>
            <Button variant="outline" className="w-full">
                Open course
            </Button>
            </Link>

        </CardContent>
        </Card>
    )
}
