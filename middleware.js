import { NextResponse } from 'next/server';

const PROTECTED_PATH = '/purchase';
const LOGIN_PATH = '/signin';

export function middleware(request) {
  // 1. 認証情報の確認 (例: Cookieからトークンを取得)
  // 💡 ログインの有効時間内であれば、Cookieにトークンが存在すると仮定
  const isAuthenticated = request.cookies.has('session_token'); 

  // --- A. ルートパスの制御 ( / → /purchase ) ---
  
  // アプリケーションのルート (/) にアクセスされたら、/purchase へリダイレクト
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(PROTECTED_PATH, request.url));
  }

  // --- B. 認証ガードのロジック ( /purchase へのアクセス制御 ) ---

  // ログイン有効時間切れ（未認証）の場合
  if (!isAuthenticated) {
    // アクセスしようとしているパスが /purchase またはその配下の場合
    if (request.nextUrl.pathname.startsWith(PROTECTED_PATH)) {
      
      // サインインページへのリダイレクトを強制
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  // 認証済みの場合、サインインページにアクセスしようとしたら /purchase へリダイレクト
  if (isAuthenticated && request.nextUrl.pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL(PROTECTED_PATH, request.url));
  }

  // 認証済み、かつアクセスが許可されている場合、そのまま続行
  return NextResponse.next();
}

// ミドルウェアを実行するパスを指定 (ルートとpurchase配下を監視)
export const config = {
  matcher: [
    '/',
    '/purchase/:path*', // purchase とその配下の全て
    '/signin', // signin ページも監視対象に加える
  ],
};