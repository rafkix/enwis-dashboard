"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"

interface QuestionUploadProps {
  taskType: "task1" | "task2"
  onUpload: (question: string, imageUrl?: string) => void
  onClose: () => void
}

export default function QuestionUpload({ taskType, onUpload, onClose }: QuestionUploadProps) {
  const [question, setQuestion] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setImageUrl(base64)
      setError("")
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (taskType === "task1") {
      if (!imageUrl) {
        setError("Please upload an image for Task 1")
        return
      }
      if (!question.trim()) {
        setError("Please enter the question/instruction text")
        return
      }
      onUpload(question, imageUrl)
    } else {
      const trimmed = question.trim()
      if (!trimmed) {
        setError("Please enter or paste a question")
        return
      }
      onUpload(trimmed)
    }
    setQuestion("")
    setImageUrl(null)
    setError("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Upload {taskType === "task1" ? "Task 1" : "Task 2"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {taskType === "task1" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Step 1: Upload Chart/Diagram Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <div className="inline-block p-3 bg-gray-100 rounded-lg mb-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Click to upload image or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded border border-gray-300"
                    />
                    <button
                      onClick={() => setImageUrl(null)}
                      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove image
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step 2: Enter Question/Instruction Text
                </label>
                <textarea
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value)
                    setError("")
                  }}
                  placeholder="Describe the diagram, chart, or task instructions..."
                  className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={5}
                />
              </div>
            </>
          )}

          {taskType === "task2" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter Question Text</label>
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value)
                  setError("")
                }}
                placeholder="Paste your writing question here..."
                className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={8}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
