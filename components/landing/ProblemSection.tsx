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
            AI의 잠재력, 우리 회사에 맞는 <span className="text-green-500">'진짜 해답'</span>은 어디에서 찾을수 있을까요?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-xl font-medium mb-6">문제 인식</h3>
            <div className="bg-orange-100/50 p-4 rounded-lg text-base text-orange-800 mb-2">
              AI는 단순 기술 이상의 가능성을 가지고 있지만, 많은 기업들은 그저 마케팅 용어로만 사용하거나 추상적인
              개념으로만 접근하고 있습니다. 실제 비즈니스 성과로 연결되지 못하는 경우가 많습니다. AI 도입만으로 모든
              것이 해결된다는 환상에서 벗어나 현실적인 접근이 필요한 시점입니다.
            </div>
            <div className="bg-orange-100/50 p-4 rounded-lg text-base text-orange-800 mb-6">
              AI가 모든 것을 바꿀 것이라는 이야기는 넘쳐나지만, 정작 '어떻게' 우리 조직에 적용하고, '무엇을' 통해 실질적인
              가치를 창출할 수 있을지에 대한 명쾌한 답은 찾기 어렵습니다. AI 도입의 복잡성, 기존 업무 방식과의 충돌, ROI 
              불확실성... 혹시 이런 고민들이 혁신의 발목을 잡고 있지는 않습니까?
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8 shadow-md">
              <div className="w-full h-full bg-gradient-to-r from-primary/5 to-secondary/5 flex items-center justify-center">
                <svg viewBox="0 0 800 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="transparent" />
                  
                  {/* 기준선 */}
                  <line x1="100" y1="225" x2="700" y2="225" stroke="#0A2540" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.6" />
                  {/* 세로선 */}
                  <line x1="400" y1="50" x2="400" y2="400" stroke="#0A2540" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.6" />

                  {/* 곡선 */}
                  <path 
                    d="M150,225 C200,100 250,100 300,150 C350,200 380,100 400,120 C420,140 450,300 500,300 C550,300 600,350 650,225"
                    fill="none"
                    stroke="#0A2540"
                    strokeWidth="2"
                  />

                  {/* 기대치 영역 */}
                  <circle cx="280" cy="150" r="50" fill="#0A2540" opacity="0.2" />
                  <text x="280" y="155" fontSize="14" textAnchor="middle" fill="#0A2540">AI 기대</text>

                  {/* 현실 영역 */}
                  <circle cx="520" cy="300" r="50" fill="#FF7A00" opacity="0.2" />
                  <text x="520" y="305" fontSize="14" textAnchor="middle" fill="#0A2540">현실</text>

                  {/* 제목 */}
                  <text x="400" y="50" fontSize="18" textAnchor="middle" fill="#0A2540">기대치 vs 현실</text>
                  {/* 축 텍스트 */}
                  <text x="150" y="250" fontSize="12" textAnchor="middle" fill="#0A2540">시간</text>
                  <text x="400" y="420" fontSize="14" textAnchor="middle" fill="#0A2540">
                    AI 도입 과정에서의 기대치와 현실 간의 격차
                  </text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-slate-200 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">투자자의 고민</h4>
                    <p className="text-base text-gray-600">
                      AI 기술에 투자했지만 실질적인 ROI를 확인하기 어렵습니다. 구체적인 성과 지표가 필요합니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-slate-200 p-2 rounded-full mr-3">
                    <BarChart3 className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">정확 관계성의 과제</h4>
                    <p className="text-base text-gray-600">
                      AI 도입과 비즈니스 성과 사이의 명확한 상관관계를 증명하기 어렵습니다. 측정 가능한 지표가
                      필요합니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-slate-200 p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">기업의 도전</h4>
                    <p className="text-base text-gray-600">
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
