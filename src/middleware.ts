import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'es', 'ar', 'hi'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // === 1. ЗАЩИТА ОТ WWW (SEO 301 Redirect) ===
  if (hostname.startsWith('www.')) {
    const newHost = hostname.replace('www.', '');
    return NextResponse.redirect(`https://${newHost}${pathname}${search}`, 301);
  }

  const isStaticFile = /\.(jpg|jpeg|png|gif|webp|svg|ico|xml|txt)$/i.test(pathname);
  
  if (isStaticFile) {
    const pathParts = pathname.split('/');
    if (locales.includes(pathParts[1])) {
      pathParts.splice(1, 1);
      const correctPath = pathParts.join('/'); 
      
      return NextResponse.redirect(new URL(correctPath, request.url));
    }
    return NextResponse.next();
  }

  // === 3. МАРШРУТИЗАЦИЯ ЯЗЫКОВ ===
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image).*)',
  ],
};