"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import MobileMenu from "./mobile-menu"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider"; // AuthProvider 훅 임포트
import { supabase } from "@/lib/supabaseClient"; // Supabase 클라이언트 임포트

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // AuthProvider의 loading 상태 사용

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/blog'); // 로그아웃 후 블로그 메인 페이지로 리디렉션
  };

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
              <Image
                src="/logo.png"
                alt="AIon Inc Logo"
                width={40}
                height={40}
                className="h-12 w-auto"
              />
              <span className="text-4xl font-bold text-black ml-2">AIon</span>
              <span className="text-4xl font-bold text-green-500 ml-2">RomiⒻ</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            <Link
              href="/blog/category/ai-trend"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              AI 트렌드
            </Link>
            <Link
              href="/blog/category/case-study"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              성공 사례
            </Link>
            <Link
              href="/blog/category/tech"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              기술 블로그
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {authLoading ? (
              <p className="text-gray-600 text-sm">로딩 중...</p>
            ) : user ? (
              <div className="flex items-center space-x-2">
                {user.user_metadata?.avatar_url && (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-gray-600 font-medium hidden sm:inline">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                  로그아웃
                </Button>
              </div>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                  로그인
                </Button>
              </Link>
            )}

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
