"use client"; // This section uses motion

import { motion } from "framer-motion"; // motion is used in this section
import { CheckCircle2, Users, Zap, BarChart3, UserCircle } from "lucide-react"; // Icons are used
import Link from "next/link"; // Link is used
import { Button } from "@/components/ui/button"; // Button is used (임포트 경로 수정됨)

// Import other necessary components or hooks if used within this section
// Looking at the code, it uses motion.div, CheckCircle2, Users, Zap, BarChart3, UserCircle, Link, Button.

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 타이틀과 소개 텍스트를 위한 새로운 컨테이너 - 섹션 중앙에 위치 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12" // 중앙 정렬 및 너비 제한
        >
          <h2 className="text-3xl font-bold mb-6"> {/* 여기서는 text-center를 제거해도 됩니다. */}
            회사 소개
          </h2>
          <div className="bg-orange-100/50 p-4 rounded-lg text-base text-orange-800">
            Alon Inc.는 인공지능 AI 기반으로 혁신적인 비즈니스 솔루션을 제공하는 기업입니다. <br />
            우리는 단순히 AI솔루션을 제공하는 것이 아니라, 인간과 AI의 협업을 통해 기업의 성장과 혁신을 지원합니다.
          </div>
        </motion.div>

        {/* 기존의 Grid 레이아웃 (목록, 버튼, 이미지 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* 목록과 버튼들을 포함하는 왼쪽 열 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            // className="text-center" // 이 motion.div에서는 text-center 제거
          >
            {/* 기존 목록 */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">전문적인 AI 전략 컨설팅</h3>
                  <p className="text-base text-gray-600">
                    기업의 비즈니스 목표와 환경에 맞는 최적의 AI 전략을 수립합니다.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">혁신적인 에이전트 보스 기술</h3>
                  <p className="text-base text-gray-600">
                    인간과 AI의 협업을 극대화하는 에이전트 보스 시스템을 제공합니다.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">글로벌한 조직 혁신 지원</h3>
                  <p className="text-base text-gray-600">AI 기반의 조직 문화와 업무 프로세스 혁신을 지원합니다.</p>
                </div>
              </li>
            </ul>
            {/* 기존 버튼 컨테이너 */}
            <div className="flex flex-col sm:flex-row gap-4 font-bold">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                Alon 제품 알아보기(예정)
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 rounded-full">
                회사 소개 자료 다운로드(예정)
              </Button>
            </div>
          </motion.div>

          {/* 이미지 그리드를 포함하는 오른쪽 열 */}
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
  );
}
