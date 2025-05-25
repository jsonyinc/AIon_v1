"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function NotFoundClientContent() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("페이지를 찾을 수 없습니다.");

  useEffect(() => {
    setIsClient(true);
    const reason = searchParams.get('reason');
    if (reason) {
      setMessage(`페이지를 찾을 수 없습니다. 이유: ${reason}`);
    }
  }, [searchParams]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">404 - {message}</h2>
        <p className="text-gray-600 mb-6">요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가거나 다른 경로를 확인해 주세요.</p>
        <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
