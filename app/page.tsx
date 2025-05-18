"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import HeroSection from '@/components/landing/HeroSection'; 
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import VisionSection from '@/components/landing/VisionSection';
import BenefitSection from "@/components/landing/BenefitSection";
import CaseStudySection from '@/components/landing/CaseStudySection';
import AboutSection from '@/components/landing/AboutSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';


export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      {/* 배경 패턴 */}
      {/* <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5 pointer-events-none z-0" /> */}
      {/* 헤더 */}
      <Header />
      {/* 헤더 높이만큼 여백 추가 */}
      <div className="pt-24"></div>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <VisionSection />
      <BenefitSection />
      <CaseStudySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
