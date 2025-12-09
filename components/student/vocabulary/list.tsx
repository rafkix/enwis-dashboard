"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface VocabularyItem {
  word: string
  definition: string
  learned?: boolean
  difficulty?: "easy" | "medium" | "hard"
}

interface VocabularyListProps {
  items: VocabularyItem[]
}

export default function VocabularyList({ items }: VocabularyListProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all")

  const filtered = items.filter((i) => {
    const matchSearch =
      i.word.toLowerCase().includes(search.toLowerCase()) ||
      i.definition.toLowerCase().includes(search.toLowerCase())

    const matchFilter = filter === "all" ? true : i.difficulty === filter

    return matchSearch && matchFilter
  })

  const difficultyColors = {
    easy: "bg-green-500/20 text-green-700",
    medium: "bg-yellow-500/20 text-yellow-700",
    hard: "bg-red-500/20 text-red-700",
  }

  return (
    <div className="space-y-4">

      {/* Search */}
      <Input
        placeholder="Search vocabulary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {["all", "easy", "medium", "hard"].map((f) => (
          <Badge
            key={f}
            className={`cursor-pointer capitalize ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary"
            }`}
            onClick={() => setFilter(f as any)}
          >
            {f}
          </Badge>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              key={item.word}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="p-4 rounded-xl shadow bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="space-y-2">

                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{item.word}</h3>

                    {item.difficulty && (
                      <Badge className={difficultyColors[item.difficulty]}>
                        {item.difficulty}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.definition}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          No vocabulary found.
        </p>
      )}
    </div>
  )
}
