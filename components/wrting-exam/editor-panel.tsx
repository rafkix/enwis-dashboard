"use client"

import { FileText } from "lucide-react"

interface EditorPanelProps {
    answer: string
    onAnswerChange: (text: string) => void
    wordCount: number
    minWords: number
    meetsMinimum: boolean
}

export default function EditorPanel({ answer, onAnswerChange, wordCount, minWords, meetsMinimum }: EditorPanelProps) {
    return (
        <div className="flex flex-col h-full p-6">
            <textarea
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Start writing your essay here..."
                spellCheck={false}
                className="flex-1 w-full p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-sm leading-relaxed"
                aria-label="Essay writing area"
            />

        <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
                <FileText className="w-4 h-4 text-gray-600" />
                <span>
                    Words: <span className="font-semibold">{wordCount}</span>
                </span>
            </div>
            <div className={`${meetsMinimum ? "text-green-600" : "text-red-600"}`}>
                {meetsMinimum ? <span>✓ Minimum {minWords} words met</span> : <span>Minimum: {minWords} words</span>}
            </div>
        </div>

        <p className="text-xs text-gray-500 mt-3">Your answer is saved automatically</p>
        </div>
    )
}
