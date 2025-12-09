"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

const BrainIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

const BookIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

interface MobileTabContentProps {
  activeTab: string
  onTabChange: (tab: string) => void
  showAddWord: boolean
  onCloseAddWord: () => void
  showCreateLesson: boolean
  onCloseCreateLesson: () => void
}

export function MobileTabContent({
  activeTab,
  onTabChange,
  showAddWord,
  onCloseAddWord,
  showCreateLesson,
  onCloseCreateLesson,
}: MobileTabContentProps) {
  // Vocabulary state
  const [words, setWords] = useState([
    { id: 1, word: "Serendipity", definition: "Finding something good without looking for it", mastered: false },
    { id: 2, word: "Ephemeral", definition: "Lasting for a very short time", mastered: false },
    { id: 3, word: "Eloquent", definition: "Fluent or persuasive in speaking or writing", mastered: true },
  ])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)

  // Lesson state
  const [lessons, setLessons] = useState([
    { id: 1, title: "Business English Basics", progress: 75, lessons: 12, completed: 9 },
    { id: 2, title: "Advanced Grammar", progress: 40, lessons: 20, completed: 8 },
    { id: 3, title: "Everyday Conversations", progress: 100, lessons: 15, completed: 15 },
  ])

  // Form states
  const [newWord, setNewWord] = useState({ word: "", definition: "", example: "" })
  const [newLesson, setNewLesson] = useState({ title: "", description: "", duration: "" })

  // Add Word handlers
  const handleAddWord = () => {
    console.log("[v0] Adding new word:", newWord)
    if (newWord.word && newWord.definition) {
      setWords([
        ...words,
        { id: words.length + 1, word: newWord.word, definition: newWord.definition, mastered: false },
      ])
      setNewWord({ word: "", definition: "", example: "" })
      onCloseAddWord()
    }
  }

  // Create Lesson handlers
  const handleCreateLesson = () => {
    console.log("[v0] Creating new lesson:", newLesson)
    if (newLesson.title && newLesson.description) {
      setLessons([
        ...lessons,
        { id: lessons.length + 1, title: newLesson.title, progress: 0, lessons: 0, completed: 0 },
      ])
      setNewLesson({ title: "", description: "", duration: "" })
      onCloseCreateLesson()
    }
  }

  // Vocabulary interactions
  const handleCheckAnswer = () => {
    console.log("[v0] Checking answer:", userAnswer)
    setShowAnswer(true)
  }

  const handleNextWord = () => {
    console.log("[v0] Moving to next word")
    setShowAnswer(false)
    setUserAnswer("")
    setShowHint(false)
    setCurrentWordIndex((prev) => (prev + 1) % words.length)
  }

  const handleMasterWord = () => {
    console.log("[v0] Mastering word:", words[currentWordIndex].word)
    const updatedWords = [...words]
    updatedWords[currentWordIndex].mastered = true
    setWords(updatedWords)
    handleNextWord()
  }

  const currentWord = words[currentWordIndex]

  return (
    <>
      {/* Home Tab */}
      {activeTab === "home" && (
        <div className="space-y-4">
          {/* User Profile Card */}
          <Card className="p-4 bg-card border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-2xl">👤</div>
              <div className="flex-1">
                <h2 className="font-bold text-lg">John Student</h2>
                <p className="text-sm text-muted-foreground">Level 12 • 2,450 XP</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-sidebar/50 rounded-lg p-2">
                <p className="text-2xl font-bold text-primary">156</p>
                <p className="text-xs text-muted-foreground">Words</p>
              </div>
              <div className="bg-sidebar/50 rounded-lg p-2">
                <p className="text-2xl font-bold text-primary">23</p>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
              <div className="bg-sidebar/50 rounded-lg p-2">
                <p className="text-2xl font-bold text-primary">89%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-20 flex-col gap-1 bg-card hover:bg-accent"
              onClick={() => {
                console.log("[v0] Navigate to vocabulary")
                onTabChange("vocabulary")
              }}
            >
              <BrainIcon />
              <span className="text-xs">Practice Words</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-1 bg-card hover:bg-accent"
              onClick={() => {
                console.log("[v0] Navigate to lessons")
                onTabChange("lessons")
              }}
            >
              <BookIcon />
              <span className="text-xs">Start Lesson</span>
            </Button>
          </div>

          {/* AI Tools */}
          <Card className="p-4 bg-card border-sidebar-border">
            <h3 className="font-semibold mb-3 text-sm">AI Learning Tools</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-sidebar/30 hover:bg-accent"
                onClick={() => console.log("[v0] Chat with AI clicked")}
              >
                <LightbulbIcon />
                Chat with AI Tutor
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-sidebar/30 hover:bg-accent"
                onClick={() => console.log("[v0] Grammar check clicked")}
              >
                <LightbulbIcon />
                Grammar Checker
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Vocabulary Tab */}
      {activeTab === "vocabulary" && (
        <div className="space-y-4">
          {/* Vocabulary Stats */}
          <Card className="p-4 bg-card border-sidebar-border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm">Today's Progress</h3>
              <span className="text-sm text-primary font-bold">
                {words.filter((w) => w.mastered).length}/{words.length} Mastered
              </span>
            </div>
            <div className="w-full bg-sidebar rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(words.filter((w) => w.mastered).length / words.length) * 100}%` }}
              />
            </div>
          </Card>

          {/* Interactive Flashcard */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                Word {currentWordIndex + 1} of {words.length}
              </div>
              <h2 className="text-3xl font-bold text-foreground">{currentWord.word}</h2>
              <p className="text-sm text-muted-foreground italic">{currentWord.definition}</p>

              {/* Fill in the blank challenge */}
              <div className="bg-background/80 rounded-lg p-4 space-y-3">
                <p className="text-sm">Fill in the blank:</p>
                <p className="text-base">
                  "The beauty of the sunset was truly _____, lasting only a few precious moments."
                </p>
                <Input
                  placeholder="Type the word..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-center"
                  disabled={showAnswer}
                />

                {!showAnswer && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        console.log("[v0] Show hint clicked")
                        setShowHint(!showHint)
                      }}
                    >
                      {showHint ? "Hide" : "Show"} Hint
                    </Button>
                    <Button className="flex-1 bg-primary" size="sm" onClick={handleCheckAnswer} disabled={!userAnswer}>
                      Check Answer
                    </Button>
                  </div>
                )}

                {showHint && !showAnswer && (
                  <div className="bg-accent/20 rounded-lg p-2 text-sm">💡 Synonym: "Fleeting" or "Transient"</div>
                )}

                {showAnswer && (
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        userAnswer.toLowerCase() === currentWord.word.toLowerCase()
                          ? "bg-green-500/20 text-green-700 dark:text-green-300"
                          : "bg-red-500/20 text-red-700 dark:text-red-300",
                      )}
                    >
                      {userAnswer.toLowerCase() === currentWord.word.toLowerCase() ? (
                        <div className="flex items-center gap-2">
                          <CheckIcon />
                          <span className="font-semibold">Correct!</span>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold mb-1">Not quite!</p>
                          <p className="text-sm">
                            The correct answer is: <strong>{currentWord.word}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={handleNextWord}>
                        Next Word
                      </Button>
                      <Button className="flex-1 bg-primary" onClick={handleMasterWord}>
                        <CheckIcon />
                        Mark Mastered
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Word List */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm px-1">Your Words</h3>
            {words.map((word) => (
              <Card
                key={word.id}
                className={cn("p-3 cursor-pointer hover:bg-accent transition-colors", word.mastered && "opacity-60")}
                onClick={() => {
                  console.log("[v0] Word clicked:", word.word)
                  setCurrentWordIndex(words.findIndex((w) => w.id === word.id))
                  setShowAnswer(false)
                  setUserAnswer("")
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{word.word}</p>
                    <p className="text-xs text-muted-foreground">{word.definition}</p>
                  </div>
                  {word.mastered && (
                    <div className="text-green-500">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <div className="space-y-4">
          <Card className="p-4 bg-card border-sidebar-border">
            <h3 className="font-semibold mb-2">Your Courses</h3>
            <p className="text-sm text-muted-foreground">{lessons.length} active courses</p>
          </Card>

          <div className="space-y-3">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => console.log("[v0] Lesson clicked:", lesson.title)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">{lesson.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lesson.completed}/{lesson.lessons} lessons completed
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("[v0] Start lesson:", lesson.title)
                    }}
                  >
                    <PlayIcon />
                  </Button>
                </div>
                <div className="w-full bg-sidebar rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{lesson.progress}% complete</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-4">
          <Card className="p-4 bg-card border-sidebar-border">
            <h3 className="font-semibold mb-2">Your Achievements</h3>
            <p className="text-sm text-muted-foreground">6 badges unlocked</p>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🏆", title: "First Victory", desc: "Complete first lesson", unlocked: true },
              { icon: "📚", title: "Bookworm", desc: "Read 10 articles", unlocked: true },
              { icon: "🎯", title: "Perfect Score", desc: "Get 100% on quiz", unlocked: true },
              { icon: "🔥", title: "7-Day Streak", desc: "Learn 7 days straight", unlocked: true },
              { icon: "⭐", title: "Rising Star", desc: "Reach level 10", unlocked: true },
              { icon: "💎", title: "Master", desc: "Master 100 words", unlocked: false },
            ].map((achievement, i) => (
              <Card
                key={i}
                className={cn(
                  "p-4 text-center",
                  achievement.unlocked ? "bg-primary/10 border-primary/30" : "opacity-40",
                )}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-semibold text-sm">{achievement.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{achievement.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <Card className="p-4 bg-card border-sidebar-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl">👤</div>
              <div>
                <h2 className="font-bold text-xl">John Student</h2>
                <p className="text-sm text-muted-foreground">john.student@email.com</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total XP</span>
                <span className="font-semibold">2,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-sidebar-border">
            <h3 className="font-semibold mb-3">Learning Statistics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Words Mastered</span>
                  <span className="font-semibold">156/200</span>
                </div>
                <div className="w-full bg-sidebar rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Lessons Completed</span>
                  <span className="font-semibold">23/30</span>
                </div>
                <div className="w-full bg-sidebar rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "77%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Accuracy Rate</span>
                  <span className="font-semibold">89%</span>
                </div>
                <div className="w-full bg-sidebar rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "89%" }} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-sidebar-border">
            <h3 className="font-semibold mb-3">Settings</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => console.log("[v0] Notifications clicked")}
              >
                Notification Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => console.log("[v0] Language clicked")}
              >
                Language Preferences
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 bg-transparent"
                onClick={() => console.log("[v0] Logout clicked")}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Word Modal */}
      {showAddWord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-background rounded-t-3xl w-full max-w-md mx-auto p-6 space-y-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Word</h2>
              <button onClick={onCloseAddWord} className="p-1 hover:bg-accent rounded-full transition-colors">
                <XIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="word" className="text-sm font-medium">
                  Word
                </Label>
                <Input
                  id="word"
                  placeholder="Enter the word"
                  value={newWord.word}
                  onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="definition" className="text-sm font-medium">
                  Definition
                </Label>
                <Textarea
                  id="definition"
                  placeholder="Enter the definition"
                  value={newWord.definition}
                  onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="example" className="text-sm font-medium">
                  Example Sentence (Optional)
                </Label>
                <Textarea
                  id="example"
                  placeholder="Enter an example sentence"
                  value={newWord.example}
                  onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={onCloseAddWord}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddWord}
                  disabled={!newWord.word || !newWord.definition}
                >
                  Add Word
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Lesson Modal */}
      {showCreateLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-background rounded-t-3xl w-full max-w-md mx-auto p-6 space-y-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Lesson</h2>
              <button onClick={onCloseCreateLesson} className="p-1 hover:bg-accent rounded-full transition-colors">
                <XIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Lesson Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter lesson title"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this lesson covers"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="duration" className="text-sm font-medium">
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={onCloseCreateLesson}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleCreateLesson}
                  disabled={!newLesson.title || !newLesson.description}
                >
                  Create Lesson
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
