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
  const searchParams = useSearchParams();

  // handleRedirect 함수를 useEffect 외부로 이동하고, 필요한 상태를 인자로 받도록 변경
  const handleRedirect = (
    currentUser: User | null, 
    currentLoading: boolean, 
    currentPathname: string, 
    currentSearchParams: URLSearchParams
  ) => {
    const protectedRoutes = ['/blog/write', '/profile'];
    const isProtectedRoute = protectedRoutes.some(route => currentPathname.startsWith(route));
    const isLoginPage = currentPathname === '/login';

    console.log(`[AuthProvider] handleRedirect called: Path=${currentPathname}, User=${!!currentUser}, Loading=${currentLoading}, isProtectedRoute=${isProtectedRoute}, isLoginPage=${isLoginPage}, SearchParams=${currentSearchParams.toString()}`);

    if (!currentLoading) { // 로딩이 완료된 후에만 리디렉션 로직 실행
      if (!currentUser) { // 로그아웃 상태
        console.log('[AuthProvider] User is logged out.');
        if (isProtectedRoute && !isLoginPage) {
          console.log('[AuthProvider] Protected route detected, redirecting to login from:', currentPathname);
          router.push(`/login?redirect=${encodeURIComponent(currentPathname)}`);
        }
      } else { // 로그인 상태
        if (isLoginPage) {
          const redirectPath = currentSearchParams.get('redirect') || '/blog';
          console.log('[AuthProvider] Redirecting from login page to:', redirectPath);
          router.push(redirectPath);
        }
      }
    } else {
      console.log('[AuthProvider] Still loading, skipping redirect logic.');
    }
  };

  useEffect(() => {
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
        console.log(`[AuthProvider] useEffect - Auth state changed event: ${_event}, session: ${!!sessionState}. Path: ${pathname}, SearchParams: ${searchParams.toString()}`);
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
    // 이 useEffect는 user, loading, pathname, searchParams가 변경될 때마다 실행
    handleRedirect(user, loading, pathname, searchParams);
  }, [user, loading, pathname, searchParams, router]); // router도 handleRedirect 내부에서 사용되므로 추가

  useEffect(() => {
    // 클라이언트 사이드 리디렉션 폴백 로직
    const intendedPath = searchParams.get('next');
    if (!loading && user && intendedPath && pathname === '/') { // 로그인 되었고, 로딩 완료, 루트 경로일 때
      console.log(`[AuthProvider] Client-side redirect fallback: Intended path=${intendedPath}, Current path=${pathname}`);
      router.replace(decodeURIComponent(intendedPath));
    }
  }, [loading, user, pathname, searchParams, router]);

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
