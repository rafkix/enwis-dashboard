"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressChart } from "@/components/ui/progress"
import { Check, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface DailyWord {
    word: string
    definition: string
    example: string
}

interface DailyVocabularyProps {
    words: DailyWord[]
    onComplete?: () => void
}

export default function DailyVocabulary({ words, onComplete }: DailyVocabularyProps) {
    const [index, setIndex] = useState(0)
    const [completed, setCompleted] = useState(false)

    const current = words[index]
    const progress = ((index) / words.length) * 100

    const nextWord = () => {
        if (index + 1 < words.length) {
        setIndex(index + 1)
        } else {
        setCompleted(true)
        onComplete?.()
        }
    }

    return (
        <div className="space-y-4">
        <ProgressChart/>

        {!completed ? (
            <motion.div
            key={current.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            >
            <Card className="p-6 rounded-2xl shadow-md bg-linear-to-br from-primary/5 to-accent/10">
                <div className="space-y-4">

                <div>
                    <h2 className="text-2xl font-bold">{current.word}</h2>
                    <p className="text-muted-foreground text-sm">{current.definition}</p>
                </div>

                <div className="bg-background p-3 rounded-xl text-sm shadow-sm">
                    <p className="text-muted-foreground">Example:</p>
                    <p>"{current.example}"</p>
                </div>

                <Button className="w-full" onClick={nextWord}>
                    <Check className="w-4 h-4 mr-1" /> Mark as learned
                </Button>
                </div>
            </Card>
            </motion.div>
        ) : (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
            >
            <BookOpen className="w-10 h-10 mx-auto text-primary" />

            <h2 className="text-xl font-semibold">All Daily Words Completed!</h2>
            <p className="text-sm text-muted-foreground">
                Great job! You mastered all today’s vocabulary.
            </p>
            </motion.div>
        )}
        </div>
    )
}
