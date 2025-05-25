"use client"; // 이 파일은 클라이언트 컴포넌트가 아니어도 됩니다.
              // Suspense를 사용하는 페이지 컴포넌트는 서버 컴포넌트로 유지하는 것이 일반적입니다.
              // SignupPageContent가 'use client'이므로 괜찮습니다.

import { Suspense } from 'react'; // Suspense import
import SignupPageContent from './SignupPageContent';

export default function SignupPage() {
  return (
    <Suspense fallback={<LoadingSignup />}> {/* fallback UI 컴포넌트 또는 JSX */}
      <SignupPageContent />
    </Suspense>
  );
}

// 로딩 중 보여줄 간단한 fallback 컴포넌트 (선택 사항, 직접 JSX를 넣어도 됨)
function LoadingSignup() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>회원가입 양식을 불러오는 중...</p>
    </div>
  );
}