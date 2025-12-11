"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out NameForge",
    features: [
      "10 name generations per day",
      "Basic tagline suggestions",
      "Domain availability check",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious entrepreneurs",
    features: [
      "Unlimited name generations",
      "Advanced AI taglines",
      "Domain & social checks",
      "Logo generation",
      "Priority support",
      "Export to PDF",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For agencies and teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Brand guidelines generator",
      "API access",
      "Dedicated account manager",
      "Custom AI training",
    ],
  },
]

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName)
    // In production, this would redirect to a payment page or open a checkout modal
    alert(`You selected the ${planName} plan! This would redirect to checkout in production.`)

    // Reset after 2 seconds
    setTimeout(() => setSelectedPlan(null), 2000)
  }

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full spotlight-radial opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground text-pretty">Choose the perfect plan for your naming needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up relative ${
                tier.popular ? "border-primary shadow-lg shadow-primary/20 scale-105" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(tier.name)}
                disabled={selectedPlan === tier.name}
                className={`w-full ${
                  tier.popular
                    ? "bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/50"
                    : "bg-card border border-border text-foreground hover:bg-primary/10 hover:border-primary"
                } transition-all duration-300 disabled:opacity-50`}
              >
                {selectedPlan === tier.name ? "Selected!" : "Subscribe Now"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
