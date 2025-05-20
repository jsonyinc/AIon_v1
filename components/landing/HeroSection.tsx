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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative bg-gradient-to-r from-slate-900 to-teal-500 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 bg-green-400/20 text-white text-xs px-3 py-1 rounded-bl-md">
              Romi 미래 혁신 솔루션
            </div>
            <div className="p-8 md:p-12 flex justify-center items-center min-h-[300px]">
              <div className="relative w-full max-w-md">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    {/* Agent Boss 중앙 원 */}
                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white z-20 relative">
                      <div className="text-center">
                        <div className="text-lg font-medium">Agent Boss</div>
                      </div>
                    </div>

                    {/* 연결된 에이전트들 */}
                    <div className="absolute -left-32 top-0 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                      <span>Human</span>
                    </div>
                    <div className="absolute -right-32 top-0 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                      <span>Human</span>
                    </div>
                    <div className="absolute -left-32 bottom-0 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                      <span>AI Agent 1</span>
                    </div>
                    <div className="absolute -right-32 bottom-0 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                      <span>AI Agent 2</span>
                    </div>

                    {/* 연결선 */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                      <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                      <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                      <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                      <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-8 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
            37%
          </div>
        </motion.div>
      </div>
    </section>
  );
}
