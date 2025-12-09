"use client"

import type React from "react"

import { Upload, X } from "lucide-react"
import { useState } from "react"

interface WritingPanelProps {
  task: {
    id: string
    title: string
    instruction: string
    description: string
    minWords: number
    hasImage: boolean
  }
  imageUrl?: string
  onUpdateQuestion?: (question: string) => void
  onUpdateImage?: (imageUrl: string) => void
}

export default function WritingPanel({ task, imageUrl, onUpdateQuestion, onUpdateImage }: WritingPanelProps) {
  const [questionText, setQuestionText] = useState(task.description)
  const [isEditingImage, setIsEditingImage] = useState(false)

  const handleQuestionChange = (newText: string) => {
    setQuestionText(newText)
    onUpdateQuestion?.(newText)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        onUpdateImage?.(imageUrl)
        setIsEditingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    onUpdateImage?.("")
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-4">
        {/* Task Title and Instruction */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{task.title}</h3>
          <p className="text-xs text-gray-500 mb-4">{task.instruction}</p>
        </div>

        {/* Task 1: Image Upload + Question Text Input */}
        {task.hasImage && (
          <>
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task 1 Image</label>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded p-8 flex items-center justify-center min-h-48">
                {imageUrl ? (
                  <div className="w-full">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Task 1 Diagram"
                      className="w-full h-auto rounded border border-gray-300"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setIsEditingImage(true)}
                        className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 py-2"
                      >
                        <Upload className="w-4 h-4" />
                        Change Image
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        className="flex-1 text-sm text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2 py-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="inline-block p-3 bg-gray-200 rounded-lg mb-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">No image uploaded</p>
                    <label className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Hidden file input for changing image */}
              {isEditingImage && (
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-change-input"
                  autoFocus
                />
              )}
            </div>

            {/* Question Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task 1 Question Text</label>
              <textarea
                value={questionText}
                onChange={(e) => handleQuestionChange(e.target.value)}
                placeholder="Enter task instructions here..."
                className="w-full p-3 border border-gray-300 rounded text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
              />
              <p className="text-xs text-gray-500 mt-1">The text you enter will appear as the question for this task</p>
            </div>
          </>
        )}

        {/* Task 2: Question Text Input Only */}
        {!task.hasImage && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task 2 Essay Question</label>
            <textarea
              value={questionText}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter the full essay question here..."
              className="w-full p-3 border border-gray-300 rounded text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-40"
            />
            <p className="text-xs text-gray-500 mt-1">The text you enter will appear as the question for this task</p>
          </div>
        )}

        {/* Question Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">QUESTION PREVIEW:</p>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{questionText}</p>
        </div>
      </div>
    </div>
  )
}
