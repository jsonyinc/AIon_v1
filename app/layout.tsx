// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "AIon Inc | Romi Factory",
  description: "AIon Inc - AI 비즈니스의 혁신을 선도합니다.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("[RootLayout] Rendering RootLayout. AuthProvider is now wrapping children.");
  return (
    <html lang="en">
      <body className="overflow-y-scroll">
        <Suspense fallback={<div>Loading from Suspense...</div>}> {/* 또는 fallback={null} */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}


// import type React from "react"
// import type { Metadata } from "next"
// import "./globals.css"
// import { AuthProvider } from "@/components/AuthProvider"; // 1. AuthProvider를 import 합니다.

// export const metadata: Metadata = {
//   title: "AIon Inc | Romi Factory",
//   description: "AIon Inc - AI 비즈니스의 혁신을 선도합니다.",
//   icons: {
//     icon: '/favicon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   console.log("[RootLayout] Rendering RootLayout. AuthProvider is now wrapping children."); // 확인용 로그
//   return (
//     <html lang="en">
//       <body className="overflow-y-scroll">
//         <AuthProvider> {/* 2. AuthProvider로 children을 감싸줍니다. */}
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }