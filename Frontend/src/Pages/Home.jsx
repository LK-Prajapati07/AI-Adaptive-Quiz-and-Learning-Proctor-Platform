import { useState } from "react"
import ParticleBackground from "@/components/animations/ParticleBackground"
import FloatingBlobs from "@/components/animations/FloatingBlobs"
import SectionDivider from "@/components/landing/SectionDivider"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import CTASection from "@/components/landing/CTASection"
import FooterSection from "@/components/landing/FooterSection"

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <ParticleBackground />
      <FloatingBlobs />
      <HeroSection />
      <StatsSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <HowItWorksSection activeStep={activeStep} setActiveStep={setActiveStep} />
      <SectionDivider />
      <DashboardPreviewSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <CTASection />
      <FooterSection />
    </div>
  )
}
