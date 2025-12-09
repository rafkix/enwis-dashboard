"use client"

import { Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface Criteria {
  score: string
  comment: string
}

interface FeedbackData {
  bandScore: string
  criteria: {
    taskAchievement: Criteria
    coherence: Criteria
    lexical: Criteria
    grammar: Criteria
  }
  strengths: string[]
  improvements: string[]
  summary: string
}

interface FeedbackPanelProps {
  isLoading: boolean
  feedback: FeedbackData | null
  error: string | null
  onClose: () => void
}

export default function FeedbackPanel({ isLoading, feedback, error, onClose }: FeedbackPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-600 font-medium">Analyzing your essay...</p>
        <p className="text-xs text-gray-500 mt-2">This may take a few moments</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6">
        <XCircle className="w-8 h-8 text-red-600 mb-3" />
        <p className="text-gray-900 font-medium">Analysis Failed</p>
        <p className="text-xs text-gray-600 mt-2">{error}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
          Close
        </button>
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6">
        <AlertCircle className="w-8 h-8 text-gray-400 mb-3" />
        <p className="text-gray-600 font-medium">No feedback yet</p>
        <p className="text-xs text-gray-500 mt-2">Submit your essay for AI analysis</p>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return "text-green-600"
    if (score >= 6.5) return "text-blue-600"
    if (score >= 5.0) return "text-yellow-600"
    return "text-red-600"
  }

  const bandScoreNum = Number.parseFloat(feedback.bandScore)

  return (
    <div className="flex-1 overflow-y-auto bg-white p-6 space-y-6">
      {/* Overall Band Score */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <p className="text-sm text-blue-700 font-medium mb-2">Overall Band Score</p>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${getScoreColor(bandScoreNum)}`}>{feedback.bandScore}</span>
          <span className="text-gray-600">/9.0</span>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">IELTS Criteria</h3>
        <div className="grid gap-3">
          {Object.entries(feedback.criteria).map(([key, criterion]) => {
            const score = Number.parseFloat(criterion.score)
            const labels: Record<string, string> = {
              taskAchievement: "Task Achievement",
              coherence: "Coherence & Cohesion",
              lexical: "Lexical Resource",
              grammar: "Grammar & Accuracy",
            }
            return (
              <div key={key} className="bg-gray-50 rounded p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-700">{labels[key as keyof typeof labels]}</p>
                  <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{criterion.score}/9.0</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{criterion.comment}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, i) => (
              <li key={i} className="text-xs text-gray-700 leading-relaxed pl-6 relative">
                <span className="absolute left-0 text-green-600">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {feedback.improvements.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {feedback.improvements.map((improvement, i) => (
              <li key={i} className="text-xs text-gray-700 leading-relaxed pl-6 relative">
                <span className="absolute left-0 text-amber-600">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div className="bg-blue-50 rounded p-4 border border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-2">Summary</p>
        <p className="text-xs text-blue-800 leading-relaxed">{feedback.summary}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
      >
        Close Feedback
      </button>
    </div>
  )
}
