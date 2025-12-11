"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import GeneratedNamesSection from "@/components/generated-names-section"
import BrandToolsSection from "@/components/brand-tools-section"
import PricingSection from "@/components/pricing-section"
import HowItWorksSection from "@/components/how-it-works-section"
import UseCaseCardsSection from "@/components/use-case-cards-section"
import EmailCaptureSection from "@/components/email-capture-section"
import Footer from "@/components/footer"

export default function Page() {
  const [generatedNames, setGeneratedNames] = useState<Array<{ name: string; tagline: string }>>([
    { name: "NexaFlow", tagline: "Flow into the future of productivity" },
    { name: "BrandSpark", tagline: "Ignite your brand identity" },
    { name: "VeloCity", tagline: "Speed meets innovation" },
    { name: "PulseCore", tagline: "At the heart of your business" },
    { name: "ZenithAI", tagline: "Reach new heights with intelligence" },
    { name: "EchoVerse", tagline: "Your voice, amplified" },
  ])

  const handleGenerate = (names: Array<{ name: string; tagline: string }>) => {
    setGeneratedNames(names)
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Header />
      <main>
        <HeroSection onGenerate={handleGenerate} />
        <GeneratedNamesSection names={generatedNames} />
        <BrandToolsSection />
        <PricingSection />
        <HowItWorksSection />
        <UseCaseCardsSection />
        <EmailCaptureSection />
      </main>
      <Footer />
    </div>
  )
}
