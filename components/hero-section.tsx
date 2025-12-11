"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"

const placeholderExamples = [
  "Try: AI Fitness App",
  "Try: Eco-Friendly Fashion Brand",
  "Try: Cloud Storage Platform",
  "Try: Recipe Sharing Community",
]

interface HeroSectionProps {
  onGenerate: (names: Array<{ name: string; tagline: string }>) => void
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
  const [placeholder, setPlaceholder] = useState(placeholderExamples[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholderExamples.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setPlaceholder(placeholderExamples[currentIndex])
  }, [currentIndex])

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please enter a description")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate names")
      }

      const data = await response.json()
      onGenerate(data.names)

      const section = document.getElementById("features")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } catch (err) {
      setError("Failed to generate names. Please try again.")
      console.error("[v0] Generation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleGenerate()
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 spotlight-radial opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Name Your Startup in{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Seconds with AI
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 text-pretty">
            Generate catchy, brandable names + taglines instantly.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
              <Input
                type="text"
                placeholder={placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-14 text-lg"
              />
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 h-14 px-8 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Name"
                )}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Names Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
