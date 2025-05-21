"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Tag, Clock, Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import Header from "@/components/header"; // Header는 Layout으로 옮기는 것이 더 일반적일 수 있습니다.
import { useRouter } from 'next/navigation';
// BlogPost 인터페이스는 서버 컴포넌트와 공유하거나, 여기서 다시 정의/임포트 필요
// 우선 여기서 간단히 정의하고, 필요시 공유 파일로 이동 고려

interface Author {
  id: string;
  name: string;
  image_url: string | null;
  role: string | null;
  bio?: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface TagType {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  summary: string | null;
  image_url: string | null;
  published_at: string | null;
  read_time: string | null;
  author: Author | null;
  category: Category | null;
  tags: TagType[];
  likes_count: number;
  comments_count: number;
}

interface BlogPostClientProps {
  initialPost: BlogPost | null;
  postId: string; // postId는 여전히 필요할 수 있음 (예: 클라이언트 측 추가 데이터 요청)
}

export default function BlogPostClient({ initialPost, postId }: BlogPostClientProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  // 초기 데이터가 서버에서 로드되므로, 클라이언트 측 로딩은 일반적으로 false로 시작하거나,
  // 클라이언트에서 추가 데이터를 로드할 때만 true로 설정합니다.
  const [loading, setLoading] = useState(!initialPost); // initialPost가 없으면 로딩 상태로 시작

  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 클라이언트 측에서 postId를 기반으로 추가 데이터를 가져오거나 상태를 업데이트해야 하는 경우
  useEffect(() => {
    if (!initialPost && postId) {
      // 이 부분은 서버에서 initialPost를 가져오지 못한 경우의 폴백(fallback) 로직입니다.
      // 실제로는 서버 컴포넌트에서 notFound() 등을 사용하여 처리하는 것이 더 일반적입니다.
      // 여기서는 예시로 남겨두지만, 서버 컴포넌트에서 데이터 로딩 실패 시 적절히 처리한다면 필요 없을 수 있습니다.
      const fetchFallbackData = async () => {
        setLoading(true);
        // const fetchedData = await someClientSideFetchFunction(postId);
        // setPost(fetchedData);
        // console.warn(`Fetching fallback data for post ${postId} on client`);
        // For now, if initialPost is null, we assume it means not found from server.
        setLoading(false); // Fallback fetch logic not implemented, just stop loading.
      };
      fetchFallbackData();
    } else if (initialPost) {
        setPost(initialPost); // initialPost가 변경되면 post 상태 업데이트
        setLoading(false);
    }
  }, [postId, initialPost]);

  // URL 해시 기반 스크롤 로직
  useEffect(() => {
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
  }, []);

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
    const isLoggedIn = false; // 실제 로그인 상태 확인 로직 필요
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    const isLoggedIn = false; // 실제 로그인 상태 확인 로직 필요
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (commentText.trim()) {
      alert("댓글이 등록되었습니다."); // 실제 댓글 등록 로직 필요
      setCommentText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Header는 Layout으로 옮기는 것을 고려 */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/blog" className="text-green-400 hover:text-green-300 inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                블로그로 돌아가기
              </Link>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {post.category && (
                <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                  {post.category.name}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center mb-6">
                {post.author && (
                  <>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={post.author.image_url || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name ? post.author.name[0] : '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-sm text-gray-300">{post.author.role}</div>
                    </div>
                  </>
                )}
                <div className="ml-auto flex items-center text-sm text-gray-300 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('ko-KR') : new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.read_time || "N분"} 소요</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">목차</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#content" className="text-gray-700 hover:text-green-600 flex items-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        본문 내용
                      </a>
                    </li>
                  </ul>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog/tag/${tag.slug}`}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">공유하기</h3>
                  <div className="flex space-x-4">
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></button>
                    <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></button>
                    <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.355 3.03C17.677 1.35 15.118.348 12.432.348 5.865.35.352 5.863.352 12.43c0 2.126.553 4.206 1.598 6.045l-1.699 6.2 6.34-1.664c1.775.97 3.78 1.474 5.823 1.475h.006c6.565 0 11.88-5.514 11.88-12.082 0-2.686-1.04-5.205-2.945-7.373zm-8.923 18.546h-.005c-1.77 0-3.507-.477-5.021-1.378l-.356-.214-3.722.976.992-3.618-.23-.368c-.99-1.576-1.516-3.393-1.516-5.26 0-5.445 4.435-9.88 9.884-9.88 2.64 0 5.122 1.03 6.988 2.898 1.866 1.869 2.893 4.352 2.892 6.993-.003 5.446-4.437 9.881-9.885 9.881z" /><path d="M18.042 14.885c-.298-.15-1.765-.87-2.04-.968-.274-.1-.475-.148-.676.15-.2.296-.777.967-.953 1.166-.176.2-.35.223-.65.075-.298-.15-1.261-.465-2.403-1.485-.888-.79-1.487-1.77-1.663-2.068-.176-.297-.02-.458.132-.606.136-.133.3-.347.45-.52.15-.174.2-.298.3-.497.1-.198.05-.372-.025-.52-.075-.15-.676-1.63-.927-2.23-.242-.58-.49-.5-.675-.51-.176-.01-.376-.012-.576-.012-.2 0-.523.075-.797.372-.274.297-1.045 1.02-1.045 2.5s1.07 2.9 1.22 3.1c.15.198 2.11 3.2 5.113 4.485.714.31 1.27.496 1.705.635.717.227 1.37.195 1.883.118.574-.085 1.765-.722 2.015-1.42.25-.7.25-1.3.175-1.425-.075-.127-.275-.198-.574-.347z" /></svg></button>
                    <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></button>
                  </div>
                </div>
              </div>
              {post.author && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={post.author.image_url || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name ? post.author.name[0] : '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{post.author.name}</h3>
                      <p className="text-gray-500 mb-2">{post.author.role}</p>
                      {post.author.bio && (
                         <p className="text-sm text-gray-600">
                           {post.author.bio}
                         </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Main content: Blog post body */}
            <div className="lg:col-span-3 order-1 lg:order-2 bg-white rounded-lg shadow-sm p-8 md:p-12">
                <div id="content" className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                {/* 댓글 및 좋아요 섹션 */}
                <div className="mt-12 border-t pt-8">
                    <h3 className="text-2xl font-bold mb-6">소통 공간</h3>
                    <div className="flex items-center space-x-6 mb-8">
                        <button onClick={handleLike} className={`flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors ${isLiked ? "text-red-500" : ""}`}>
                            <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500" : ""}`} />
                            <span>좋아요 ({post.likes_count + (isLiked ? 1 : 0)})</span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <MessageSquare className="h-6 w-6" />
                            <span>댓글 ({post.comments_count})</span>
                        </div>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                            <Share2 className="h-6 w-6" />
                            <span>공유하기</span>
                        </button>
                    </div>

                    {/* 댓글 입력 폼 */}
                    <div className="mb-8">
                        <Textarea
                            placeholder="따뜻한 댓글을 남겨주세요..."
                            className="w-full min-h-[100px] mb-2"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button onClick={handleComment} className="bg-green-600 hover:bg-green-700">댓글 등록</Button>
                    </div>
                    {/* 댓글 목록 (실제 댓글 데이터 연동 필요) */}
                    {/* 
                    <div className="space-y-6">
                        {[...Array(post.comments_count > 3 ? 3 : post.comments_count)].map((_, i) => ( // 예시로 3개 또는 실제 댓글 수만큼
                            <div key={i} className="flex space-x-3">
                                <Avatar>
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=commenter${i}`} />
                                    <AvatarFallback>C{i+1}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">익명 댓글러 {i+1}</div>
                                    <p className="text-sm text-gray-500 mb-1">2025년 5월 {20-i}일</p>
                                    <p className="text-gray-700">정말 유익한 글입니다! 많은 도움이 되었습니다.</p>
                                </div>
                            </div>
                        ))}
                        {post.comments_count > 3 && (
                            <Button variant="outline" className="w-full">댓글 더 보기</Button>
                        )}
                    </div>
                    */}
                </div>
            </div>
          </div>
        </div>
      </section>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">로그인이 필요합니다</h3>
            <p className="text-gray-600 mb-6">이 기능을 사용하려면 로그인이 필요합니다. 소셜 계정으로 간편하게 로그인하세요.</p>
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-yellow-800 py-2 px-4 rounded"><svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.111.466.497.845.895.481.091-.08 1.419-1.341 2.086-1.979.468.073.95.111 1.44.111 4.97 0 9-3.185 9-7.115C21 6.185 16.97 3 12 3" /></svg>카카오톡으로 로그인</button>
              <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"><svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M19.543 8.969h-1.528V7.442h-1.528v1.527H15.01v1.528h1.527v1.527h1.528V9.497h1.527V8.969zM12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm.968 15.276h-1.936v-4.538H8.595v-1.936h3.373v-1.528h1.936v1.528h1.528v1.936h-1.528v4.538z" /></svg>네이버로 로그인</button>
              <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"><svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>페이스북으로 로그인</button>
              <button className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded"><svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.996 9.996 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c8.396 0 10-8 10-12 0-.553-.045-1.092-.13-1.618h-9.325z" fill="#4285F4" /><path d="M2 12c0-5.523 4.477-10 10-10 2.747 0 5.21 1.108 7.032 2.904l-2.814 2.814A5.985 5.985 0 0 0 12 6.032c-3.332 0-6.033 2.701-6.033 6.032s2.701 6.032 6.033 6.032c2.798 0 4.733-1.657 5.445-3.972h-5.445v-3.821H22c.085.526.13 1.065.13 1.618 0 4-1.604 12-10 12-5.523 0-10-4.477-10-10z" fill="#34A853" /><path d="M12 16.936c-2.798 0-4.733-1.657-5.445-3.972H2c1.105 4.006 4.752 6.932 10 6.932 5.523 0 10-4.477 10-10 0-.553-.045-1.092-.13-1.618h-9.325v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972z" fill="#FBBC05" /><path d="M12 6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.996 9.996 0 0 0 12 2c-5.523 0-10 4.477-10 10h4.555c.712-2.315 2.647-3.972 5.445-3.972z" fill="#EA4335" /></svg>구글로 로그인</button>
              <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"><svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>GitHub로 로그인</button>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">나중에 하기</button>
              <Link href="/login" className="text-green-600 hover:text-green-700">이메일로 로그인</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
