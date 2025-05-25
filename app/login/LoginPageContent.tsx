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
import type { Provider } from '@supabase/supabase-js';

export default function LoginPageContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      console.log(`[LoginPage] useEffect - Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
    }
  }, [user, authLoading, router, searchParams]); // isClient 의존성 제거

  // OAuth 로그인 오류 메시지 처리
  useEffect(() => {
    // isClient 조건 제거
    const errorParam = searchParams.get('error');
    if (errorParam === 'oauth_error') {
      setMessage('OAuth 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [searchParams]); // isClient 의존성 제거

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        setMessage("잘못된 로그인 정보입니다. 이메일 또는 비밀번호를 확인해 주세요. 계정이 없으신가요? 회원가입을 진행해 주세요.");
      } else {
        setMessage(error.message);
      }
      console.error("Email login error:", error.message);
    } else {
      // isClient 조건 제거
      const redirectPath = searchParams.get('redirect') || '/blog';
      console.log(`[LoginPage] Email login success - Redirecting to: ${redirectPath}`);
      router.push(redirectPath);
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: Provider) => {
    console.log('=== handleOAuthLogin 시작 ===');
    setLoading(true);
    setMessage(null);
    const redirect = searchParams.get('redirect') || '/blog';
    console.log('Redirect param:', redirect);
    const redirectToUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`;
    console.log('Final redirectTo URL:', redirectToUrl);

    const options = {
      redirectTo: redirectToUrl,
      ...(provider === 'google' && {
        queryParams: {
          prompt: 'select_account',
          access_type: 'offline',
        },
      }),
    };

    console.log('OAuth options:', options);
    // console.log('Supabase client auth config:', JSON.stringify(supabase.auth, null, 2)); // 필요시 주석 해제

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options,
    });

    if (error) {
      setMessage(error.message);
      console.error(`${provider} login error:`, error.message);
    } else {
      console.log('OAuth login initiated successfully');
    }
    setLoading(false);
  };

  // authLoading 중이거나 이미 user가 있는 경우
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로그인 상태 확인 중...</p>
      </div>
    );
  }

  // user가 이미 있다면 useEffect에서 리디렉션 처리
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
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <Button
              onClick={() => handleOAuthLogin('kakao')}
              className="w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-yellow-800 py-2 px-4 rounded"
              disabled={loading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.111.466.497.845.895.481.091-.08 1.419-1.341 2.086-1.979.468.073.95.111 1.44.111 4.97 0 9-3.185 9-7.115C21 6.185 16.97 3 12 3" />
              </svg>
              카카오톡으로 로그인
            </Button>

            <Button
              onClick={() => handleOAuthLogin('naver' as Provider)}
              className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.543 8.969h-1.528V7.442h-1.528v1.527H15.01v1.528h1.527v1.527h1.528V9.497h1.527V8.969zM12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm.968 15.276h-1.936v-4.538H8.595v-1.936h3.373v-1.528h1.936v1.528h1.528v1.936h-1.528v4.538z" />
              </svg>
              네이버로 로그인 (준비중)
            </Button>

            <Button
              onClick={() => handleOAuthLogin('facebook')}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              페이스북으로 로그인 (준비중)
            </Button>

            <Button
              onClick={() => handleOAuthLogin('google')}
              className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded"
              disabled={loading}
            >
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
            </Button>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">또는</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* 이메일/비밀번호 로그인 폼 */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
              회원가입
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
