import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // Regex to match public files (e.g., .png, .jpg, .css, etc.)
const SUPPORTED_LOCALES = ["en", "kn-IN"]; // Define your supported locales
const DEFAULT_LOCALE = "en"; // Define your default locale

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public files, API routes, and already localized paths
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))
  ) {
    return NextResponse.next();
  }

  // Detect the user's preferred locale from the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLocale = acceptLanguage
    ? acceptLanguage.split(",")[0].split("-").join("-")
    : DEFAULT_LOCALE;

  // Use the preferred locale if supported, otherwise fallback to the default locale
  const locale = SUPPORTED_LOCALES.includes(preferredLocale)
    ? preferredLocale
    : DEFAULT_LOCALE;

  // Redirect to the localized path
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}