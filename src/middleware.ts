import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 5 языков
const locales = ['en', 'fr', 'es', 'ar', 'hi'];
const defaultLocale = 'en'; // Язык по умолчанию

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // === 1. ЗАЩИТА ОТ WWW (SEO 301 Redirect) ===
  if (hostname.startsWith('www.')) {
    const newHost = hostname.replace('www.', '');

    return NextResponse.redirect(`https://${newHost}${pathname}${search}`, 301);
  }

  // === 2. МАРШРУТИЗАЦИЯ ЯЗЫКОВ ===
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};