"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ImagePlus, X, Save, Eye } from "lucide-react"
import BlogHeader from "@/components/BlogHeader"
import { supabase } from "@/lib/supabaseClient" // Supabase 클라이언트 임포트
import { useRouter } from 'next/navigation'; // useRouter 임포트

// 블로그 카테고리 데이터 (필요시 Supabase에서 가져오도록 수정 가능)
const categories = [
  { id: "ai-trend", name: "AI 트렌드" },
  { id: "case-study", name: "성공 사례" },
  { id: "tech", name: "기술 블로그" },
  { id: "news", name: "뉴스" },
]

export default function BlogWritePage() {
  const router = useRouter(); // useRouter 훅 사용
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(true) // 로그인 모달 상태 (임시)
  const [previewMode, setPreviewMode] = useState(false)

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
    // 필수 필드 유효성 검사
    if (!title.trim() || !content.trim() || !category) {
      alert("제목, 내용, 카테고리는 필수 입력 항목입니다.");
      return;
    }

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          category: category,
          // created_at은 기본값으로 자동 생성
          // id도 기본값으로 자동 생성
          // image, author, tags 등은 현재 스키마에 없으므로 제외
        },
      ])
      .select(); // 삽입된 데이터 반환 (ID 확인용)

    if (error) {
      console.error('Error publishing post:', error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } else if (data && data.length > 0) {
      alert("게시글이 성공적으로 저장되었습니다.");
      // 게시글 목록 페이지 또는 상세 페이지로 리다이렉트
      router.push('/blog'); // 블로그 목록 페이지로 이동
      // 또는 router.push(`/blog/${data[0].id}`); // 작성된 게시물 상세 페이지로 이동
    } else {
       // 데이터는 없지만 오류도 없는 경우 (삽입 실패)
       alert("게시글 저장에 실패했습니다.");
    }
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
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
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

                <div className="flex justify-end">
                  <Button onClick={handlePublish} className="bg-green-500 hover:bg-green-600">
                    게시하기
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-8">
                  <h1 className="text-3xl font-bold mb-4">{title || "제목을 입력하세요"}</h1>

                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                    {category && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {categories.find((cat) => cat.id === category)?.name}
                      </div>
                    )}
                    <div>2025-05-17</div>
                    <div>작성자: 사용자</div>
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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">로그인이 필요합니다</h3>
            <p className="text-gray-600 mb-6">
              블로그 글을 작성하려면 로그인이 필요합니다. 소셜 계정으로 간편하게 로그인하세요.
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
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
                나중에 하기
              </button>
              <Link href="/login" className="text-green-600 hover:text-green-700">
                이메일로 로그인
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
