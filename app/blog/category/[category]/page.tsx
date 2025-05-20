"use client"

import { useState, useEffect } from "react" // useEffect 임포트 추가
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Tag, ArrowRight, Clock } from "lucide-react"
import Header from "@/components/header"
import { useParams } from 'next/navigation'; // useParams 훅 임포트

// 블로그 카테고리 데이터
const categories = [
  { id: "all", name: "전체 글", count: 42 },
  { id: "ai-trend", name: "AI 트렌드", count: 15 },
  { id: "case-study", name: "성공 사례", count: 12 },
  { id: "tech", name: "기술 블로그", count: 8 },
  { id: "news", name: "뉴스", count: 7 },
]

// 인기 태그 데이터
const popularTags = [
  { id: "ai", name: "AI", count: 28 },
  { id: "agent-boss", name: "에이전트 보스", count: 15 },
  { id: "romi", name: "Romi", count: 12 },
  { id: "business", name: "비즈니스", count: 10 },
  { id: "innovation", name: "혁신", count: 8 },
  { id: "future", name: "미래", count: 7 },
  { id: "technology", name: "기술", count: 6 },
]

// 블로그 포스트 데이터
const blogPosts = [
  {
    id: 1,
    title: "에이전트 보스 시스템이 기업 생산성을 37% 향상시키는 방법",
    summary: "Romi의 에이전트 보스 시스템이 어떻게 기업의 생산성을 크게 향상시키는지 실제 사례와 함께 살펴봅니다.",
    category: "case-study",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-05-10",
    author: "김영수",
    readTime: "8분",
    tags: ["에이전트 보스", "생산성", "AI"],
  },
  {
    id: 2,
    title: "2025년 AI 트렌드: 인간-AI 협업의 새로운 패러다임",
    summary: "2025년 AI 산업의 주요 트렌드와 인간-AI 협업이 가져올 비즈니스 혁신에 대해 분석합니다.",
    category: "ai-trend",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-05-05",
    author: "이지원",
    readTime: "10분",
    tags: ["AI 트렌드", "협업", "미래"],
  },
  {
    id: 3,
    title: "Romi 솔루션 기술 아키텍처 심층 분석",
    summary: "Romi 솔루션의 기술적 구조와 에이전트 보스 시스템의 작동 원리를 자세히 설명합니다.",
    category: "tech",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-04-28",
    author: "박준호",
    readTime: "15분",
    tags: ["기술", "아키텍처", "Romi"],
  },
  {
    id: 4,
    title: "Alon Inc., 시리즈 B 투자 유치 성공",
    summary: "Alon Inc.가 에이전트 보스 기술 개발 가속화를 위한 시리즈 B 투자 유치에 성공했습니다.",
    category: "news",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-04-20",
    author: "최민지",
    readTime: "5분",
    tags: ["투자", "뉴스", "성장"],
  },
  {
    id: 5,
    title: "AI 도입 실패 사례와 교훈: 무엇이 문제였나?",
    summary: "AI 도입에 실패한 기업들의 사례를 분석하고, 성공적인 AI 전환을 위한 핵심 요소를 알아봅니다.",
    category: "case-study",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-04-15",
    author: "김영수",
    readTime: "12분",
    tags: ["AI 도입", "실패 사례", "교훈"],
  },
  {
    id: 6,
    title: "에이전트 보스 시스템의 기술적 진화: 1세대에서 3세대까지",
    summary: "에이전트 보스 시스템의 기술적 발전 과정과 각 세대별 특징 및 개선점을 살펴봅니다.",
    category: "tech",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-04-08",
    author: "박준호",
    readTime: "14분",
    tags: ["기술 발전", "에이전트 보스", "혁신"],
  },
]

// 카테고리별 설명 데이터
const categoryDescriptions = {
  "ai-trend":
    "AI 기술의 최신 트렌드와 미래 전망을 분석하는 글을 모았습니다. 인공지능 기술의 발전 방향과 비즈니스 적용 사례를 확인하세요.",
  "case-study":
    "Romi와 에이전트 보스 시스템을 도입한 기업들의 실제 성공 사례를 소개합니다. 구체적인 성과와 도입 과정의 인사이트를 확인하세요.",
  tech: "Romi 솔루션의 기술적 구조와 작동 원리를 심층적으로 분석합니다. 개발자와 기술 담당자를 위한 전문적인 내용을 제공합니다.",
  news: "Alon Inc.와 AI 산업의 최신 소식을 전합니다. 투자 유치, 신제품 출시, 주요 행사 등 중요한 뉴스를 확인하세요.",
}

export default function CategoryPage() { // params 인자 제거
  const [searchQuery, setSearchQuery] = useState("")
  const params = useParams(); // useParams 훅 사용
  const categoryId = params.category as string; // category 파라미터 가져오기

  // 현재 카테고리 정보 가져오기
  const currentCategory = categories.find((cat) => cat.id === categoryId) || {
    id: categoryId,
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, " "),
    count: 0,
  }

  // 카테고리에 맞는 포스트 필터링
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = categoryId === post.category
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

    useEffect(() => {
        // URL 해시 기반 스크롤 로직
        const handleHashScroll = () => {
            if (window.location.hash) {
                const elementId = window.location.hash.substring(1);
                const element = document.getElementById(elementId);
                if (element) {
                    // 헤더 높이를 고려하여 스크롤 위치 조정 (Header 높이가 48px임을 감안)
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0; // 동적으로 헤더 높이 가져오기
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        };

        // 페이지 마운트 시 스크롤 로직 실행
        handleHashScroll();

        // 해시 변경 시 스크롤 로직 다시 실행 (SPA 네비게이션 고려)
        window.addEventListener('hashchange', handleHashScroll);

        // 컴포넌트 언마운트 시 이벤트 리스너 해제
        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };

    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 카테고리 헤더 */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {currentCategory.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 mb-8"
            >
              {categoryDescriptions[categoryId as keyof typeof categoryDescriptions] ||
                "이 카테고리의 최신 글과 인사이트를 확인하세요."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={`${currentCategory.name} 검색...`}
                className="pl-10 py-6 bg-white/10 border-none text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 카테고리 콘텐츠 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">카테고리</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={category.id === "all" ? "/blog" : `/blog/category/${category.id}`}
                          className={`px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                            categoryId === category.id ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">인기 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.id}`}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.name}
                        <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-sm p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">블로그 구독하기</h3>
                  <p className="text-sm mb-4 text-green-50">최신 AI 트렌드와 인사이트를 이메일로 받아보세요</p>
                  <Input
                    type="email"
                    placeholder="이메일 주소"
                    className="bg-white/20 border-none text-white placeholder:text-green-50 mb-2"
                  />
                  <Button className="w-full bg-white text-green-600 hover:bg-green-50">구독하기</Button>
                </div>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {currentCategory.name} <span className="text-gray-400">({filteredPosts.length})</span>
                </h2>
                <Link href="/blog/write" className="inline-flex items-center text-green-600 hover:text-green-700">
                  <span className="mr-1">글쓰기</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* 블로그 포스트 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full"
                    >
                      <Link href={`/blog/${post.id}`} className="block overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            {categories.find((c) => c.id === post.category)?.name}
                          </div>
                        </div>
                      </Link>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <Link href={`/blog/${post.id}`} className="block mb-3">
                          <h3 className="text-xl font-bold hover:text-green-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.summary}</p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center text-gray-500">
                    <p>이 카테고리에 게시물이 없거나 검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      이전
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-green-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      다음
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
