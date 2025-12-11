"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Heart, Bookmark, Check } from "lucide-react"

interface GeneratedNamesSectionProps {
  names: Array<{ name: string; tagline: string }>
}

export default function GeneratedNamesSection({ names }: GeneratedNamesSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set())

  const handleCopy = async (name: string, tagline: string, index: number) => {
    const text = `${name}\n${tagline}`
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleLike = (index: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleBookmark = (index: number) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full spotlight-green opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">AI-Generated Names</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Instantly create memorable brand names with perfect taglines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {names.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-pretty">{item.tagline}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(item.name, item.tagline, index)}
                  className="flex-1 border-border hover:border-primary hover:bg-primary/10 text-foreground bg-transparent"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLike(index)}
                  className={`border-border hover:border-primary hover:bg-primary/10 text-foreground bg-transparent ${
                    likedItems.has(index) ? "bg-primary/20 border-primary" : ""
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedItems.has(index) ? "fill-primary" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBookmark(index)}
                  className={`border-border hover:border-primary hover:bg-primary/10 text-foreground bg-transparent ${
                    bookmarkedItems.has(index) ? "bg-primary/20 border-primary" : ""
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(index) ? "fill-primary" : ""}`} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
