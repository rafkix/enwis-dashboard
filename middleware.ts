import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/locales"; // Yo'lni o'zingizniki bilan tekshiring

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Tekshiramiz: Pathname ichida tillar bormi? (/uz, /ru, /en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // 2. Agar til bo'lsa, hech narsa qilmaymiz (yo'lni davom ettiramiz)
  if (pathnameHasLocale) return;

  // 3. Agar til bo'lmasa, defaultLocale (/uz) ga redirect qilamiz
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

  // Masalan: localhost:3000 -> localhost:3000/uz
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Barcha ichki api va static fayllarni o'tkazib yuborish
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.png$).*)",
  ],
};
