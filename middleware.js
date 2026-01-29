import { NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const PROTECTED_PATH = '/purchase';
const LOGIN_PATH = '/signin';

export async function middleware(request) {
  // Supabaseのセッション情報を取得
  const { supabaseResponse, user } = await updateSession(request);
  
  const isAuthenticated = !!user; // userが存在すれば認証済み

  // --- A. ルートパスの制御 ( / → /purchase ) ---
  
  // アプリケーションのルート (/) にアクセスされたら、/purchase へリダイレクト
  if (request.nextUrl.pathname === '/') {
    const url = new URL(PROTECTED_PATH, request.url);
    return NextResponse.redirect(url);
  }

  // --- B. 認証ガードのロジック ( /purchase へのアクセス制御 ) ---

  // ログイン有効時間切れ（未認証）の場合
  if (!isAuthenticated) {
    // アクセスしようとしているパスが /purchase またはその配下の場合
    if (request.nextUrl.pathname.startsWith(PROTECTED_PATH)) {
      
      // サインインページへのリダイレクトを強制
      const url = new URL(LOGIN_PATH, request.url);
      return NextResponse.redirect(url);
    }
  }

  // 認証済みの場合、サインインページにアクセスしようとしたら /purchase へリダイレクト
  if (isAuthenticated && request.nextUrl.pathname === LOGIN_PATH) {
    const url = new URL(PROTECTED_PATH, request.url);
    return NextResponse.redirect(url);
  }

  // 認証済み、かつアクセスが許可されている場合、Supabaseのレスポンスを返す
  return supabaseResponse;
}

// ミドルウェアを実行するパスを指定 (ルートとpurchase配下を監視)
export const config = {
  matcher: [
    '/',
    '/purchase/:path*', // purchase とその配下の全て
    '/signin', // signin ページも監視対象に加える
  ],
};