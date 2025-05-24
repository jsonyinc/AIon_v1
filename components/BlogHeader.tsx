"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation"; // usePathname 임포트
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import MobileMenu from "./mobile-menu" // MobileMenu는 그대로 사용
import { motion, useScroll, useTransform } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // 아바타 컴포넌트 임포트
import { useAuth } from "@/components/AuthProvider"; // useAuth 훅 임포트
import { supabase } from "@/lib/supabaseClient"; // Supabase 클라이언트 임포트

export default function BlogHeader() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { user, loading: authLoading } = useAuth(); // 인증 상태 가져오기

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

  const pathname = usePathname(); // usePathname 훅 사용

  const handleLogin = () => {
    // 현재 페이지 경로를 redirect 파라미터로 전달
    const currentPath = pathname || '/blog';
    const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
    
    console.log('[BlogHeader] Navigating to login with redirect:', loginUrl);
    router.push(loginUrl);
  };

  const handleLogout = async () => {
    console.log('[BlogHeader] Logout initiated.');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error.message);
      alert('로그아웃 중 오류가 발생했습니다.');
    } else {
      console.log('[BlogHeader] Redirecting to /blog after logout.');
      router.push('/blog');
    }
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
            {/* 랜딩 페이지 메뉴 링크들 추가 */}
            <Link
              href="/#problem"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              문제 인식
            </Link>
            <Link
              href="/#solution"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              솔루션
            </Link>
            <Link
              href="/#benefit"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              혜택
            </Link>
            <Link
              href="/#about"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              회사 소개
            </Link>

            {/* 블로그 드롭다운 메뉴 (기존과 동일) */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                  블로그
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={5} className="w-48">
                <DropdownMenuItem onClick={() => router.push('/blog')} className="cursor-pointer text-lg font-semibold">
                  전체 글
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/blog/category/ai-trend')} className="cursor-pointer text-lg font-semibold">
                  AI 트렌드
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/blog/category/case-study')} className="cursor-pointer text-lg font-semibold">
                  성공 사례
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/blog/category/tech')} className="cursor-pointer text-lg font-semibold">
                  기술 블로그
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 블로그 헤더에서는 '연락처' 대신 '글쓰기' 또는 다른 블로그 관련 메뉴 추가 가능 */}
            <Link
              href="/blog/write"
              className="text-xl font-bold px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              글쓰기
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* 로그인/로그아웃 및 사용자 정보 영역 */}
            {authLoading ? (
              <div className="text-gray-600">로딩 중...</div>
            ) : user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder-user.jpg"} alt={user.user_metadata?.full_name || user.email || "User"} />
                      <AvatarFallback>{user.email ? user.email[0].toUpperCase() : '?'}</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-800 font-medium hidden sm:inline">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5} className="w-48">
                  <DropdownMenuItem className="cursor-pointer text-lg font-semibold" onClick={() => router.push('/profile')}>
                    내 프로필
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-lg font-semibold" onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : ( // 로그인 버튼 클릭 시 handleLogin 호출
              <Button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                로그인
              </Button>
            )}

            {/* 모바일 메뉴 토글 버튼 */}
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
