"use client"

import { useState, useEffect } from "react" // useEffect 임포트 추가
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Tag, ArrowRight, Clock } from "lucide-react"
import BlogHeader from "@/components/BlogHeader"
import { useParams } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient"; // Supabase 클라이언트 임포트

// 타입 정의
interface Author {
  id: string;
  name: string;
  image_url: string | null;
  role?: string | null; // 역할은 선택적일 수 있음
}

interface Category {
  id: string; // Supabase에서는 보통 UUID
  name: string;
  slug: string;
  posts_count?: number; // 게시물 수 (집계 결과)
}

interface TagType { // Tag는 HTML 태그와 충돌하므로 TagType으로 변경
  id: string;
  name: string;
  slug: string;
  posts_count?: number; // 게시물 수 (집계 결과)
}

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  summary: string | null;
  image_url: string | null;
  published_at: string | null;
  read_time: string | null;
  author: Author | null;
  category: Category | null;
  tags: TagType[];
}

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const categorySlug = params.category as string; // URL에서 카테고리 slug 가져오기

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularTags, setPopularTags] = useState<TagType[]>([]); // 인기 태그 상태
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. 모든 카테고리 가져오기 (게시물 수 포함)
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            slug,
            posts_count:posts(count)
          `)
          .order('name', { ascending: true });

        if (categoriesError) throw categoriesError;
        
        const fetchedCategories = categoriesData?.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            posts_count: (c.posts_count as any[] | null)?.[0]?.count || 0,
        })) || [];
        setCategories(fetchedCategories);

        // 2. 현재 카테고리 정보 가져오기
        const currentCatData = fetchedCategories.find(c => c.slug === categorySlug);
        if (currentCatData) {
            setCurrentCategory(currentCatData);
        } else if (categorySlug) {
            // slug는 있지만 카테고리 목록에 없는 경우, 직접 DB에서 조회 시도
            const { data: singleCategoryData, error: singleCategoryError } = await supabase
                .from('categories')
                .select(`id, name, slug, posts_count:posts(count)`)
                .eq('slug', categorySlug)
                .single();
            if (singleCategoryError && singleCategoryError.code !== 'PGRST116') { // PGRST116: no rows found
                 console.warn(`Error fetching category by slug ${categorySlug}:`, singleCategoryError);
            } else if (singleCategoryData) {
                setCurrentCategory({
                    id: singleCategoryData.id,
                    name: singleCategoryData.name,
                    slug: singleCategoryData.slug,
                    posts_count: (singleCategoryData.posts_count as any[] | null)?.[0]?.count || 0,
                });
            } else {
                 setError(`카테고리 '${categorySlug}'를 찾을 수 없습니다.`);
                 setLoading(false);
                 return;
            }
        } else {
            // categorySlug가 없는 경우 (예: /blog/category/all 또는 잘못된 접근)
            // 이 페이지는 특정 카테고리를 가정하므로, 오류 처리 또는 리다이렉션 필요
            setError("유효한 카테고리가 지정되지 않았습니다.");
            setLoading(false);
            return;
        }
        
        // 3. 인기 태그 가져오기 (모든 태그와 각 태그별 게시물 수)
        // 실제 "인기" 로직은 추후 구현 (예: 게시물 수가 많은 순으로 정렬 후 상위 N개)
        const { data: tagsData, error: tagsError } = await supabase
          .from('tags')
          .select(`
            id,
            name,
            slug,
            posts_count:post_tags(count)
          `)
          .order('name', { ascending: true }); //일단 이름순 정렬

        if (tagsError) throw tagsError;
        setPopularTags(tagsData?.map(t => ({
            id: t.id,
            name: t.name,
            slug: t.slug,
            posts_count: (t.posts_count as any[] | null)?.[0]?.count || 0,
        })) || []);

        // 4. 현재 카테고리에 속한 블로그 게시물 가져오기
        if (currentCatData) { // currentCategory가 설정된 후에 게시물 가져오기
          const { data: postsData, error: postsError } = await supabase
            .from('posts')
            .select(`
              id,
              created_at,
              title,
              summary,
              image_url,
              published_at,
              read_time,
              author:author_id ( id, name, image_url, role ),
              category:category_id ( id, name, slug ),
              tags:post_tags ( tag:tag_id ( id, name, slug ) )
            `)
            .eq('category_id', currentCatData.id) // 현재 카테고리 ID로 필터링
            .order('published_at', { ascending: false, nullsFirst: false })
            .order('created_at', { ascending: false });

          if (postsError) throw postsError;

          const formattedPosts: BlogPost[] = postsData?.map((post: any) => ({
            id: post.id,
            created_at: post.created_at,
            title: post.title,
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
            tags: post.tags ? post.tags.map((tagRelation: any) => tagRelation.tag) : [],
          })) || [];
          setBlogPosts(formattedPosts);
        }

      } catch (err: any) {
        console.error("Error fetching category page data:", err);
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) { // categorySlug가 있을 때만 데이터 가져오기 실행
        fetchPageData();
    } else {
        setError("카테고리가 지정되지 않았습니다.");
        setLoading(false);
    }
  }, [categorySlug]); // categorySlug가 변경될 때마다 데이터 다시 가져오기


  // 검색어에 따라 게시물 필터링 (클라이언트 측 필터링)
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

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

    }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>오류가 발생했습니다: {error}</p>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>카테고리를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

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
              {currentCategory?.name || "카테고리"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300 mb-8"
            >
              {"이 카테고리의 최신 글과 인사이트를 확인하세요."}
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
                placeholder={`${currentCategory?.name || "카테고리"} 검색...`}
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
                    {/* "전체 글" 카테고리 링크 추가 */}
                    <li>
                      <Link
                        href="/blog"
                        className={`px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                          !categorySlug || categorySlug === "all" ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <span>전체 글</span>
                        {/* 전체 글 개수는 모든 카테고리 게시물 수의 합 또는 별도 로직 필요 */}
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/blog/category/${category.slug}`}
                          className={`px-3 py-2 rounded-md flex justify-between items-center transition-colors ${
                            categorySlug === category.slug ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
                          }`}
                        >
                          <span>{category.name}</span>
                          {category.posts_count !== undefined && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{category.posts_count}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {popularTags.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">인기 태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog/tag/${tag.slug}`}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                          {tag.posts_count !== undefined && (
                            <span className="ml-1 text-xs text-gray-500">({tag.posts_count})</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

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
                            src={post.image_url || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                            priority={true}
                          />
                          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            {post.category?.name}
                          </div>
                        </div>
                      </Link>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('ko-KR') : new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author?.name || "익명"}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.read_time || "N분"}</span>
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
                              key={tag.id}
                              href={`/blog/tag/${tag.slug}`}
                              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                            >
                              #{tag.name}
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
