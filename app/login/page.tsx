// "use client"; // 이 파일은 클라이언트 컴포넌트가 아니어도 됩니다.
               // LoginPageContent가 'use client'이므로 괜찮습니다.

import { Suspense } from 'react'; // Suspense import
import LoginPageContent from './LoginPageContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingLogin />}> {/* fallback UI 컴포넌트 또는 JSX */}
      <LoginPageContent />
    </Suspense>
  );
}

// 로딩 중 보여줄 간단한 fallback 컴포넌트 (선택 사항, 직접 JSX를 넣어도 됨)
function LoadingLogin() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>로그인 양식을 불러오는 중...</p>
    </div>
  );
}