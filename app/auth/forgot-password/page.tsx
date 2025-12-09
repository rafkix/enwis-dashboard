"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Check } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reset request for:", email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-b from-background to-muted/20">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/auth/login" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 smooth-transition">
          <ArrowLeft size={18} />
          <span>Back to login</span>
        </Link>

        {/* Form Card */}
        <div className="glass neumorphic rounded-3xl p-8 border-white/20 space-y-6">
          {!submitted ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
                <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-muted/50 border-white/20 rounded-xl h-11 focus:ring-primary smooth-transition neumorphic"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-xl font-medium smooth-transition neumorphic-hover"
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center neumorphic">
                  <Check size={32} className="text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Didn't receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
