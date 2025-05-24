"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/components/AuthProvider"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import type { User } from '@supabase/supabase-js';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/profile')
      } else {
        setUserData(user)
        setLoading(false)
      }
    }
  }, [user, authLoading, router])

  const handleSignOut = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signOut()

    if (error) {
      setMessage(error.message)
      console.error("Sign out error:", error.message)
    } else {
      setMessage("로그아웃되었습니다. 로그인 페이지로 이동합니다.")
      router.push('/login')
    }
    setLoading(false)
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-32 pb-16 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6">내 프로필</h2>
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <div id="email" className="mt-1 text-gray-700">
                {userData.email}
              </div>
            </div>
            <div>
              <Label htmlFor="name">이름</Label>
              <div id="name" className="mt-1 text-gray-700">
                {userData.user_metadata?.full_name || "이름 미설정"}
              </div>
            </div>
            <div>
              <Label htmlFor="avatar">프로필 사진</Label>
              <div id="avatar" className="mt-1">
                {userData.user_metadata?.avatar_url ? (
                  <img 
                    src={userData.user_metadata.avatar_url} 
                    alt="프로필 사진" 
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    사진 없음
                  </div>
                )}
              </div>
            </div>
            <Button 
              onClick={handleSignOut} 
              className="w-full bg-red-500 hover:bg-red-600 text-white" 
              disabled={loading}
            >
              {loading ? "로그아웃 중..." : "로그아웃"}
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
