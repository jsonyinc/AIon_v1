"use client"

import { useEffect, useState } from "react"
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
// import { motion, useScroll, useTransform } from "framer-motion"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // --- 해시 스크롤 로직 (딜레이 적용) ---
    const attemptScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1);
        // console.log(`[Home Page Effect] Attempting to scroll to element with ID: #${elementId}`); // 디버깅 필요시 주석 해제
        const element = document.getElementById(elementId);
        if (element) {
          // console.log(`[Home Page Effect] Element #${elementId} found. Scrolling...`, element); // 디버깅 필요시 주석 해제
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // console.warn(`[Home Page Effect] Element with ID #${elementId} not found in the DOM yet.`); // 디버깅 필요시 주석 해제
        }
      }
    };

    // 컴포넌트가 마운트된 후, 그리고 자식 컴포넌트들이 렌더링될 시간을 주기 위해
    // 약간의 지연 후 스크롤을 시도합니다.
    // 100ms는 일반적인 시작점이며, 필요에 따라 조정할 수 있습니다.
    const timerId = setTimeout(attemptScrollToHash, 100);

    // 컴포넌트 언마운트 시 타이머를 정리합니다.
    return () => {
      clearTimeout(timerId);
    };
    // --- 해시 스크롤 로직 끝 ---

  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

  if (!mounted) {
    // 이 부분은 서버 사이드 렌더링과 클라이언트 사이드 렌더링 간의 불일치를 피하기 위한
    // 일반적인 패턴입니다. 해시 스크롤 로직은 useEffect 내에 있으므로,
    // mounted 상태가 true가 된 이후 (즉, 클라이언트에서 마운트된 후) 실행됩니다.
    return null
  }
  
  return (
    <div className="relative overflow-hidden">
      {/* 배경 패턴 */}
      {/* <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5 pointer-events-none z-0" /> */}
      {/* 헤더 */}
      <Header />
      {/* 헤더 높이만큼 여백 추가 */}
      <div className="pt-24"></div> {/* 헤더의 실제 높이에 맞게 조정 필요 */}
      <HeroSection />
      <ProblemSection /> {/* 예: <section id="problem">...</section> */}
      <SolutionSection /> {/* 예: <section id="solution">...</section> */}
      <VisionSection />
      <BenefitSection /> {/* 예: <section id="benefit">...</section> */}
      <CaseStudySection />
      <AboutSection /> {/* 예: <section id="about">...</section> */}
      <ContactSection /> {/* 이 컴포넌트 내부에 <section id="contact">...</section> 구조가 있어야 합니다. */}
      <Footer />
    </div>
  )
}