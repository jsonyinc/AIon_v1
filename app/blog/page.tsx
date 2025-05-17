"use client"

import { useState, useEffect } from "react" // useEffect 추가
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Tag, ArrowRight, Clock } from "lucide-react"
import Header from "@/components/header"
import { supabase } from "@/lib/supabaseClient" // Supabase 클라이언트 임포트

// 블로그 카테고리 데이터 (Supabase 데이터 기반으로 업데이트 필요)
const categories = [
  { id: "all", name: "전체 글", count: 0 }, // 초기 카운트 0
  { id: "ai-trend", name: "AI 트렌드", count: 0 },
  { id: "case-study", name: "성공 사례", count: 0 },
  { id: "tech", name: "기술 블로그", count: 0 },
  { id: "news", name: "뉴스", count: 0 },
]

// 인기 태그 데이터 (Supabase 데이터 기반으로 업데이트 필요)
const popularTags = [
  { id: "ai", name: "AI", count: 0 }, // 초기 카운트 0
  { id: "agent-boss", name: "에이전트 보스", count: 0 },
  { id: "romi", name: "Romi", count: 0 },
  { id: "business", name: "비즈니스", count: 0 },
  { id: "innovation", name: "혁신", count: 0 },
  { id: "future", name: "미래", count: 0 },
  { id: "technology", name: "기술", count: 0 },
]

// 블로그 포스트 데이터 타입 정의
interface BlogPost {
  id: string; // Supabase UUID는 string
  created_at: string;
  title: string;
  content: string; // 상세 페이지에서 사용될 수 있음
  category: string | null;
  // Supabase 스키마에 현재 없는 필드들은 임시로 추가
  summary: string;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
  date: string; // 임시 date 필드 추가
}


export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // Supabase에서 가져올 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase.from('posts').select('*');

      // 카테고리 필터링
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }

      // 검색어 필터링 (Supabase에서 Full-Text Search를 설정하지 않았다면 클라이언트에서 필터링)
      // 여기서는 일단 클라이언트에서 필터링하는 것으로 구현
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setBlogPosts([]);
      } else {
        // Supabase에서 가져온 데이터에 summary, image, author, readTime, tags 필드가 없으므로 임시로 추가하거나 스키마 업데이트 필요
        // 현재는 title, content, category, created_at만 사용 가능
        const postsWithDefaults = data.map(post => ({
            ...post,
            summary: post.content ? post.content.substring(0, 150) + '...' : '내용 없음', // content의 일부를 summary로 사용
            image: "/placeholder.svg", // 임시 이미지
            author: "작성자 미상", // 임시 작성자
            readTime: "N분", // 임시 읽는 시간
            tags: post.category ? [post.category] : [], // 카테고리를 태그로 사용
            date: new Date(post.created_at).toLocaleDateString('ko-KR'), // created_at을 날짜 형식으로 변환
        }));
        setBlogPosts(postsWithDefaults as BlogPost[]); // 타입 단언
      }
      setLoading(false);
    };

    fetchPosts();
  }, [activeCategory]); // activeCategory가 변경될 때마다 데이터 다시 가져오기

  // 검색어에 따라 클라이언트에서 필터링
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()); // summary 필드 사용

    return matchesSearch;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 블로그 헤더 */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Alon <span className="text-green-400">블로그</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 mb-8"
            >
              AI 혁신과 에이전트 보스 시스템에 관한 최신 인사이트와 트렌드를 확인하세요
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
                placeholder="블로그 검색..."
                className="pl-10 py-6 bg-white/10 border-none text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 블로그 콘텐츠 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8"> {/* lg:col-span-4 제거 */}
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">카테고리</h3>
                  <ul className="space-y-2">
                    {/* 카테고리 카운트는 Supabase 데이터 기반으로 동적 계산 필요 */}
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                            activeCategory === category.id ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                          }`}
                        >
                          <span>{category.name}</span>
                          {/* 동적 카운트 표시 */}
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {category.id === 'all'
                              ? blogPosts.length
                              : blogPosts.filter(post => post.category === category.id).length
                            }
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">인기 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* 태그 목록 및 카운트는 Supabase 데이터 기반으로 동적 생성/계산 필요 */}
                    {popularTags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.id}`} // 실제 태그 페이지 라우팅 필요
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.name}
                        {/* 동적 카운트 표시 */}
                        <span className="ml-1 text-xs text-gray-500">({tag.count})</span> {/* 현재는 임시 카운트 */}
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
                  {activeCategory === "all" ? "최신 글" : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <Link href="/blog/write" className="inline-flex items-center text-green-600 hover:text-green-700">
                  <span className="mr-1">글쓰기</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* 로딩 상태 표시 */}
              {loading && (
                <div className="text-center text-gray-500 py-12">
                  <p>게시글을 불러오는 중입니다...</p>
                </div>
              )}

              {/* 블로그 포스트 그리드 */}
              {!loading && (
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
                        {/* 이미지 및 카테고리 태그 */}
                        <Link href={`/blog/${post.id}`} className="block overflow-hidden">
                          <div className="relative h-48 w-full overflow-hidden">
                            {/* Supabase 스키마에 image 필드가 없으므로 임시 이미지 사용 */}
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform hover:scale-105 duration-500"
                            />
                            {post.category && (
                              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                {categories.find((c) => c.id === post.category)?.name || post.category}
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* 포스트 메타 정보 */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{post.date}</span> {/* created_at 사용 */}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{post.author}</span> {/* 임시 작성자 */}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readTime}</span> {/* 임시 읽는 시간 */}
                            </div>
                          </div>

                          {/* 제목 */}
                          <Link href={`/blog/${post.id}`} className="block mb-3">
                            <h3 className="text-xl font-bold hover:text-green-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>

                          {/* 요약 */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.summary}</p> {/* summary 필드 사용 */}

                          {/* 태그 */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {/* 태그는 현재 카테고리만 사용 */}
                            {post.tags.map((tag) => (
                              <Link
                                key={tag}
                                href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`} // 실제 태그 페이지 라우팅 필요
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
                      <p>게시글이 없습니다.</p>
                    </div>
                  )}
                </div>
              )}


              {/* 페이지네이션 (Supabase 데이터 기반으로 동적 처리 필요) */}
              {/* 현재는 정적 데이터 기반이므로 임시로 유지 */}
              {!loading && filteredPosts.length > 0 && (
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
                      className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      3
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
