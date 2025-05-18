"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle2, ChevronRight, Users, Zap, BarChart3, PieChart, LineChart, UserCircle } from "lucide-react"
import Header from "@/components/header"

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

      {/* 히어로 섹션 */}
      <section id="hero" className="relative z-10 bg-gradient-to-br from-white to-gray-50 pt-16 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI 혁명, <span className="text-green-500">Romi</span>로 현실로:{" "}
              <span className="whitespace-nowrap">에이전트 보스가 당</span> <br />
              <span className="whitespace-nowrap">신의 비즈니스를 미래로 이끈다.</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              인간과 AI의 완벽한 시너지, '에이전트 보스' 시스템이 AI 혁신의 막연함을 걷어내고, 투자자와 기업의 실질적
              성장을 견인합니다.
            </p>
            <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800 mb-8 max-w-3xl mx-auto">
              Alon Inc.는 단순한 AI 솔루션 그 이상, 인간과 AI가 자연스럽게 공존하는 프론티어의 가능성에 빛을 가르켜
              줍니다. Romi는 귀사의 AI 혁신 여정을 이끌 '에이전트 보스' 기반 솔루션으로, 귀하의 비즈니스를 더하여 성장의
              실제와 미래 비전을 선사합니다.
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6">
                <span>Romi 솔루션, 지금 바로 경험하세요!</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 rounded-full px-8 py-6">
                <span>'프론트엔드 기업' 비전 살펴보기</span>
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

      {/* AI 잠재력 섹션 */}
      <section id="problem" className="relative z-10 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              AI의 잠재력, 아직도 <span className="text-green-500">뜬구름 잡는</span> 이야기에 머물러 있습니까?
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-lg font-medium mb-6">문제 인식</h3>
              <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800 mb-6">
                AI는 단순 기술 이상의 가능성을 가지고 있지만, 많은 기업들은 그저 마케팅 용어로만 사용하거나 추상적인
                개념으로만 접근하고 있습니다. 실제 비즈니스 성과로 연결되지 못하는 경우가 많습니다. AI 도입만으로 모든
                것이 해결된다는 환상에서 벗어나 현실적인 접근이 필요한 시점입니다.
              </div>
              <div className="relative h-72 w-full mb-8">
                <div className="bg-gray-50 p-4 rounded-lg h-full">
                  <div className="text-center mb-2 text-sm font-medium">기대치 vs 현실</div>
                  <div className="relative h-64 w-full">
                    <svg viewBox="0 0 500 200" className="w-full h-full">
                      {/* 기준선 */}
                      <line x1="50" y1="100" x2="450" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />

                      {/* 세로 구분선 */}
                      <line x1="250" y1="30" x2="250" y2="170" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />

                      {/* 곡선 */}
                      <path
                        d="M50,100 C120,40 180,40 250,80 C320,120 380,170 450,100"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                      />

                      {/* 영역 표시 */}
                      <circle cx="150" cy="60" r="30" fill="#d1d5db" fillOpacity="0.5" />
                      <circle cx="350" cy="130" r="30" fill="#fecaca" fillOpacity="0.5" />

                      {/* 텍스트 */}
                      <text x="80" y="160" fill="#f97316" fontSize="12">
                        시간
                      </text>
                      <text x="150" y="60" fill="#374151" fontSize="12" textAnchor="middle">
                        AI 기대치
                      </text>
                      <text x="350" y="130" fill="#374151" fontSize="12" textAnchor="middle">
                        현실
                      </text>
                      <text x="250" y="190" fill="#374151" fontSize="10" textAnchor="middle">
                        AI 도입 과정에서의 기대치와 현실 간의 격차
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-slate-200 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">투자자의 고민</h4>
                      <p className="text-sm text-gray-600">
                        AI 기술에 투자했지만 실질적인 ROI를 확인하기 어렵습니다. 구체적인 성과 지표가 필요합니다.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-slate-200 p-2 rounded-full mr-3">
                      <BarChart3 className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">정확 관계성의 과제</h4>
                      <p className="text-sm text-gray-600">
                        AI 도입과 비즈니스 성과 사이의 명확한 상관관계를 증명하기 어렵습니다. 측정 가능한 지표가
                        필요합니다.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-slate-200 p-2 rounded-full mr-3">
                      <Zap className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">기업의 도전</h4>
                      <p className="text-sm text-gray-600">
                        AI 기술 도입 후 실제 비즈니스 프로세스에 통합하는 과정에서 많은 어려움을 겪고 있습니다.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RomiⒻ: '에이전트 보스'가 이끄는 AI 혁신 패러다임 섹션 */}
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
                <span className="text-green-500">RomiⒻ</span>: '에이전트 보스'가 이끄는 AI 혁신 패러다임
              </h2>
              <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800">
                Alon Inc.는 프론티어 기업으로 완전 새로운 비전과 '에이전트 보스(Agent Boss)' 시스템을 통해 AI를 활용한
                혁신적인 조직 혁신을 제시합니다. RomiⒻ는 단순한 AI 도구가 아닌, 인간과 AI가 공존하여 정확한 업무 체계를
                구현합니다.
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">전략적 AI 통합</h3>
                    <p className="text-sm text-gray-600">
                      기업의 핵심 업무에 AI를 전략적으로 통합하여 고도화된 프로세스를 구현합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">'에이전트 보스' 시스템</h3>
                    <p className="text-sm text-gray-600">
                      인간과 AI의 에이전트들 간의 협업 구조를 통해 업무 효율성과 창의성을 극대화합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">실행 가능한 인사이트</h3>
                    <p className="text-sm text-gray-600">
                      단순 AI 분석이 아닌 실시간 의사결정을 지원하는 실용적 인사이트를 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-5">
                  <span>Alon의 솔루션 알아보기</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-r from-slate-900 to-teal-500 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-8 md:p-12 flex justify-center items-center min-h-[400px]">
                  <div className="relative w-full max-w-md">
                    <div className="absolute top-0 right-0 bg-green-400/20 text-white text-xs px-3 py-1 rounded-bl-md">
                      Romi: 인간-AI 협업 시스템
                    </div>
                    <div className="flex items-center justify-center">
                      {/* 외부 점선 원 */}
                      <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-white/30"></div>

                      {/* Agent Boss 중앙 원 */}
                      <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white z-20 relative">
                        <div className="text-center">
                          <div className="text-lg font-medium">Agent Boss</div>
                        </div>
                      </div>

                      {/* 연결된 에이전트들 */}
                      <div className="absolute top-8 left-1/2 -translate-x-40 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                        <span>AI Agent 1</span>
                      </div>
                      <div className="absolute top-8 left-1/2 translate-x-20 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                        <span>Human 1</span>
                      </div>
                      <div className="absolute bottom-8 left-1/2 -translate-x-40 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                        <span>AI Agent 2</span>
                      </div>
                      <div className="absolute bottom-8 left-1/2 translate-x-20 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                        <span>Human 2</span>
                      </div>

                      {/* 연결선 */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                        <circle cx="50%" cy="50%" r="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="30%" y2="75%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="70%" y2="75%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-8 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                37%
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI 프론트엔드 기업의 비전 */}
      <section id="vision" className="relative z-10 py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              AI<span className="text-green-400">프론트엔드</span> 기업의 비전
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              기술의 경계를 넘어, Alon Inc.는 인간과 AI의 협업이 만드는 미래적 주치를 제시합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-800/50 p-6 rounded-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">인간-AI 협업 모델</h3>
              <p className="text-sm text-gray-400 text-center">
                인간과 AI 모두 서로를 보완, '에이전트 보스'를 중심으로 인간과 AI 에이전트가 각자의 강점을 활용하여
                시너지를 창출하는 새로운 조직 모델을 구현합니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-800/50 p-6 rounded-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <LineChart className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">실질적 성과 실현</h3>
              <p className="text-sm text-gray-400 text-center">
                인간적인 AI 도입을 넘어, 구체적이고 측정 가능한 비즈니스 성과를 창출하는 체계적인 접근법을 제공합니다.
                평균 37%의 생산성 향상과 의사결정 속도 42% 개선이 증명합니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-800/50 p-6 rounded-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">지속 가능한 혁신</h3>
              <p className="text-sm text-gray-400 text-center">
                일회성이 아닌 모이는 AI, AI 역할이 지속적으로 확장하는 조직 문화의 시스템을 구축합니다. 미래 변화에
                유연하게 대응할 수 있는 견고한 기반을 마련합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Romi 핵심 혜택 섹션 */}
      <section id="product" className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">
              Romi<span className="text-green-500">가 제공하는 핵심 혜택</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              인간과 에이전트 보스 시스템이 AI 솔루션의 실질적 혜택으로 이어지는 과정, 수치로 증명되는 가치를
              확인하세요.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">생산성 37% 향상</h3>
              <p className="text-sm text-gray-600 mb-4">
                에이전트 보스 시스템이 도입되면서 팀의 작업 처리 속도 개선과 업무 효율성이 크게 향상됩니다. 반복적인
                작업은 AI가 처리하고, 인간은 창의적인 의사결정에 집중할 수 있습니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">생산성</span>
                  <span className="text-gray-900 font-medium">37% ↑</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "37%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <LineChart className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">의사결정 시간 42% 단축</h3>
              <p className="text-sm text-gray-600 mb-4">
                에이전트 보스가 데이터 기반의 의사결정을 지원하여 의사결정 시간이 크게 단축됩니다. 복잡한 문제도 AI의
                분석과 인간의 직관이 결합하여 더 빠르고 정확한 결정이 가능해집니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">의사결정 시간</span>
                  <span className="text-gray-900 font-medium">42% ↓</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "42%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">팀 협업 효율성 55% 개선</h3>
              <p className="text-sm text-gray-600 mb-4">
                에이전트 보스 시스템이 팀 구성원 간의 협업 효율성이 크게 향상됩니다. AI가 정보 공유와 작업 조율을
                지원하여 팀워크가 강화되고 프로젝트 완료 시간이 단축됩니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">팀 협업</span>
                  <span className="text-gray-900 font-medium">55% ↑</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "55%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">ROI 최수기간 60% 단축</h3>
              <p className="text-sm text-gray-600 mb-4">
                Romi 도입 기업들은 투자 대비 수익을 거두는 기간이 평균 60% 단축되었습니다. AI 투자의 회수 기간을 크게
                줄여 비즈니스 성장을 가속화합니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ROI 회수</span>
                  <span className="text-gray-900 font-medium">60% ↓</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <PieChart className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">작업 만족도 48% 향상</h3>
              <p className="text-sm text-gray-600 mb-4">
                직원들의 업무 만족도가 크게 향상됩니다. 에이전트 보스가 단순 반복 작업을 처리하여 직원들이 더 가치 있는
                업무에 집중할 수 있게 되었습니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">작업 만족도</span>
                  <span className="text-gray-900 font-medium">48% ↑</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "48%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">품질 및 정확도 62% 향상</h3>
              <p className="text-sm text-gray-600 mb-4">
                에이전트 보스 시스템이 품질 관리와 오류 검출을 지원하여 작업 결과물의 품질과 정확도가 크게 향상됩니다.
                인간의 창의성과 AI의 정밀함이 결합된 결과입니다.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">품질 및 정확도</span>
                  <span className="text-gray-900 font-medium">62% ↑</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "62%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 프론트엔드 기업의 성공 사례 */}
      <section id="case-study" className="relative z-10 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-green-500">프론트엔드 기업</span>의 성공 사례
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-8">
                <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800 mb-6">
                  프론트엔드 개발 회사 A사는 Romi 도입 후 개발 주기를 30% 단축했습니다. 특히 반복적인 코딩 작업과 테스트
                  과정에서 에이전트 보스의 지원으로 개발자들의 생산성이 크게 향상되었습니다. 또한 코드 품질도 개선되어
                  버그 발생률이 45% 감소했습니다.
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <UserCircle className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">김영수</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">"Romi 도입 이후 개발 속도가 놀랍게 향상되었습니다."</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">37%</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">42%</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">5개월</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">91%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-8">
                <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800 mb-6">
                  디지털 마케팅 에이전시 B사는 Romi의 에이전트 보스 시스템을 활용해 고객 데이터 분석과 캠페인 최적화에
                  적용했습니다. 그 결과 캠페인 ROI가 62% 향상되었고, 고객 응대 시간은 40% 단축되었습니다. 특히 AI와 인간
                  마케터의 협업 모델이 창의적인 콘텐츠 제작과 데이터 기반 의사결정의 균형을 이루는 데 큰 역할을
                  했습니다.
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <UserCircle className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">박지민</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "에이전트 보스 시스템이 마케팅 전략을 한 단계 끌어올렸습니다."
                </p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">37%</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">42%</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">5개월</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded-md text-center">
                    <span className="text-green-600 text-sm font-medium">91%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alon Inc. 소개 */}
      <section id="about" className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Alon Inc. <span className="text-green-500">소개</span>
              </h2>
              <div className="bg-orange-100/50 p-4 rounded-lg text-sm text-orange-800 mb-6">
                Alon Inc.는 인공지능 AI 기반으로 혁신적인 비즈니스 솔루션을 제공하는 기업입니다. 우리는 단순히 AI
                솔루션을 제공하는 것이 아니라, 인간과 AI의 협업을 통해 기업의 성장과 혁신을 지원합니다.
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">전문적인 AI 전략 컨설팅</h3>
                    <p className="text-sm text-gray-600">
                      기업의 비즈니스 목표와 환경에 맞는 최적의 AI 전략을 수립합니다.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">혁신적인 에이전트 보스 기술</h3>
                    <p className="text-sm text-gray-600">
                      인간과 AI의 협업을 극대화하는 에이전트 보스 시스템을 제공합니다.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">글로벌한 조직 혁신 지원</h3>
                    <p className="text-sm text-gray-600">AI 기반의 조직 문화와 업무 프로세스 혁신을 지원합니다.</p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                  Alon 제품 알아보기
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 rounded-full">
                  회사 소개 자료 다운로드
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-teal-500 to-green-500 rounded-lg p-8 flex items-center justify-center"
              >
                <div className="text-white">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg p-8 flex items-center justify-center"
              >
                <div className="text-white">
                  <div className="flex justify-center mb-2">
                    <Zap className="h-8 w-8" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg p-8 flex items-center justify-center"
              >
                <div className="text-white">
                  <div className="flex justify-center mb-2">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-8 flex items-center justify-center"
              >
                <div className="text-white">
                  <div className="flex justify-center mb-2">
                    <UserCircle className="h-8 w-8" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 문의 양식 */}
      <section id="contact" className="relative z-10 py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                AI <span className="text-green-400">혁신의 여정을</span> 지금 시작하세요
              </h2>
              <p className="text-gray-300 mb-6">
                Alon Inc.는 인공지능 기술을 통해 기업의 성장과 혁신을 지원합니다. 지금 바로 문의하여 비즈니스의 새로운
                가능성을 발견하세요.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">무료 컨설팅 제공</h3>
                    <p className="text-sm text-gray-400">비즈니스 요구사항에 맞는 최적의 솔루션을 제안해 드립니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">ROI 분석</h3>
                    <p className="text-sm text-gray-400">도입 시 예상되는 투자 대비 수익을 분석해 드립니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-slate-800 p-2 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">맞춤형 솔루션</h3>
                    <p className="text-sm text-gray-400">귀사의 비즈니스 환경에 최적화된 AI 솔루션을 제공합니다.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">문의 양식</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 *
                    </label>
                    <Input id="name" className="w-full text-gray-900" placeholder="홍길동" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      회사명 *
                    </label>
                    <Input id="company" className="w-full text-gray-900" placeholder="주식회사 예시" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일 *
                    </label>
                    <Input id="email" type="email" className="w-full text-gray-900" placeholder="example@company.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <Input id="phone" className="w-full text-gray-900" placeholder="010-1234-5678" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                      관심 분야 *
                    </label>
                    <Input id="interest" className="w-full text-gray-900" placeholder="AI 솔루션" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      메시지
                    </label>
                    <textarea
                      id="message"
                      className="w-full min-h-[100px] rounded-md border border-gray-300 p-2 text-gray-900 placeholder:text-gray-200" // placeholder 색상 추가
                      placeholder="문의사항을 입력하세요."
                    />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6">문의하기 (무료)</Button>
                  <p className="text-xs text-center text-gray-500">
                    <Link href="#" className="text-green-600 hover:underline">
                      개인정보처리방침
                    </Link>
                    에 동의합니다.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative z-10 bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="text-xl font-bold text-white flex items-center mb-4">
                Alon <span className="text-xs ml-1 text-green-400">Inc.</span>
              </Link>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">
                인간과 AI의 협업을 통한 미래 비즈니스 혁신의 선두주자
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">서비스</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    AI 전략 컨설팅
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Romi© 솔루션
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    에이전트 보스 시스템
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    조직 혁신 프로그램
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    AI 구현 및 통합
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">회사 정보</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    팀
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    채용
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-400 hover:text-white">
                    블로그
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    뉴스룸
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">연락처</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                        fill="#10B981"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">
                    서울특별시 강남구 테헤란로 123, <br />
                    Alon빌딩 8층
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                        fill="#10B981"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">info@aloninc.com</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                        fill="#10B981"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">02-123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <p className="text-xs text-gray-400 mb-4 md:mb-0">© 2025 Alon Inc. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-xs text-gray-400 hover:text-white">
                  개인정보처리방침
                </Link>
                <Link href="#" className="text-xs text-gray-400 hover:text-white">
                  이용약관
                </Link>
                <Link href="#" className="text-xs text-gray-400 hover:text-white">
                  쿠키 정책
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
