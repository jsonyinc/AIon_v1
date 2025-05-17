"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import MobileMenu from "./mobile-menu"
import { motion, useScroll, useTransform } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // 스크롤에 따른 헤더 배경 투명도 조절
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0.9, 1])
  const headerShadow = useTransform(scrollY, [0, 100], ["0 0 0 rgba(0,0,0,0)", "0 4px 6px -1px rgba(0,0,0,0.1)"])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity.get()})`,
          backdropFilter: "blur(8px)",
          boxShadow: headerShadow,
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-black flex items-center">
              Alon <span className="text-xs ml-1 text-gray-500">Inc.</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            <Link
              href="#problem"
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              문제 인식
            </Link>
            <Link
              href="#solution"
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              솔루션
            </Link>
            <Link
              href="#product"
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              제품
            </Link>
            <Link
              href="#about"
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              회사 소개
            </Link>

            {/* 블로그 드롭다운 메뉴 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                  블로그
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="cursor-pointer">
                    전체 글
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog/category/ai-trend" className="cursor-pointer">
                    AI 트렌드
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog/category/case-study" className="cursor-pointer">
                    성공 사례
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog/category/tech" className="cursor-pointer">
                    기술 블로그
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#contact"
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              연락처
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="hidden md:flex bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              상담 신청
            </Button>

            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
