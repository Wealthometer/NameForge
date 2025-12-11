"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Loader2, Check } from "lucide-react"

export default function EmailCaptureSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      setIsSuccess(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.")
      console.error("[v0] Subscription error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit()
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 spotlight-radial opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6">
            <Mail className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Want Even More Creative Names?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Get 20+ extra name ideas delivered straight to your inbox
          </p>

          <div className="max-w-xl mx-auto">
            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/50 flex items-center justify-center gap-3">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-lg text-foreground font-medium">Successfully subscribed! Check your inbox.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-14 text-lg"
                  />
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 h-14 px-8 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Get Ideas"
                    )}
                  </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {!error && <p className="text-sm text-muted-foreground mt-4">No spam, ever. Unsubscribe anytime.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
