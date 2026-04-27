import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Наши 5 рабочих языков
const locales = ['en', 'fr', 'es', 'ar', 'hi'];
const defaultLocale = 'en'; // Язык по умолчанию

// ВАЖНО: Имя функции изменено на proxy
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Проверяем, есть ли уже в URL поддерживаемый язык
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 2. Если языка в URL нет, перенаправляем на язык по умолчанию
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

// 3. Конфигурация: указываем Next.js, для каких путей НЕ нужно запускать этот proxy
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};