import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

interface Props {
    lesson: {
        id: number
        title: string
        description?: string
    }
}

export function LessonCard({ lesson }: Props) {
    return (
        <Card className="hover:shadow transition">
        <CardContent className="p-5 space-y-2">

            <div className="flex items-center gap-2">
            <PlayCircle className="text-emerald-600" />
            <h3 className="font-semibold">{lesson.title}</h3>
            </div>

            {lesson.description && (
            <p className="text-sm text-muted-foreground">
                {lesson.description}
            </p>
            )}

            <Button variant="outline" disabled className="mt-2">
            Start lesson (soon)
            </Button>
        </CardContent>
        </Card>
    )
}
