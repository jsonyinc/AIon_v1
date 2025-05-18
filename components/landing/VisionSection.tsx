"use client"; // This section uses motion

import { motion } from "framer-motion"; // motion is used in this section
import { Users, LineChart, Zap } from "lucide-react"; // Icons are used

// Import other necessary components or hooks if used within this section
// Looking at the code, it uses motion.div, Users, LineChart, Zap.

export default function VisionSection() {
  return (
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
  );
}
