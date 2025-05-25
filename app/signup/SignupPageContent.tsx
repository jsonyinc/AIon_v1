"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation" // useSearchParams는 여기서 사용
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/components/AuthProvider"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import BlogHeader from "@/components/BlogHeader"

export default function SignupPageContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams() // 여기서 사용
  const { user, loading: authLoading } = useAuth()

  // isClient 상태 및 관련 useEffect 제거 가능
  // const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // 이미 로그인된 사용자는 리디렉션
  useEffect(() => {
    // isClient 조건 제거
    if (!authLoading && user) {
      const redirectPath = searchParams.get('redirect') || '/blog';
      console.log(`[SignupPage] useEffect - Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
    }
  }, [user, authLoading, router, searchParams]); // isClient 의존성 제거

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      console.error("Signup error:", error.message);
    } else if (data.user) {
      setMessage("회원가입이 완료되었습니다. 이메일 확인 링크를 통해 계정을 활성화해 주세요.");
      console.log("Signup successful, confirmation email sent.");
    } else {
      setMessage("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
      // isClient 조건 제거
      const redirectPath = searchParams.get('redirect') || '/blog';
      console.log(`[SignupPage] Signup success - Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
    }
    setLoading(false);
  };

  // authLoading 중이거나 이미 user가 있는 경우 (로그인 된 경우)
  // 이 로직은 searchParams를 사용하기 전에 실행될 수 있으므로,
  // Suspense fallback이 먼저 보이고, 이 컴포넌트가 렌더링된 후 이 조건문이 평가됩니다.
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로그인 상태 확인 중...</p>
      </div>
    );
  }

  // user가 이미 있다면 useEffect에서 리디렉션 처리하므로, 여기서는 별도 UI가 필요 없을 수 있습니다.
  // 만약 리디렉션 전 잠시 보여줄 UI가 필요하다면 유지합니다.
  // 하지만 useEffect에서 즉시 리디렉션하므로 이 UI는 거의 보이지 않을 것입니다.
  // if (user) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <p>이미 로그인되어 있습니다. 리디렉션 중...</p>
  //     </div>
  //   );
  // }


  // isClient 관련 로딩 상태 제거
  // if (!isClient) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <p>로딩 중...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <section className="pt-32 pb-16 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
              {loading ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              로그인
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
