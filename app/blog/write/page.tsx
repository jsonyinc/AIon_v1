"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  Code,
  Quote,
  ImageIcon,
  Save,
  Eye,
  Send,
  Upload,
  CheckCircle,
  ListOrdered,
  EyeOff,
  Maximize2,
  Minimize2,
} from "lucide-react"
import BlogHeader from "@/components/BlogHeader"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/components/AuthProvider"

// 간단한 마크다운 파서
const parseMarkdown = (markdown: string): string => {
  let html = markdown

  // 코드 블록 (```로 감싸진 부분)
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
  )

  // 인라인 코드 (`로 감싸진 부분)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')

  // 제목들
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')

  // 굵게
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

  // 기울임
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

  // 밑줄
  html = html.replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')

  // 인용문
  html = html.replace(
    /^> (.*$)/gm,
    '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">$1</blockquote>',
  )

  // 순서 없는 목록
  html = html.replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')

  // 순서 있는 목록
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')

  // 이미지
  html = html.replace(
    /!\[([^\]]*)\]$$([^)]+)$$/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />',
  )

  // 링크
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')

  // 줄바꿈
  html = html.replace(/\n/g, "<br />")

  return html
}

export default function BlogEditor() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isAutoSaved, setIsAutoSaved] = useState(false)
  const [textStyle, setTextStyle] = useState("normal")
  const [showPreview, setShowPreview] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // authLoading이 false로 바뀌고, user가 없을 때만 모달을 띄움
    if (!authLoading && !user) {
      console.log("[BlogEditor] Auth loading finished, user not found. Showing login modal.");
      setShowLoginModal(true);
    }
    // 사용자가 있거나, 아직 로딩 중이면 모달을 띄우지 않음
    if (user) {
      setShowLoginModal(false);
    }
  }, [authLoading, user]);

  const handleAutoSave = () => {
    setIsAutoSaved(true)
    setTimeout(() => setIsAutoSaved(false), 2000)
  }

  // 텍스트 선택 영역 가져오기
  const getSelectedText = () => {
    const textarea = textareaRef.current
    if (!textarea) return { start: 0, end: 0, selectedText: "" }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    return { start, end, selectedText }
  }

  // 텍스트 삽입/교체 함수
  const insertText = (before: string, after = "", replaceSelected = true) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { start, end, selectedText } = getSelectedText()

    let newText
    if (replaceSelected && selectedText) {
      newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    } else {
      newText = content.substring(0, start) + before + after + content.substring(end)
    }

    setContent(newText)

    // 커서 위치 조정
    setTimeout(() => {
      const newCursorPos = start + before.length + (replaceSelected ? selectedText.length : 0)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.focus()
    }, 0)
  }

  // 줄 시작에 텍스트 삽입
  const insertAtLineStart = (prefix: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { start } = getSelectedText()
    const lines = content.split("\n")
    let currentPos = 0
    let lineIndex = 0

    // 현재 커서가 있는 줄 찾기
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        lineIndex = i
        break
      }
      currentPos += lines[i].length + 1 // +1 for \n
    }

    lines[lineIndex] = prefix + lines[lineIndex]
    setContent(lines.join("\n"))

    setTimeout(() => {
      textarea.focus()
    }, 0)
  }

  // 포맷팅 함수들
  const formatBold = () => insertText("**", "**")
  const formatItalic = () => insertText("*", "*")
  const formatUnderline = () => insertText("<u>", "</u>")
  const formatH1 = () => insertAtLineStart("# ")
  const formatH2 = () => insertAtLineStart("## ")
  const formatList = () => insertAtLineStart("- ")
  const formatOrderedList = () => insertAtLineStart("1. ")
  const formatCode = () => {
    const { selectedText } = getSelectedText()
    if (selectedText.includes("\n")) {
      insertText("```\n", "\n```")
    } else {
      insertText("`", "`")
    }
  }
  const formatQuote = () => insertAtLineStart("> ")

  // 텍스트 스타일 변경
  const handleStyleChange = (style: string) => {
    setTextStyle(style)
    const { start } = getSelectedText()

    switch (style) {
      case "title":
        insertAtLineStart("# ")
        break
      case "subtitle":
        insertAtLineStart("## ")
        break
      case "quote":
        insertAtLineStart("> ")
        break
      default:
        break
    }
  }

  // 이미지 삽입
  const insertImage = () => {
    const url = prompt("이미지 URL을 입력하세요:")
    if (url) {
      const alt = prompt("이미지 설명을 입력하세요 (선택사항):")
      insertText(`![${alt || "이미지"}](${url})`, "", false)
    }
  }

  const handlePublish = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

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
        },
      ])
      .select();

    if (error) {
      console.error('Error publishing post:', error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } else if (data && data.length > 0) {
      alert("게시글이 성공적으로 저장되었습니다.");
      router.push('/blog');
    } else {
      alert("게시글 저장에 실패했습니다.");
    }
  }

  const toolbarButtons = [
    { icon: Bold, label: "굵게", action: formatBold, shortcut: "Ctrl+B" },
    { icon: Italic, label: "기울임", action: formatItalic, shortcut: "Ctrl+I" },
    { icon: Underline, label: "밑줄", action: formatUnderline },
    { icon: Heading1, label: "제목 1", action: formatH1 },
    { icon: Heading2, label: "제목 2", action: formatH2 },
    { icon: List, label: "목록", action: formatList },
    { icon: ListOrdered, label: "번호 목록", action: formatOrderedList },
    { icon: Code, label: "코드", action: formatCode },
    { icon: Quote, label: "인용", action: formatQuote },
    { icon: ImageIcon, label: "이미지 삽입", action: insertImage },
  ]

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로그인 상태 확인 중...</p>
      </div>
    );
  }


  // authLoading이 false이고 user가 없으면 모달이 뜰 것이므로,
  // 여기서는 user가 있는 경우의 UI 또는 모달이 닫힌 후의 UI를 렌더링
  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Top Navigation */}
      <BlogHeader />
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          {/* <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-900">블로그AI</div>
          </div> */}

          {/* Auto-save indicator */}
          <div className="flex items-center space-x-2">
            {isAutoSaved && (
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>저장됨</span>
              </div>
            )}
          </div>

          {/* Action buttons and profile */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleAutoSave}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? "미리보기 숨김" : "미리보기"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
              {isFullscreen ? "축소" : "전체화면"}
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handlePublish}>
              <Send className="w-4 h-4 mr-2" />
              게시
            </Button>
            {/* {user && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32"} />
                <AvatarFallback>{user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            )} */}
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className={`${isFullscreen ? "max-w-full" : "max-w-7xl"} mx-auto px-6 py-8`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Category Selection */}
          <div className="px-8 pt-8 pb-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-64 border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0">
                <SelectValue placeholder="카테고리 선택..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-trend">AI 트렌드</SelectItem>
                <SelectItem value="case-study">성공 사례</SelectItem>
                <SelectItem value="tech">기술 블로그</SelectItem>
                <SelectItem value="news">뉴스</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title Input */}
          <div className="px-8 pb-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요..."
              className="text-4xl font-bold border-0 px-0 py-4 focus-visible:ring-0 placeholder:text-gray-400"
            />
          </div>

          {/* Toolbar */}
          <div className="px-8 py-4 border-t border-b border-gray-100">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Select value={textStyle} onValueChange={handleStyleChange}>
                <SelectTrigger className="w-32 h-8 text-sm border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">본문</SelectItem>
                  <SelectItem value="title">제목</SelectItem>
                  <SelectItem value="subtitle">부제목</SelectItem>
                  <SelectItem value="quote">인용문</SelectItem>
                </SelectContent>
              </Select>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                  title={button.label}
                  onClick={button.action}
                >
                  <button.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Editor and Preview Layout */}
          <div className={`flex ${showPreview ? "divide-x divide-gray-200" : ""}`}>
            {/* Content Editor */}
            <div className={`${showPreview ? "w-1/2" : "w-full"} px-8 py-6`}>
              <div className="mb-2 text-sm font-medium text-gray-700">편집</div>
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="글을 작성해보세요... 마크다운 문법을 사용할 수 있습니다."
                className="min-h-96 border-0 resize-none focus-visible:ring-0 text-lg leading-relaxed placeholder:text-gray-400"
              />
            </div>

            {/* Preview Panel */}
            {showPreview && (
              <div className="w-1/2 px-8 py-6">
                <div className="mb-2 text-sm font-medium text-gray-700">미리보기</div>
                <div className="min-h-96 prose prose-lg max-w-none">
                  {title && <h1 className="text-4xl font-bold mb-6 text-gray-900">{title}</h1>}
                  <div
                    className="text-lg leading-relaxed text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: content
                        ? parseMarkdown(content)
                        : '<p class="text-gray-400">여기에 미리보기가 표시됩니다...</p>',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Media Upload Zone */}
          {!showPreview && (
            <div className="px-8 pb-8">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">이미지를 드래그하거나 클릭하여 업로드하세요</p>
                <p className="text-sm text-gray-400">JPG, PNG, GIF 파일 최대 10MB 지원</p>
                <Button variant="outline" className="mt-4">
                  파일 선택
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">로그인이 필요합니다</h3>
            <p className="text-gray-600 mb-6">
              블로그 글을 작성하려면 로그인이 필요합니다. 소셜 계정으로 간편하게 로그인하세요.
            </p>
            <div className="flex justify-between items-center">
              <Button onClick={() => { setShowLoginModal(false); router.push('/blog'); }} className="text-gray-500 hover:text-gray-700">
                나중에 하기
              </Button>
              <Button onClick={() => router.push('/login')} className="text-green-600 hover:text-green-700">
                이메일로 로그인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
