"use client"

import { ArrowLeft, Clock, Download } from "lucide-react"

interface WritingHeaderProps {
  timer: string
  onBack: () => void
}

export default function WritingHeader({ timer, onBack }: WritingHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white shrink-0">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 px-3 py-1 text-white font-bold text-lg">IELTS</div>
              <h1 className="text-lg font-semibold text-gray-900">Practice Writing</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-semibold font-mono">{timer}</span>
            </div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
              aria-label="Save as PDF"
            >
              <Download className="w-4 h-4" />
              Save as PDF
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
