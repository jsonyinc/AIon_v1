"use client"; // This section uses motion

import { motion } from "framer-motion"; // motion is used in this section
import { Users, LineChart, BarChart3, PieChart, UserCircle, Zap } from "lucide-react"; // Icons are used, added Zap

// Import other necessary components or hooks if used within this section
// Looking at the code, it uses motion.div, Users, LineChart, BarChart3, PieChart, UserCircle, Zap.

export default function BenefitSection() {
  return (
    <section id="benefit" className="relative z-10 py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-green-500">RomiⒻ</span>가 제공하는 핵심 혜택
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            인간과 'Agent Boss' 시스템이 AI 솔루션의 실질적 혜택으로 이어지는 과정과 수치로 증명되는 가치를
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
            <p className="text-base text-gray-600 mb-4">
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
            <p className="text-base text-gray-600 mb-4">
              'Agent Boss'가 데이터 기반의 의사결정을 지원하여 의사결정 시간이 크게 단축됩니다. 복잡한 문제도 AI의
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
            <p className="text-base text-gray-600 mb-4">
              'Agent Boss' 시스템이 팀 구성원 간의 협업 효율성이 크게 향상됩니다. AI가 정보 공유와 작업 조율을
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
            <p className="text-base text-gray-600 mb-4">
              RomiⒻ 도입 기업들은 투자 대비 수익을 거두는 기간이 평균 60% 단축되었습니다. AI 투자의 회수 기간을 크게
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
            <p className="text-base text-gray-600 mb-4">
              직원들의 업무 만족도가 크게 향상됩니다. 'Agent Boss'가 단순 반복 작업을 처리하여 직원들이 더 가치 있는
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
            <p className="text-base text-gray-600 mb-4">
              'Agent Boss' 시스템이 품질 관리와 오류 검출을 지원하여 작업 결과물의 품질과 정확도가 크게 향상됩니다.
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
  );
}
