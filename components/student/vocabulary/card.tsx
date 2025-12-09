"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Lightbulb, Check, X } from "lucide-react"

interface VocabularyCardProps {
    word: string
    definition: string
    example: string
    onMaster?: () => void
}

export default function VocabularyCard({ word, definition, example, onMaster }: VocabularyCardProps) {
    const [answer, setAnswer] = useState("")
    const [showAnswer, setShowAnswer] = useState(false)
    const [showHint, setShowHint] = useState(false)

    const isCorrect = answer.trim().toLowerCase() === word.toLowerCase()

    return (
        <Card className="p-6 bg-linear-to-br from-primary/10 to-accent/10 border-primary/20 shadow-md rounded-2xl space-y-5">
        
        {/* Word Title */}
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{word}</h2>
            <p className="text-sm text-muted-foreground italic">{definition}</p>
        </div>

        {/* Example sentence */}
        <div className="bg-background/70 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-muted-foreground">Complete the sentence:</p>
            <p className="mt-1">"{example.replace(word, "_____")}"</p>
        </div>

        {/* Input field */}
        <Input
            placeholder="Write the word..."
            value={answer}
            onChange={(e) => {
            setAnswer(e.target.value)
            setShowAnswer(false)
            }}
            className="text-center"
        />

        {/* Actions */}
        {!showAnswer ? (
            <div className="flex gap-2">
            <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowHint(!showHint)}
            >
                <Lightbulb className="w-4 h-4 mr-1" />
                {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <Button 
                className="flex-1 bg-primary" 
                disabled={!answer} 
                onClick={() => setShowAnswer(true)}
            >
                Check
            </Button>
            </div>
        ) : (
            <div>
            {/* Answer result box */}
            <div
                className={cn(
                "rounded-lg p-3 text-center font-semibold flex items-center justify-center gap-2 mb-3",
                isCorrect ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
                )}
            >
                {isCorrect ? <Check /> : <X />}
                {isCorrect ? "Correct!" : `Correct answer: ${word}`}
            </div>

            <div className="flex gap-2">
                <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                    setAnswer("")
                    setShowAnswer(false)
                    setShowHint(false)
                }}
                >
                Next
                </Button>
                <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={onMaster}
                >
                <Check className="w-4 h-4 mr-1" /> Master
                </Button>
            </div>
            </div>
        )}

        {/* Hint */}
        {showHint && !showAnswer && (
            <div className="bg-accent/20 text-sm p-2 rounded-md">
            💡 Hint: {definition.split(" ")[0]}...
            </div>
        )}
        </Card>
    )
}
