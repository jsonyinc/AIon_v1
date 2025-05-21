"use client"; // Footer might contain interactive elements or be part of a client component page

import Link from "next/link";
// Import necessary icons used in the footer
import { CheckCircle2, ChevronRight, Users, Zap, BarChart3, PieChart, LineChart, UserCircle } from "lucide-react"; // Assuming these icons are used in the footer, although they might be from other sections. I'll include common ones found in page.tsx.
// Looking at the footer code, it uses SVGs directly, not lucide-react icons. So no lucide-react import is needed for the footer itself.

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-xl font-bold text-white flex items-center mb-4">
              Alon <span className="text-xl ml-1 text-green-400">RomiⒻ</span>
            </Link>
            <p className="text-base font-bold text-gray-400 mb-6 max-w-xs">
              인간과 AI의 협업을 통한 비즈니스 혁신 기업<br />
              Product Engineering<br />
              Design Enineering 
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
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  AI 전략 컨설팅
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  Romi© 솔루션
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  에이전트 보스 시스템
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  조직 혁신 프로그램
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  AI 구현 및 통합
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">회사 정보</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  소개
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  팀
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  채용
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-gray-400 hover:text-white">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-400 hover:text-white">
                  뉴스룸
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider mb-4">연락처</h3>
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
                <span className="text-base text-gray-400">
                  경기도 화성시 봉담<br />
                  AION LABS 빌딩 14F
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
                <span className="text-base text-gray-400">ceo@AIONlabs.kr</span>
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
                <span className="text-base text-gray-400">010-5941-1052</span>
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
  );
}
