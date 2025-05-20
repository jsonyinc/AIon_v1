"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react"; // Assuming mounted state is needed in HeroSection
import Link from "next/link"

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const [mounted, setMounted] = useState(false); // Assuming mounted state is needed in HeroSection

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="hero" className="relative z-10 bg-gradient-to-br from-white to-gray-50 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-normal">
            AI 비즈니스 혁명, <span className="text-green-500">RomiⒻ</span>: <br />
            <span className="">'Agent Boss'가 지휘하는 '인간과 AI의 협업'</span> <br />
            <span className="">비즈니스 혁신의 미래를 열다</span>
          </h1>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            인간과 AI agent의 완벽한 시너지, <span className="text-green-500 font-bold">'인간-AI 업무 오케스트레이션'</span>
            시스템이 AI 혁신의 막연함을 걷어내고, 투자자와 기업의 실질적 성장을 견인합니다.
          </p>
          <div className="bg-orange-100/70 p-4 rounded-lg text-base text-orange-800 mb-8 max-w-3xl mx-auto">
            <span className="text-green-500 font-bold">RomiⒻ</span><span className="text-green-500">(Romi 팩토리)</span>
            는 단순한 AI 솔루션 그 이상, 인간과 AI가 자연스럽게 공존하는 프론티어 기업의 가능성에 비전을 제시해 줍니다.{" "}  
            <span className="text-green-500 font-bold">RomiⒻ</span>의 선구적인 'Agent Boss' 모델은 AI 협업자를 지능적으로 관리하여
            팀의 역량을 극대화하고, <span className="text-green-500 font-bold">비즈니스 전략부터 MVP, PoC, Core AI Model 개발의 전 과정</span>
            에 걸쳐 획기적인 성과를 제공합니다.
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 font-bold">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6">
              <Link href="#contact" className="flex items-center">
                <span>RomiⒻ 솔루션, 지금 바로 경험하세요!</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-300 text-gray-700 rounded-full px-8 py-6">
              <Link href="/insights/global-ai-trends-report">
                <span>'글로벌 AI 트렌드 리포트' 보기</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A2540" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00C49A" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)" />
                <g fill="white" opacity="0.2">
                  <circle cx="400" cy="450" r="150" />
                  <circle cx="800" cy="350" r="200" />
                  <circle cx="1200" cy="450" r="150" />
                </g>
                <g fill="none" stroke="white" strokeWidth="2" opacity="0.5">
                  <path d="M400,450 L800,350 L1200,450" />
                  <path d="M400,450 C500,300 700,300 800,350 C900,400 1100,400 1200,450" />
                </g>
                <g fill="white" opacity="0.8">
                  <circle cx="400" cy="450" r="10" />
                  <circle cx="800" cy="350" r="15" />
                  <circle cx="1200" cy="450" r="10" />
                </g>
                <text x="800" y="520" fontSize="40" fill="white" textAnchor="middle">Agent Boss</text>
                <text x="400" y="400" fontSize="25" fill="white" textAnchor="middle">AI Agent 1</text>
                <text x="1200" y="400" fontSize="25" fill="white" textAnchor="middle">AI Agent 2</text>
                <text x="600" y="300" fontSize="25" fill="white" textAnchor="middle">Human</text>
                <text x="1000" y="300" fontSize="25" fill="white" textAnchor="middle">Human</text>
              </svg>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -right-4 -top-4 bg-white rounded-full px-4 py-2 shadow-lg border border-secondary/20 hidden md:flex items-center gap-2">
            <span className="text-green-600 font-bold text-sm">RomiⒻ</span>
            <span className="text-xs !text-primary/60">미래 혁신 솔루션</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
