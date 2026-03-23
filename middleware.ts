import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStaticFile = /\.[^/]+$/.test(pathname);

  // 1) Static va next fayllarni o'tkazib yuboramiz
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    isStaticFile
  ) {
    return NextResponse.next();
  }

  // 2) Admin route'larni alohida himoyalaymiz
  if (pathname.startsWith("/admin")) {
    // login page'ni o'zini ochiq qoldiramiz
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const adminToken = request.cookies.get("admin_token")?.value;

    if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 3) Qolgan route'lar uchun locale check
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
