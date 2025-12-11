"use client"

import { Card } from "@/components/ui/card"
import { Rocket, Users, ShoppingBag, Smartphone } from "lucide-react"

const useCases = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Launch your tech startup with a memorable name that investors will love",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Users,
    title: "Creators",
    description: "Build your personal brand with a name that stands out in the crowd",
    gradient: "from-secondary to-primary",
  },
  {
    icon: ShoppingBag,
    title: "eCommerce",
    description: "Create a catchy store name that customers will remember and trust",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Name your app with a brandable identity that ranks well in app stores",
    gradient: "from-secondary to-primary",
  },
]

export default function UseCaseCardsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full spotlight-teal opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Perfect For Every Industry</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Trusted by entrepreneurs, creators, and businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-black" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground text-pretty">{useCase.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
