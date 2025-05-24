import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') // next 파라미터만 가져옴

  const debugInfo = {
    fullUrl: request.url,
    origin,
    code: code ? 'present' : 'missing',
    next,
    allParams: Object.fromEntries(searchParams.entries()),
    timestamp: new Date().toISOString()
  }
  console.log('[AUTH_CALLBACK] Debug Info:', JSON.stringify(debugInfo, null, 2))

  if (!code) {
    console.log('[AUTH_CALLBACK] No code provided, redirecting to login')
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('[AUTH_CALLBACK] Session exchange error:', error.message)
      console.log('[AUTH_CALLBACK] Session exchange error details:', JSON.stringify(error, null, 2));
      return NextResponse.redirect(`${origin}/login?error=session_exchange_failed`)
    }

    console.log('[AUTH_CALLBACK] Session exchange successful:', {
      userId: data.user?.id,
      email: data.user?.email
    })

    // 최종 리디렉션 URL 결정 로직 개선 및 검증 강화
    let finalRedirectUrl = `${origin}/blog`; // 기본 목적지
    if (next) {
      const decodedNext = decodeURIComponent(next);
      // 악의적인 리디렉션 방지를 위한 검증
      const allowedPathPattern = /^\/[a-zA-Z0-9\-_\/]*$/;
      if (decodedNext.startsWith('/') && allowedPathPattern.test(decodedNext)) {
        finalRedirectUrl = `${origin}${decodedNext}`;
      } else if (decodedNext.startsWith(origin)) {
        const pathPart = decodedNext.slice(origin.length);
        if (allowedPathPattern.test(pathPart)) {
          finalRedirectUrl = decodedNext;
        }
      }
    }
    
    console.log(`[AUTH_CALLBACK] Final redirecting to: ${finalRedirectUrl}`);
    return NextResponse.redirect(finalRedirectUrl);
  } catch (error) {
    console.error('[AUTH_CALLBACK] Unexpected error:', error)
    return NextResponse.redirect(`${origin}/login?error=unexpected_error`)
  }
}
