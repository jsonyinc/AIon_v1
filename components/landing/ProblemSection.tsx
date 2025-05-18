"use client"; // This section uses motion

import { motion } from "framer-motion"; // motion is used in this section
import { Users, BarChart3, Zap } from "lucide-react"; // Icons are used

// Import other necessary components or hooks if used within this section
// Looking at the code, it uses motion.div, Users, BarChart3, Zap.

export default function ProblemSection() {
  return (
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
  );
}
