"use client"; // This section contains interactive elements

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // motion is used in this section

// Import other necessary components or hooks if used within this section
// Looking at the code, it uses Input, Select, Button, Link, motion, CheckCircle2.
// It also uses useState, useEffect, useScroll, useTransform, but these are page-level hooks, not section-specific.
// The section itself uses motion.div, CheckCircle2, Link, Button, Input, Select.

export default function ContactSection() {
  return (
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
            {/* Corrected list structure */}
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">무료 컨설팅 제공</h3>
                  <p className="text-sm text-gray-400">비즈니스 요구사항에 맞는 최적의 솔루션을 제안해 드립니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">ROI 분석</h3>
                  <p className="text-sm text-gray-400">도입 시 예상되는 투자 대비 수익을 분석해 드립니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">맞춤형 솔루션</h3>
                  <p className="text-sm text-gray-400">귀사의 비즈니스 환경에 최적화된 AI 솔루션을 제공합니다.</p>
                </div>
              </li>
            </ul>
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
                {/* <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    관심 분야 *
                  </label>
                  <Input id="interest" className="w-full text-gray-900" placeholder="AI 솔루션" />
                </div> */}

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    관심 분야 *
                  </label>
                  <Select>
                    <SelectTrigger className="w-full text-gray-900"> {/* 또는 이전의 text-gray-500 등 */}
                      <SelectValue placeholder="관심 분야를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="시장 트렌드">시장 트렌드</SelectItem>
                      <SelectItem value="AI 솔루션">AI 솔루션</SelectItem>
                      <SelectItem value="비즈니스 컨설팅">비즈니스 컨설팅</SelectItem>
                      <SelectItem value="웹앱 구축">웹앱 구축</SelectItem>
                      <SelectItem value="마케팅 전략">마케팅 전략</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                    </SelectContent>
                  </Select>
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
  );
}
