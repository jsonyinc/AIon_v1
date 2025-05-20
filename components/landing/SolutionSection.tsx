"use client"; // This section uses motion and interactive elements

import { motion } from "framer-motion"; // motion is used in this section
import { CheckCircle2, ChevronRight, Users, Zap } from "lucide-react"; // Icons are used
import { Button } from "@/components/ui/button"; // Button is used
import Link from "next/link"; // Link is used

// Import other necessary components or hooks if used within this section
// Based on the provided code, it uses motion.div, CheckCircle2, Button, ChevronRight, Link, Users, Zap.

export default function SolutionSection() {
  return (
    <section id="solution" className="relative z-10 py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">
              더 이상 AI는 뜬구름이 아닙니다.<br />
              <span className="text-green-500">RomiⒻ</span>와{" "}         
              <span className="text-green-500">'Agent Boss'</span>가 명쾌한 성과를 약속합니다.
            </h2>
            <div className="bg-orange-100/50 p-4 rounded-lg text-base text-orange-800">
              <span className="text-green-500 font-bold">RomiⒻ</span>는 단순한 AI 솔루션 그 이상, 인간과 AI가 자연스럽게
              공존하는 프론티어 기업 가능성의 비전을 제시합니다. 귀사의 AI 혁신 여정을 이끌 'Agent Boss' 기반 솔루션으로, 
              귀하가 꿈꾸는 비즈니스 성장을 실현합니다.
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">전략적 AI 통합</h3>
                  <p className="text-base text-gray-600">
                    기업의 핵심 업무에 AI를 전략적으로 통합하여 고도화된 프로세스를 구현합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">'에이전트 보스' 시스템</h3>
                  <p className="text-base text-gray-600">
                    인간과 AI의 에이전트들 간의 협업 구조를 통해 업무 효율성과 창의성을 극대화합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">실행 가능한 인사이트</h3>
                  <p className="text-base text-gray-600">
                    단순 AI 분석이 아닌 실시간 의사결정을 지원하는 실용적 인사이트를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-5">
                <span className="font-bold">RomiⒻ의 솔루션 알아보기(예정)</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

         <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-r from-slate-900 to-teal-500 w-full h-full relative">
                <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                  {/* 배경 원 */}
                  <g fill="white" opacity="0.1">
                    <circle cx="400" cy="300" r="300" />
                  </g>
                  <g fill="none" stroke="white" strokeWidth="2" opacity="0.6">
                    <circle cx="400" cy="300" r="180" />
                    <circle cx="400" cy="300" r="270" strokeDasharray="10,10" />
                  </g>

                  {/* 중앙 노드 - Agent Boss */}
                  <g>
                    <circle cx="400" cy="300" r="90" fill="white" opacity="0.9" />
                    <text x="400" y="305" fontSize="24" textAnchor="middle" fill="#0A2540" fontWeight="bold">Agent Boss</text>
                  </g>

                  {/* 연결된 노드들 */}
                  <g>
                    <circle cx="280" cy="200" r="60" fill="white" opacity="0.7" />
                    <text x="280" y="205" fontSize="18" textAnchor="middle" fill="#0A2540">AI Agent 1</text>
                    <path d="M310,230 L370,270" stroke="white" strokeWidth="2" />
                  </g>

                  <g>
                    <circle cx="280" cy="400" r="60" fill="white" opacity="0.7" />
                    <text x="280" y="405" fontSize="18" textAnchor="middle" fill="#0A2540">AI Agent 2</text>
                    <path d="M310,380 L370,330" stroke="white" strokeWidth="2" />
                  </g>

                  <g>
                    <circle cx="520" cy="200" r="60" fill="white" opacity="0.7" />
                    <text x="520" y="205" fontSize="18" textAnchor="middle" fill="#0A2540">Human 1</text>
                    <path d="M490,230 L430,270" stroke="white" strokeWidth="2" />
                  </g>

                  <g>
                    <circle cx="520" cy="400" r="60" fill="white" opacity="0.7" />
                    <text x="520" y="405" fontSize="18" textAnchor="middle" fill="#0A2540">Human 2</text>
                    <path d="M490,380 L430,330" stroke="white" strokeWidth="2" />
                  </g>

                  {/* 설명 텍스트 */}
                  <text x="400" y="500" fontSize="24" textAnchor="middle" fill="white" fontWeight="bold" opacity="0.9">
                    RomiⒻ: 인간-AI 협업 시스템
                  </text>
                </svg>
              </div>
            </div>

            {/* 하단 배지 */}
            <div className="absolute -bottom-4 left-8 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
              37%
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
