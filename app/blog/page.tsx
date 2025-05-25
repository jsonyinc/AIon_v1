"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Tag, ArrowRight, Clock } from "lucide-react";
import BlogHeader from "@/components/BlogHeader";
import { supabase } from "@/lib/supabaseClient";

// 블로그 카테고리 데이터 (Supabase 데이터 기반으로 업데이트 필요)
// const categories = [
//   { id: "all", name: "전체 글", count: 0 }, // 초기 카운트 0
//   { id: "ai-trend", name: "AI 트렌드", count: 0 },
//   { id: "case-study", name: "성공 사례", count: 0 },
//   { id: "tech", name: "기술 블로그", count: 0 },
//   { id: "news", name: "뉴스", count: 0 },
// ];

// 인기 태그 데이터 (Supabase 데이터 기반으로 업데이트 필요)
// const popularTags = [
//   { id: "ai", name: "AI", count: 0 }, // 초기 카운트 0
//   { id: "agent-boss", name: "에이전트 보스", count: 0 },
//   { id: "romi", name: "Romi", count: 0 },
//   { id: "business", name: "비즈니스", count: 0 },
//   { id: "innovation", name: "혁신", count: 0 },
//   { id: "future", name: "미래", count: 0 },
//   { id: "technology", name: "기술", count: 0 },
// ];

// 블로그 포스트 데이터 타입 정의 (Supabase 스키마에 맞게 수정)
interface BlogPost {
  id: string; // Supabase UUID는 string
  created_at: string;
  title: string;
  content: string; // 상세 페이지에서 사용될 수 있음
  summary: string | null; // summary 필드 추가
  image_url: string | null; // image_url 필드 추가
  published_at: string | null; // published_at 필드 추가
  read_time: string | null; // read_time 필드 추가
  author: { // authors 테이블 조인 결과
    id: string;
    name: string;
    image_url: string | null;
    role: string | null;
  } | null;
  category: { // categories 테이블 조인 결과
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: { // post_tags 및 tags 테이블 조인 결과
    id: string;
    name: string;
    slug: string;
  }[];
  likes_count: number; // 좋아요 수 (likes 테이블 카운트)
  comments_count: number; // 댓글 수 (comments 테이블 카운트)
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // Supabase에서 가져올 데이터 상태
  const [categoriesData, setCategoriesData] = useState<{ id: string; name: string; slug: string; count: number }[]>([]); // 카테고리 데이터 상태
  const [popularTagsData, setPopularTagsData] = useState<{ id: string; name: string; slug: string; count: number }[]>([]); // 인기 태그 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. 블로그 게시물 데이터 가져오기 (JOIN 활용)
      let postsQuery = supabase
        .from('posts')
        .select(`
          id,
          created_at,
          title,
          content,
          summary,
          image_url,
          published_at,
          read_time,
          author:author_id ( id, name, image_url, role ),
          category:category_id ( id, name, slug ),
          tags:post_tags ( tag:tag_id ( id, name, slug ) ),
          likes_count:likes(count),
          comments_count:comments(count)
        `);

      // 카테고리 필터링
      if (activeCategory !== 'all') {
        // category_id를 기준으로 필터링
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', activeCategory)
          .single();

        if (categoryError || !categoryData) {
          console.error('Error fetching category ID:', categoryError);
          // 특정 카테고리를 찾지 못한 경우 게시글 없음 처리
          setBlogPosts([]);
          setLoading(false);
          return;
        }
        postsQuery = postsQuery.eq('category_id', categoryData.id);
      }

      // published_at 기준으로 정렬 (최신 글 먼저)
      postsQuery = postsQuery.order('published_at', { ascending: false });

      const { data: postsData, error: postsError } = await postsQuery;

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        setBlogPosts([]);
      } else {
        // 가져온 데이터 구조를 BlogPost 타입에 맞게 변환 및 타입 단언
        const formattedPosts: BlogPost[] = postsData.map((post: any) => ({ // post에 any 타입 단언
          id: post.id,
          created_at: post.created_at,
          title: post.title,
          content: post.content,
          summary: post.summary,
          image_url: post.image_url,
          published_at: post.published_at,
          read_time: post.read_time,
          author: post.author ? {
            id: post.author.id,
            name: post.author.name,
            image_url: post.author.image_url,
            role: post.author.role,
          } : null,
          category: post.category ? {
            id: post.category.id,
            name: post.category.name,
            slug: post.category.slug,
          } : null,
          tags: post.tags.map((tagRelation: any) => ({ // post_tags 조인 결과 처리
            id: tagRelation.tag.id,
            name: tagRelation.tag.name,
            slug: tagRelation.tag.slug,
          })),
          likes_count: post.likes_count ? post.likes_count[0].count : 0, // 좋아요 수 처리
          comments_count: post.comments_count ? post.comments_count[0].count : 0, // 댓글 수 처리
        })) as BlogPost[]; // formattedPosts 배열에 BlogPost[] 타입 단언
        setBlogPosts(formattedPosts);
      }

      // 2. 카테고리 데이터 가져오기 및 게시물 수 계산
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name, slug');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        setCategoriesData([]);
      } else {
        // 각 카테고리별 게시물 수 계산
        const categoriesWithCount = await Promise.all(categoriesData.map(async (category) => {
          const { count, error } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);

          if (error) {
            console.error(`Error counting posts for category ${category.name}:`, error);
            return { ...category, count: 0 };
          }
          return { ...category, count: count || 0 };
        }));

        // '전체 글' 카테고리 추가 및 전체 게시물 수 계산
        const { count: totalCount, error: totalCountError } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true });

        if (totalCountError) {
           console.error('Error counting total posts:', totalCountError);
        }

        const allCategory = { id: "all", name: "전체 글", slug: "all", count: totalCount || 0 };
        setCategoriesData([allCategory, ...categoriesWithCount]);
      }

       // 3. 인기 태그 데이터 가져오기 및 게시물 수 계산 (post_tags 테이블 활용)
       const { data: tagsData, error: tagsError } = await supabase
         .from('tags')
         .select('id, name, slug');

       if (tagsError) {
         console.error('Error fetching tags:', tagsError);
         setPopularTagsData([]);
       } else {
         // 각 태그별 게시물 수 계산 (post_tags 테이블 조인)
         const tagsWithCount = await Promise.all(tagsData.map(async (tag) => {
           const { count, error } = await supabase
             .from('post_tags')
             .select('*', { count: 'exact', head: true })
             .eq('tag_id', tag.id);

           if (error) {
             console.error(`Error counting posts for tag ${tag.name}:`, error);
             return { ...tag, count: 0 };
           }
           return { ...tag, count: count || 0 };
         }));
         // 필요에 따라 인기 태그 정렬 로직 추가 가능
         setPopularTagsData(tagsWithCount);
       }


      setLoading(false);
    };

    fetchData();

    // URL 해시 기반 스크롤 로직 (기존 유지)
    const handleHashScroll = () => {
        if (window.location.hash) {
            const elementId = window.location.hash.substring(1);
            const element = document.getElementById(elementId);
            if (element) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
        window.removeEventListener('hashchange', handleHashScroll);
    };

  }, [activeCategory]); // activeCategory가 변경될 때마다 데이터 다시 가져오기

  // 검색어에 따라 클라이언트에서 필터링 (Supabase에서 FTS 구현 시 서버에서 처리)
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase())) || // summary 필드 사용
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())); // content 필드도 검색 대상에 포함

    return matchesSearch;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">카테고리</h3>
                  <ul className="space-y-2">
                    {/* Supabase에서 가져온 카테고리 데이터 사용 */}
                    {categoriesData.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.slug)} // slug를 기준으로 활성 카테고리 설정
                          className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                            activeCategory === category.slug ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                          }`}
                        >
                          <span>{category.name}</span>
                          {/* 동적 카운트 표시 */}
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">인기 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Supabase에서 가져온 태그 데이터 사용 */}
                    {popularTagsData.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`} // slug를 사용하여 태그 페이지 라우팅
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.name}
                        {/* 동적 카운트 표시 */}
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
                  {activeCategory === "all" ? "최신 글" : categoriesData.find((c) => c.slug === activeCategory)?.name}
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
                            {/* Supabase에서 가져온 image_url 사용 */}
                            <Image
                              src={post.image_url || "/placeholder.svg"} // image_url 사용
                              alt={post.title}
                              fill
                              className="object-cover transition-transform hover:scale-105 duration-500"
                            />
                            {post.category && ( // category 객체가 존재하면 표시
                              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                {post.category.name} {/* 카테고리 이름 사용 */}
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* 포스트 메타 정보 */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {/* published_at 또는 created_at 사용 */}
                              <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('ko-KR') : new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{post.author ? post.author.name : "작성자 미상"}</span> {/* author 객체 사용 */}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.read_time || "N분"}</span> {/* read_time 필드 사용 */}
                            </div>
                          </div>

                          {/* 제목 */}
                          <Link href={`/blog/${post.id}`} className="block mb-3">
                            <h3 className="text-xl font-bold hover:text-green-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>

                          {/* 요약 */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{post.summary || post.content.substring(0, 150) + '...'}</p> {/* summary 또는 content 사용 */}

                          {/* 태그 */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {/* Supabase에서 가져온 태그 데이터 사용 */}
                            {post.tags.map((tag) => (
                              <Link
                                key={tag.id} // 태그 ID 사용
                                href={`/blog/tag/${tag.slug}`} // 태그 slug 사용
                                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                              >
                                #{tag.name} {/* 태그 이름 사용 */}
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
              {/* 현재는 데이터가 적으므로 임시로 유지, 추후 Supabase 페이지네이션 기능 연동 필요 */}
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
  );
}
