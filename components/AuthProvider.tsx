"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean; // 이 loading은 초기 인증 상태 확인 완료 여부를 나타냄
  // signOut: () => Promise<void>; // 필요하다면 signOut 함수도 컨텍스트에 추가
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  // signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 초기 인증 로딩 상태

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // 컴포넌트 최상위에서 호출

  // 초기 세션 확인 및 인증 상태 변경 감지
  useEffect(() => {
    setLoading(true); // 명시적으로 로딩 시작

    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("[AuthProvider] Error getting initial session:", error.message);
          // 오류 발생 시에도 세션은 null, 사용자는 null로 설정될 수 있도록 함
          setSession(null);
          setUser(null);
        } else {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          console.log("[AuthProvider] Initial session fetched:", initialSession);
        }
      } catch (err) {
        console.error("[AuthProvider] Unexpected error getting session:", err);
        setSession(null);
        setUser(null);
      } finally {
        // getSession이 완료되면 로딩 상태를 false로 설정하는 것을 고려할 수 있으나,
        // onAuthStateChange가 초기 상태를 더 확실하게 제공할 수 있음.
        // 여기서는 onAuthStateChange가 INITIAL_SESSION 이벤트를 통해 로딩을 해제하도록 유도.
      }
    };

    getInitialSession(); // 초기 세션 가져오기 실행

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log(`[AuthProvider] onAuthStateChange event: ${event}, session: ${!!newSession}`);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false); // 어떤 인증 이벤트든 발생하면 초기 로딩은 끝난 것으로 간주
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // 마운트 시 한 번만 실행

  // 리디렉션 로직 (loading, user, pathname, searchParams 변경 시 실행)
  useEffect(() => {
    if (loading) {
      console.log('[AuthProvider] Still loading, skipping redirect logic.');
      return;
    }

    const protectedRoutes = ['/blog/write', '/profile']; // 예시 보호 경로
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthPage = pathname === '/login' || pathname === '/signup'; // 예시 인증 관련 페이지

    console.log(`[AuthProvider] Redirect check: Path=${pathname}, User=${!!user}, Loading=${loading}, isProtectedRoute=${isProtectedRoute}, isAuthPage=${isAuthPage}`);

    if (!user) { // 로그아웃 상태
      if (isProtectedRoute) {
        console.log('[AuthProvider] Protected route, user not logged in. Redirecting to login from:', pathname);
        router.push(`/login?redirect=${encodeURIComponent(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''))}`);
      }
    } else { // 로그인 상태
      if (isAuthPage) {
        const redirectPath = searchParams.get('redirect') || '/blog'; // 기본 리디렉션 경로
        console.log('[AuthProvider] User logged in, on auth page. Redirecting to:', redirectPath);
        router.push(redirectPath);
      }
      // 추가: 'next' 쿼리 파라미터 처리 (예: 이메일 인증 후 리디렉션)
      const nextPath = searchParams.get('next');
      if (nextPath && pathname !== nextPath) { // 현재 경로와 nextPath가 다를 때만 리디렉션
        console.log(`[AuthProvider] 'next' param found. Redirecting to: ${nextPath}`);
        router.push(decodeURIComponent(nextPath));
      }
    }
  }, [user, loading, pathname, searchParams, router]);


  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   setSession(null);
  //   setUser(null);
  //   router.push('/login'); // 로그아웃 후 리디렉션
  // };

  return (
    <AuthContext.Provider value={{ session, user, loading /*, signOut: handleSignOut */ }}>
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



// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { supabase } from '@/lib/supabaseClient';
// import type { Session, User } from '@supabase/supabase-js';

// interface AuthContextType {
//   session: Session | null;
//   user: User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({ 
//   session: null, 
//   user: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false); // 클라이언트 여부 상태 추가

//   // handleRedirect 함수를 useEffect 외부로 이동하고, 필요한 상태를 인자로 받도록 변경
//   const handleRedirect = (
//     currentUser: User | null, 
//     currentLoading: boolean, 
//     currentPathname: string, 
//     currentSearchParams: URLSearchParams | null // searchParams를 null 가능하도록 변경
//   ) => {
//     const protectedRoutes = ['/blog/write', '/profile'];
//     const isProtectedRoute = protectedRoutes.some(route => currentPathname.startsWith(route));
//     const isLoginPage = currentPathname === '/login';

//     console.log(`[AuthProvider] handleRedirect called: Path=${currentPathname}, User=${!!currentUser}, Loading=${currentLoading}, isProtectedRoute=${isProtectedRoute}, isLoginPage=${isLoginPage}, SearchParams=${currentSearchParams ? currentSearchParams.toString() : 'N/A'}`);

//     if (!currentLoading) { // 로딩이 완료된 후에만 리디렉션 로직 실행
//       if (!currentUser) { // 로그아웃 상태
//         console.log('[AuthProvider] User is logged out.');
//         if (isProtectedRoute && !isLoginPage) {
//           console.log('[AuthProvider] Protected route detected, redirecting to login from:', currentPathname);
//           router.push(`/login?redirect=${encodeURIComponent(currentPathname)}`);
//         }
//       } else { // 로그인 상태
//         if (isLoginPage) {
//           const redirectPath = currentSearchParams ? currentSearchParams.get('redirect') || '/blog' : '/blog';
//           console.log('[AuthProvider] Redirecting from login page to:', redirectPath);
//           router.push(redirectPath);
//         }
//       }
//     } else {
//       console.log('[AuthProvider] Still loading, skipping redirect logic.');
//     }
//   };

//   useEffect(() => {
//     setIsClient(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
//     setLoading(true); // 초기 로딩 시작
//     const checkInitialSession = async () => {
//       try {
//         const { data: { session: initialSession }, error } = await supabase.auth.getSession();
//         if (error) {
//           console.error("Error getting initial session:", error.message);
//         } else {
//           setSession(initialSession);
//           setUser(initialSession?.user ?? null);
//         }
//       } catch (err) {
//         console.error("Unexpected error getting session:", err);
//       } finally {
//         setLoading(false); // 초기 세션 로드 완료
//       }
//     };

//     checkInitialSession();

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_event, sessionState) => {
//         console.log(`[AuthProvider] useEffect - Auth state changed event: ${_event}, session: ${!!sessionState}. Path: ${pathname}`);
//         setSession(sessionState);
//         setUser(sessionState?.user ?? null);
//         setLoading(false); // 인증 상태 변경 시 로딩 완료
//       }
//     );

//     return () => {
//       authListener?.subscription.unsubscribe();
//     };
//   }, []); // 마운트 시 한 번만 실행

//   useEffect(() => {
//     let currentSearchParams: URLSearchParams | null = null;
//     if (isClient) { // 클라이언트에서만 useSearchParams 호출
//       currentSearchParams = useSearchParams();
//       console.log(`[AuthProvider] useEffect - SearchParams accessed: ${currentSearchParams.toString()}`);
//     }
//     // 이 useEffect는 user, loading, pathname, isClient가 변경될 때마다 실행
//     handleRedirect(user, loading, pathname, currentSearchParams);
//   }, [user, loading, pathname, isClient, router]); // router도 handleRedirect 내부에서 사용되므로 추가

//   useEffect(() => {
//     let currentSearchParams: URLSearchParams | null = null;
//     if (isClient) { // 클라이언트에서만 useSearchParams 호출
//       currentSearchParams = useSearchParams();
//     }
//     // 클라이언트 사이드 리디렉션 폴백 로직
//     const intendedPath = currentSearchParams ? currentSearchParams.get('next') : null;
//     if (!loading && user && intendedPath && pathname === '/') { // 로그인 되었고, 로딩 완료, 루트 경로일 때
//       console.log(`[AuthProvider] Client-side redirect fallback: Intended path=${intendedPath}, Current path=${pathname}`);
//       router.replace(decodeURIComponent(intendedPath));
//     }
//   }, [loading, user, pathname, isClient, router]);

//   return (
//     <AuthContext.Provider value={{ session, user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
