"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Save } from "lucide-react"

const steps = [
  {
    icon: Sparkles,
    title: "Describe",
    description: "Tell us about your startup, product, or business idea in a few words",
  },
  {
    icon: Zap,
    title: "Generate",
    description: "Our AI instantly creates dozens of catchy, brandable names with taglines",
  },
  {
    icon: Save,
    title: "Save",
    description: "Pick your favorites, check availability, and export your brand kit",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute top-1/2 left-0 w-1/2 h-full spotlight-green opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-xl text-muted-foreground text-pretty">Three simple steps to your perfect brand name</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6">
                  <Icon className="w-8 h-8 text-black" />
                </div>

                <div className="relative mb-4">
                  <span className="absolute -top-8 -right-4 text-6xl font-bold text-primary/10">{index + 1}</span>
                  <h3 className="text-2xl font-bold text-foreground relative z-10">{step.title}</h3>
                </div>

                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
