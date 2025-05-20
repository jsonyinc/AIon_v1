import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AIon Inc | Romi Factory",
  description: "AIon Inc - AI 비즈니스의 혁신을 선도합니다.",
  // generator: "v0.dev",
    icons: {
    icon: '/favicon.png', // public/favicon.png 경로
    // 필요에 따라 다른 아이콘 타입도 추가 가능 (예: apple-touch-icon)
    // apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll">{children}</body>
    </html>
  )
}
