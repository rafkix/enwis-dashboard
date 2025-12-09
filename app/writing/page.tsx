"use client"

import { useState, useEffect } from "react"
import { ChevronsLeftRight as ChevronLeftRight, Sparkles } from "lucide-react"
import WritingHeader from "@/components/wrting-exam/writing-header"
import WritingPanel from "@/components/wrting-exam/writing-panel"
import EditorPanel from "@/components/wrting-exam/editor-panel"
import FeedbackPanel from "@/components/wrting-exam/feedback-panel"
import QuestionUpload from "@/components/wrting-exam/question-upload"
const tasks = {
    part1: {
        id: "part1",
        title: "Writing Task 1",
        instruction: "You should spend about 20 minutes on this task. Write at least 150 words.",
        description: "The diagram shows the layout of a university campus with various buildings and facilities.",
        minWords: 150,
        hasImage: true,
    },
    part2: {
        id: "part2",
        title: "Writing Task 2",
        instruction: "You should spend about 40 minutes on this task. Write at least 250 words.",
        description:
        "Some people think that physical exercise should be a required component of every school day. Others disagree with this view.\n\nDiscuss both these views and give your own opinion.",
        minWords: 250,
        hasImage: false,
    },
}

export default function IELTSWritingPage() {
  const [currentPart, setCurrentPart] = useState<"part1" | "part2">("part1")
  const [answers, setAnswers] = useState({ part1: "", part2: "" })
  const [leftWidth, setLeftWidth] = useState(45)
  const [isResizing, setIsResizing] = useState(false)
  const [timer, setTimer] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [customQuestions, setCustomQuestions] = useState<{ part1: string; part2: string }>({
    part1: tasks.part1.description,
    part2: tasks.part2.description,
  })
  const [uploadedImages, setUploadedImages] = useState<{ part1: string | null; part2: string | null }>({
    part1: null,
    part2: null,
  })

  const task = tasks[currentPart]

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const handleMouseDown = () => {
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const container = document.querySelector("[data-container]") as HTMLElement
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      if (newLeftWidth > 30 && newLeftWidth < 70) {
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const handleAnswerChange = (text: string) => {
    setAnswers((prev) => ({ ...prev, [currentPart]: text }))
  }

  const handleSubmitFeedback = async () => {
    const answer = answers[currentPart]
    if (!answer.trim()) {
      setFeedbackError("Please write something before submitting for feedback")
      return
    }

    setIsLoadingFeedback(true)
    setFeedbackError(null)
    setShowFeedback(true)

    try {
      const response = await fetch("/api/analyze-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          essay: answer,
          taskType: currentPart === "part1" ? "Task 1" : "Task 2",
          question: customQuestions[currentPart],
        }),
      })

      if (!response.ok) throw new Error("Failed to get feedback")

      const data = await response.json()
      setFeedback(data)
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoadingFeedback(false)
    }
  }

  const handleUploadQuestion = (question: string, imageUrl?: string) => {
    setCustomQuestions((prev) => ({
      ...prev,
      [currentPart]: question,
    }))
    if (imageUrl) {
      setUploadedImages((prev) => ({
        ...prev,
        [currentPart]: imageUrl,
      }))
    }
    setShowUpload(false)
  }

  const handleUpdateQuestion = (question: string) => {
    setCustomQuestions((prev) => ({
      ...prev,
      [currentPart]: question,
    }))
  }

  const handleUpdateImage = (imageUrl: string) => {
    setUploadedImages((prev) => ({
      ...prev,
      [currentPart]: imageUrl,
    }))
  }

  const wordCount = answers[currentPart].trim().split(/\s+/).filter(Boolean).length
  const meetsMinimum = wordCount >= task.minWords

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <WritingHeader timer={formatTime(timer)} onBack={() => window.history.back()} />

      {/* Task Instructions */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{task.title}</h2>
            <p className="text-xs text-gray-600 mt-1">{task.instruction}</p>
          </div>
        </div>
      </div>

      {/* Split Panel Container */}
      <div className="flex-1 flex overflow-hidden" data-container>
        {/* Left Panel - Question Creation & Preview */}
        <div style={{ width: `${leftWidth}%` }} className="flex flex-col border-r border-gray-200">
          <WritingPanel
            task={{ ...task, description: customQuestions[currentPart] }}
            imageUrl={uploadedImages[currentPart] || undefined}
            onUpdateQuestion={handleUpdateQuestion}
            onUpdateImage={handleUpdateImage}
          />
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="relative w-1 cursor-col-resize select-none hover:bg-blue-400 transition-colors shrink-0 group"
          aria-label="Resize panels"
        >
          <div className="absolute inset-0 w-1 bg-gray-300 group-hover:bg-blue-400 transition-colors"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-400 shadow-md flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-lg transition-all">
            <ChevronLeftRight className="w-3 h-3 text-gray-600" />
          </div>
        </div>

        {/* Right Panel - Editor or Feedback */}
        <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col">
          {showFeedback ? (
            <FeedbackPanel
              isLoading={isLoadingFeedback}
              feedback={feedback}
              error={feedbackError}
              onClose={() => {
                setShowFeedback(false)
                setFeedback(null)
                setFeedbackError(null)
              }}
            />
          ) : (
            <EditorPanel
              answer={answers[currentPart]}
              onAnswerChange={handleAnswerChange}
              wordCount={wordCount}
              minWords={task.minWords}
              meetsMinimum={meetsMinimum}
            />
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentPart("part1")
                setShowFeedback(false)
                setFeedback(null)
              }}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                currentPart === "part1"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              Task 1
            </button>
            <button
              onClick={() => {
                setCurrentPart("part2")
                setShowFeedback(false)
                setFeedback(null)
              }}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                currentPart === "part2"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              Task 2
            </button>
          </div>

          {!showFeedback ? (
            <button
              onClick={handleSubmitFeedback}
              disabled={isLoadingFeedback}
              className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Get AI Feedback
            </button>
          ) : (
            <button
              onClick={() => {
                setShowFeedback(false)
                setFeedback(null)
              }}
              className="px-6 py-2 bg-gray-600 text-white rounded text-sm font-medium hover:bg-gray-700"
            >
              Back to Editor
            </button>
          )}
        </div>
      </div>

      {/* Question Upload Dialog */}
      {showUpload && (
        <QuestionUpload
          taskType={currentPart === "part1" ? "task1" : "task2"}
          onUpload={handleUploadQuestion}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  )
}
