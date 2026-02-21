import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("tdp-locale")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("ar")) {
    return "ar";
  }

  if (acceptLanguage.includes("no") || acceptLanguage.includes("nb") || acceptLanguage.includes("nn")) {
    return "no";
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (!hasLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const localeFromPath = pathname.split("/")[1];
  const response = NextResponse.next();

  if (isLocale(localeFromPath)) {
    response.cookies.set("tdp-locale", localeFromPath, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
