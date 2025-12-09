"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressChart } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Check, RotateCcw, Brain, ArrowRight } from "lucide-react"

interface ImprovedWord {
  word: string
  definition: string
  example: string
  synonyms?: string[]
  antonyms?: string[]
  difficulty?: "easy" | "medium" | "hard"
}

interface ImprovedVocabularyProps {
  items: ImprovedWord[]
  onFinish?: () => void
}

export default function ImprovedVocabulary({ items, onFinish }: ImprovedVocabularyProps) {
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [mode, setMode] = useState<"front" | "back">("front")

  const current = items[index]
  const progress = ((index) / items.length) * 100

  const next = () => {
    setMode("front")
    setShowBack(false)
    if (index + 1 < items.length) {
      setIndex(index + 1)
    } else {
      onFinish?.()
    }
  }

  const difficultyColor =
    current.difficulty === "easy"
      ? "bg-green-500/20 text-green-700"
      : current.difficulty === "medium"
      ? "bg-yellow-500/20 text-yellow-700"
      : "bg-red-500/20 text-red-700"

  return (
    <div className="space-y-4">
      <ProgressChart />

      <AnimatePresence mode="wait">
        <motion.div
          key={index + mode}
          initial={{ opacity: 0, y: 10, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -10, rotateX: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 rounded-2xl shadow-lg bg-linear-to-br from-primary/5 to-accent/10">
            <div className="space-y-5">

              {/* Difficulty badge */}
              <Badge className={difficultyColor + " w-fit capitalize"}>
                {current.difficulty || "medium"}
              </Badge>

              {mode === "front" ? (
                <>
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">{current.word}</h2>
                    <p className="text-muted-foreground">{current.definition}</p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setMode("back")}
                  >
                    <Brain className="w-4 h-4 mr-2" /> Show Details
                  </Button>
                </>
              ) : (
                <>
                  {/* Example */}
                  <div className="bg-background/70 p-3 rounded-xl shadow-sm text-sm">
                    <p className="text-muted-foreground">Example:</p>
                    <p>"{current.example}"</p>
                  </div>

                  {/* Synonyms */}
                  {current.synonyms && current.synonyms.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Synonyms:</p>
                      <div className="flex gap-2 flex-wrap">
                        {current.synonyms.map((s) => (
                          <Badge key={s} variant="outline">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Antonyms */}
                  {current.antonyms && current.antonyms.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Antonyms:</p>
                      <div className="flex gap-2 flex-wrap">
                        {current.antonyms.map((a) => (
                          <Badge key={a} variant="secondary">{a}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setMode("front")}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" /> Back
                    </Button>

                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={next}
                    >
                      <ArrowRight className="w-4 h-4 mr-1" /> Next
                    </Button>
                  </div>
                </>
              )}

            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
