"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null, 
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false); // 클라이언트 여부 상태 추가

  // handleRedirect 함수를 useEffect 외부로 이동하고, 필요한 상태를 인자로 받도록 변경
  const handleRedirect = (
    currentUser: User | null, 
    currentLoading: boolean, 
    currentPathname: string, 
    currentSearchParams: URLSearchParams | null // searchParams를 null 가능하도록 변경
  ) => {
    const protectedRoutes = ['/blog/write', '/profile'];
    const isProtectedRoute = protectedRoutes.some(route => currentPathname.startsWith(route));
    const isLoginPage = currentPathname === '/login';

    console.log(`[AuthProvider] handleRedirect called: Path=${currentPathname}, User=${!!currentUser}, Loading=${currentLoading}, isProtectedRoute=${isProtectedRoute}, isLoginPage=${isLoginPage}, SearchParams=${currentSearchParams ? currentSearchParams.toString() : 'N/A'}`);

    if (!currentLoading) { // 로딩이 완료된 후에만 리디렉션 로직 실행
      if (!currentUser) { // 로그아웃 상태
        console.log('[AuthProvider] User is logged out.');
        if (isProtectedRoute && !isLoginPage) {
          console.log('[AuthProvider] Protected route detected, redirecting to login from:', currentPathname);
          router.push(`/login?redirect=${encodeURIComponent(currentPathname)}`);
        }
      } else { // 로그인 상태
        if (isLoginPage) {
          const redirectPath = currentSearchParams ? currentSearchParams.get('redirect') || '/blog' : '/blog';
          console.log('[AuthProvider] Redirecting from login page to:', redirectPath);
          router.push(redirectPath);
        }
      }
    } else {
      console.log('[AuthProvider] Still loading, skipping redirect logic.');
    }
  };

  useEffect(() => {
    setIsClient(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
    setLoading(true); // 초기 로딩 시작
    const checkInitialSession = async () => {
      const { data: { session: initialSession }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting initial session:", error.message);
      }
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false); // 초기 세션 로드 완료
    };

    checkInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, sessionState) => {
        console.log(`[AuthProvider] useEffect - Auth state changed event: ${_event}, session: ${!!sessionState}. Path: ${pathname}`);
        setSession(sessionState);
        setUser(sessionState?.user ?? null);
        setLoading(false); // 인증 상태 변경 시 로딩 완료
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // 마운트 시 한 번만 실행

  useEffect(() => {
    let currentSearchParams: URLSearchParams | null = null;
    if (isClient) { // 클라이언트에서만 useSearchParams 호출
      currentSearchParams = useSearchParams();
      console.log(`[AuthProvider] useEffect - SearchParams accessed: ${currentSearchParams.toString()}`);
    }
    // 이 useEffect는 user, loading, pathname, isClient가 변경될 때마다 실행
    handleRedirect(user, loading, pathname, currentSearchParams);
  }, [user, loading, pathname, isClient, router]); // router도 handleRedirect 내부에서 사용되므로 추가

  useEffect(() => {
    let currentSearchParams: URLSearchParams | null = null;
    if (isClient) { // 클라이언트에서만 useSearchParams 호출
      currentSearchParams = useSearchParams();
    }
    // 클라이언트 사이드 리디렉션 폴백 로직
    const intendedPath = currentSearchParams ? currentSearchParams.get('next') : null;
    if (!loading && user && intendedPath && pathname === '/') { // 로그인 되었고, 로딩 완료, 루트 경로일 때
      console.log(`[AuthProvider] Client-side redirect fallback: Intended path=${intendedPath}, Current path=${pathname}`);
      router.replace(decodeURIComponent(intendedPath));
    }
  }, [loading, user, pathname, isClient, router]);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
