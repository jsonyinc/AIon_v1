"use client"

import { useState, useEffect } from "react" // useEffect 추가
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Tag, Clock, Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react"
import Header from "@/components/header"
import { supabase } from "@/lib/supabaseClient" // Supabase 클라이언트 임포트
import { useRouter } from 'next/navigation'; // useRouter 임포트

// 블로그 포스트 데이터 타입 정의 (Supabase 스키마 및 임시 필드 포함)
interface BlogPost {
  id: string; // Supabase UUID는 string
  created_at: string;
  title: string;
  content: string; // 상세 페이지에서 사용될 수 있음
  category: string | null;
  // Supabase 스키마에 현재 없는 필드들은 임시로 추가
  summary?: string; // summary는 목록에서만 사용될 수 있으므로 선택적 필드로 변경
  image: string; // 임시 이미지 URL 또는 Supabase Storage URL
  author: string; // 임시 작성자 이름 또는 Supabase Users 테이블 조인
  authorImage: string; // 임시 작성자 이미지 URL
  authorRole: string; // 임시 작성자 역할
  readTime: string; // 임시 읽는 시간
  tags: string[]; // 임시 태그 목록 또는 별도 태그 테이블 조인
  likes: number; // 임시 좋아요 수 또는 별도 좋아요 테이블 조인
  comments: number; // 임시 댓글 수 또는 별도 댓글 테이블 조인
  date: string; // created_at을 변환한 날짜 문자열
}

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

// 댓글 데이터 (Supabase 연동 필요)
const comments = [
  {
    id: 1,
    author: "박지민",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2025-05-12",
    content:
      "정말 유익한 글이네요. 저희 회사도 에이전트 보스 시스템 도입을 고려하고 있는데, 실제 사례를 보니 더욱 확신이 생깁니다.",
    likes: 15,
    replies: [
      {
        id: 2,
        author: "김영수",
        authorImage: "/placeholder.svg?height=40&width=40",
        date: "2025-05-12",
        content: "박지민님, 댓글 감사합니다! 도입 과정에서 궁금한 점이 있으시면 언제든 문의해주세요.",
        likes: 3,
      },
    ],
  },
  {
    id: 3,
    author: "이수진",
    authorImage: "/placeholder.svg?height=40&width=40",
    date: "2025-05-11",
    content: "37%라는 수치가 정말 놀랍네요. 구체적인 측정 방법도 알 수 있을까요?",
    likes: 8,
    replies: [],
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter(); // useRouter 훅 사용
  const [post, setPost] = useState<BlogPost | null>(null); // 게시물 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isLiked, setIsLiked] = useState(false) // 좋아요 상태 (임시)
  const [commentText, setCommentText] = useState("") // 댓글 입력 상태 (임시)
  const [showLoginModal, setShowLoginModal] = useState(false) // 로그인 모달 상태 (임시)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      // URL 파라미터에서 게시물 ID 가져오기
      const postId = params.id;

      if (!postId) {
        // ID가 없으면 블로그 목록 페이지로 리다이렉트 또는 오류 처리
        router.push('/blog');
        return;
      }

      // Supabase에서 해당 ID의 게시물 가져오기
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single(); // 단일 결과만 가져오기

      if (error) {
        console.error('Error fetching post:', error);
        setPost(null); // 오류 발생 시 게시물 없음으로 설정
        // 필요시 오류 페이지 표시 또는 리다이렉트
      } else if (data) {
         // Supabase에서 가져온 데이터에 없는 필드들을 임시로 추가
        const postWithDefaults: BlogPost = {
            ...data,
            image: "/placeholder.svg?height=600&width=1200", // 임시 이미지
            author: "작성자 미상", // 임시 작성자
            authorImage: "/placeholder.svg?height=100&width=100", // 임시 작성자 이미지
            authorRole: "역할 미상", // 임시 작성자 역할
            readTime: "N분", // 임시 읽는 시간
            tags: data.category ? [data.category] : [], // 카테고리를 태그로 사용
            likes: 0, // 임시 좋아요 수
            comments: 0, // 임시 댓글 수
            date: new Date(data.created_at).toLocaleDateString('ko-KR'), // created_at을 날짜 형식으로 변환
        };
        setPost(postWithDefaults);
      } else {
        // 데이터는 없지만 오류도 없는 경우 (게시물을 찾지 못한 경우)
        setPost(null);
        // 필요시 404 페이지 표시 또는 리다이렉트
        console.warn(`Post with ID ${postId} not found.`);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.id, router]); // ID 또는 router 객체가 변경될 때마다 데이터 다시 가져오기

  // 로딩 중이거나 게시물을 찾지 못한 경우
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p>게시글을 불러오는 중입니다...</p>
        </div>
    );
  }

  if (!post) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p>게시글을 찾을 수 없습니다.</p>
        </div>
      );
  }


  const handleLike = () => {
    // 로그인 상태 확인 (예시)
    const isLoggedIn = false

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setIsLiked(!isLiked)
  }

  const handleComment = () => {
    // 로그인 상태 확인 (예시)
    const isLoggedIn = false

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (commentText.trim()) {
      // 댓글 추가 로직 (Supabase 연동 필요)
      alert("댓글이 등록되었습니다.") // 임시 알림
      setCommentText("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 블로그 포스트 헤더 */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/blog" className="text-green-400 hover:text-green-300 inline-flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                블로그로 돌아가기
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {post.category && (
                <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                  {categories.find((c) => c.id === post.category)?.name || post.category}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback>{post.author ? post.author[0] : '?'}</AvatarFallback> {/* author가 null일 경우 처리 */}
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-gray-300">{post.authorRole}</div>
                </div>
                <div className="ml-auto flex items-center text-sm text-gray-300 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime} 소요</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 블로그 포스트 콘텐츠 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                {/* 목차 (post.content 기반으로 동적 생성 필요) */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">목차</h3>
                  <ul className="space-y-2 text-sm">
                     {/* post.content를 파싱하여 목차 생성 로직 필요 */}
                    <li>
                      <a href="#content" className="text-gray-700 hover:text-green-600 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        본문 내용
                      </a>
                    </li>
                     {/* 예시 목차 항목 (실제 목차 생성 로직으로 대체 필요) */}
                    {/* <li>
                      <a href="#intro" className="text-gray-700 hover:text-green-600 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        에이전트 보스 시스템의 혁신적 접근
                      </a>
                    </li> */}
                  </ul>
                </div>

                {/* 태그 (post.tags 기반) */}
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`} // 실제 태그 페이지 라우팅 필요
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}


                {/* 공유하기 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">공유하기</h3>
                  <div className="flex space-x-4">
                    {/* 실제 공유 기능 구현 필요 */}
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.355 3.03C17.677 1.35 15.118.348 12.432.348 5.865.35.352 5.863.352 12.43c0 2.126.553 4.206 1.598 6.045l-1.699 6.2 6.34-1.664c1.775.97 3.78 1.474 5.823 1.475h.006c6.565 0 11.88-5.514 11.88-12.082 0-2.686-1.04-5.205-2.945-7.373zm-8.923 18.546h-.005c-1.77 0-3.507-.477-5.021-1.378l-.356-.214-3.722.976.992-3.618-.23-.368c-.99-1.576-1.516-3.393-1.516-5.26 0-5.445 4.435-9.88 9.884-9.88 2.64 0 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.993-.003 5.446-4.437 9.881-9.885 9.881z" />
                        <path d="M18.042 14.885c-.298-.15-1.765-.87-2.04-.968-.274-.1-.475-.148-.676.15-.2.296-.777.967-.953 1.166-.176.2-.35.223-.65.075-.298-.15-1.261-.465-2.403-1.485-.888-.79-1.487-1.77-1.663-2.068-.176-.297-.02-.458.132-.606.136-.133.3-.347.45-.52.15-.174.2-.298.3-.497.1-.198.05-.372-.025-.52-.075-.15-.676-1.63-.927-2.23-.242-.58-.49-.5-.675-.51-.176-.01-.376-.012-.576-.012-.2 0-.523.075-.797.372-.274.297-1.045 1.02-1.045 2.5s1.07 2.9 1.22 3.1c.15.198 2.11 3.2 5.113 4.485.714.31 1.27.496 1.705.635.717.227 1.37.195 1.883.118.574-.085 1.765-.722 2.015-1.42.25-.7.25-1.3.175-1.425-.075-.127-.275-.198-.574-.347z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 저자 정보 */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={post.authorImage || "/placeholder.svg"} alt={post.author} />
                    <AvatarFallback>{post.author ? post.author[0] : '?'}</AvatarFallback> {/* author가 null일 경우 처리 */}
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{post.author}</h3>
                    <p className="text-gray-500 mb-2">{post.authorRole}</p>
                    <p className="text-sm text-gray-600">
                      Alon Inc.의 AI 솔루션 전문가로, 에이전트 보스 시스템 개발에 참여하고 있습니다. 인간-AI 협업 모델에
                      관한 다수의 연구 논문을 발표했습니다.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">로그인이 필요합니다</h3>
            <p className="text-gray-600 mb-6">
              이 기능을 사용하려면 로그인이 필요합니다. 소셜 계정으로 간편하게 로그인하세요.
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-yellow-800 py-2 px-4 rounded">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.111.466.497.845.895.481.091-.08 1.419-1.341 2.086-1.979.468.073.95.111 1.44.111 4.97 0 9-3.185 9-7.115C21 6.185 16.97 3 12 3" />
                </svg>
                카카오톡으로 로그인
              </button>

              <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.543 8.969h-1.528V7.442h-1.528v1.527H15.01v1.528h1.527v1.527h1.528V9.497h1.527V8.969zM12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm.968 15.276h-1.936v-4.538H8.595v-1.936h3.373v-1.528h1.936v1.528h1.528v1.936h-1.528v4.538z" />
                </svg>
                네이버로 로그인
              </button>

              <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                페이스북으로 로그인
              </button>

              <button className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.996 9.996 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c8.396 0 10-8 10-12 0-.553-.045-1.092-.13-1.618h-9.325z"
                    fill="#4285F4"
                  />
                  <path
                    d="M2 12c0-5.523 4.477-10 10-10 2.747 0 5.21 1.108 7.032 2.904l-2.814 2.814A5.985 5.985 0 0 0 12 6.032c-3.332 0-6.033 2.701-6.033 6.032s2.701 6.032 6.033 6.032c2.798 0 4.733-1.657 5.445-3.972h-5.445v-3.821H22c.085.526.13 1.065.13 1.618 0 4-1.604 12-10 12-5.523 0-10-4.477-10-10z"
                    fill="#34A853"
                  />
                  <path
                    d="M12 16.936c-2.798 0-4.733-1.657-5.445-3.972H2c1.105 4.006 4.752 6.932 10 6.932 5.523 0 10-4.477 10-10 0-.553-.045-1.092-.13-1.618h-9.325v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.996 9.996 0 0 0 12 2c-5.523 0-10 4.477-10 10h4.555c.712-2.315 2.647-3.972 5.445-3.972z"
                    fill="#EA4335"
                  />
                </svg>
                구글로 로그인
              </button>

              <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub로 로그인
              </button>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
                나중에 하기
              </button>
              <Link href="/login" className="text-green-600 hover:text-green-700">
                이메일로 로그인
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
