"use client"

import type React from "react"

import { useState, useEffect } from "react" // useEffect 임포트 추가
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ImagePlus, X, Save, Eye } from "lucide-react"
import BlogHeader from "@/components/BlogHeader" // BlogHeader 임포트
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from 'next/navigation';
import { useAuth } from "@/components/AuthProvider"; // useAuth 훅 임포트
import { useCategories } from "@/hooks/useCategories"; // useCategories 훅 임포트

// Category 타입은 useCategories 훅 또는 공유 타입 파일에서 가져올 수 있으므로 여기서는 제거
// const categories = [
//   { id: "ai-trend", name: "AI 트렌드" },
//   { id: "case-study", name: "성공 사례" },
//   { id: "tech", name: "기술 블로그" },
//   { id: "news", name: "뉴스" },
// ]

export default function BlogWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // 선택된 카테고리 ID (UUID)를 저장
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  
  const { user, loading: authLoading } = useAuth();
  const { categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
  
  const [showLoginModal, setShowLoginModal] = useState(false); // 이 상태는 이제 사용하지 않지만, 모달 JSX를 제거하기 전까지 유지
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 인증 로딩이 완료되었고 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션
    if (!authLoading && !user) {
      router.push('/login?redirect=/blog/write');
    }
    // 사용자가 로그인했다면 모달을 닫음 (만약 모달이 여전히 있다면)
    if (user) {
      setShowLoginModal(false);
    }
  }, [user, authLoading, router]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handlePublish = async () => {
    if (!user) {
      // 로그인 모달을 띄우는 대신 로그인 페이지로 리디렉션
      router.push('/login?redirect=/blog/write');
      return;
    }

    // 필수 필드 유효성 검사
    if (!title.trim() || !content.trim() || !category) {
      alert("제목, 내용, 카테고리는 필수 입력 항목입니다.");
      return;
    }

    // Supabase에 데이터 삽입
    try {
      setIsSubmitting(true);
      const postToInsert = {
        title: title.trim(),
        content: content.trim(),
        category_id: category, // category는 이제 UUID
        author_id: user.id,
        published_at: new Date().toISOString(), // published_at 값 추가
        // posts 테이블 스키마에 status 컬럼이 있다면 아래 주석 해제
        // status: 'published', 
      };

      console.log("Inserting post:", postToInsert); // 전송 직전 데이터 로깅

      const { data, error } = await supabase
        .from('posts')
        .insert([postToInsert])
        .select()
        .single(); // 단일 객체 반환 기대

      if (error) throw error;

      alert('게시글이 성공적으로 발행되었습니다!');
      router.push(`/blog/${data.id}`);
      
    } catch (error) {
      console.error('게시글 발행 상세 오류:', JSON.stringify(error, null, 2)); // 오류 객체 전체 로깅
      alert(`게시글 저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>{authLoading ? "인증 정보를 불러오는 중입니다..." : "카테고리를 불러오는 중입니다..."}</p>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>카테고리 로딩 오류: {categoriesError}</p>
        <Button onClick={() => refetchCategories()} className="ml-4">재시도</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
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

              <div className="flex space-x-2">
                <Button
                  variant={previewMode ? "outline" : "default"}
                  className={previewMode ? "bg-white" : "bg-green-500 hover:bg-green-600"}
                  onClick={() => setPreviewMode(false)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  작성
                </Button>
                <Button
                  variant={previewMode ? "default" : "outline"}
                  className={previewMode ? "bg-green-500 hover:bg-green-600" : "bg-white"}
                  onClick={() => setPreviewMode(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  미리보기
                </Button>
              </div>
            </div>

            {!previewMode ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    제목
                  </Label>
                  <Input
                    id="title"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-bold"
                  />
                </div>

                <div className="mb-6">
                  <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}> {/* value에 cat.id (UUID) 사용 */}
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    태그
                  </Label>
                  <div className="flex">
                    <Input
                      id="tags"
                      placeholder="태그 입력 후 Enter"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 mr-2"
                    />
                    <Button onClick={handleAddTag} type="button">
                      추가
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <div key={tag} className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                          #{tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <Label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                    썸네일 이미지
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImagePlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      이미지를 드래그하여 업로드하거나 클릭하여 파일을 선택하세요
                    </p>
                    <Button variant="outline" size="sm">
                      이미지 선택
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    내용
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px]"
                  />
                </div>

                <div className="flex justify-end gap-4">
                   <Button
                    onClick={() => router.back()}
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    취소
                  </Button>
                  <Button 
                    onClick={handlePublish} 
                    className="bg-green-500 hover:bg-green-700"
                    disabled={isSubmitting || !title.trim() || !content.trim() || !category || !user}
                  >
                    {isSubmitting ? '발행 중...' : '게시하기'}
                  </Button>
                </div>
              </div>
            ) : (
              // 미리보기 UI (기존과 유사하게 유지 또는 개선)
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-4">{title || "제목 미리보기"}</h1>
                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                    {category && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {categories.find((cat) => cat.id === category)?.name || "카테고리"}
                      </div>
                    )}
                    <div>{new Date().toLocaleDateString('ko-KR')}</div>
                    <div>작성자: {user?.email || "사용자"}</div>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag) => (
                        <div key={tag} className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                          #{tag}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="prose max-w-none">
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }} />
                    ) : (
                      <p className="text-gray-400">내용을 입력하세요...</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div> 
  ); // 세미콜론 추가
}
