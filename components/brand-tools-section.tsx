"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Instagram, Twitter, Palette, Loader2, Check, X } from "lucide-react"

export default function BrandToolsSection() {
  const [domainInput, setDomainInput] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [domainResults, setDomainResults] = useState<{
    domain: boolean | null
    instagram: boolean | null
    twitter: boolean | null
  } | null>(null)

  const checkAvailability = async () => {
    if (!domainInput.trim()) return

    setIsChecking(true)
    setDomainResults(null)

    // Simulate API call - in production, you'd call actual domain/social APIs
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Random availability for demo purposes
    setDomainResults({
      domain: Math.random() > 0.5,
      instagram: Math.random() > 0.5,
      twitter: Math.random() > 0.5,
    })

    setIsChecking(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isChecking) {
      checkAvailability()
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute top-0 right-0 w-1/2 h-full spotlight-teal opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Complete Brand Tools</h2>
          <p className="text-xl text-muted-foreground text-pretty">Everything you need to launch your brand identity</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Domain Availability */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Domain & Social Availability</h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Check domain availability and social media handles across all major platforms instantly
                </p>

                <div className="flex gap-3 mb-4">
                  <Input
                    type="text"
                    placeholder="Enter brand name..."
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isChecking}
                    className="flex-1 bg-background/50 border-border text-foreground"
                  />
                  <Button
                    onClick={checkAvailability}
                    disabled={isChecking || !domainInput.trim()}
                    className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    {isChecking ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check"
                    )}
                  </Button>
                </div>

                {domainResults && (
                  <div className="flex flex-wrap gap-3">
                    <div
                      className={`px-3 py-1 rounded-full border text-sm text-foreground flex items-center gap-2 ${
                        domainResults.domain ? "bg-secondary/20 border-secondary/30" : "bg-red-500/20 border-red-500/30"
                      }`}
                    >
                      {domainResults.domain ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      .com {domainResults.domain ? "Available" : "Taken"}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border text-sm text-foreground flex items-center gap-2 ${
                        domainResults.instagram
                          ? "bg-secondary/20 border-secondary/30"
                          : "bg-red-500/20 border-red-500/30"
                      }`}
                    >
                      <Instagram className="w-4 h-4" />
                      {domainResults.instagram ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      {domainResults.instagram ? "Available" : "Taken"}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border text-sm text-foreground flex items-center gap-2 ${
                        domainResults.twitter
                          ? "bg-secondary/20 border-secondary/30"
                          : "bg-red-500/20 border-red-500/30"
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                      {domainResults.twitter ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      {domainResults.twitter ? "Available" : "Taken"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Logo Generation */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">AI Logo Generator</h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Create professional logos that match your brand name and vision
                </p>
                <Button
                  onClick={() =>
                    alert("Logo generation coming soon! This would integrate with an AI image generation service.")
                  }
                  className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                  Generate Logo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
