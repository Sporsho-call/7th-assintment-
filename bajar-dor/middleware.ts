import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // সাইন-ইন, সাইন-আপ এবং পাবলিক ফাইলগুলোতে যেতে বাধা দেওয়া যাবে না
  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // বেটার-অথ (BetterAuth) সেশন কুকি চেক করা
  const sessionCookie = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token");

  // যদি লগইন করা না থাকে, সরাসরি /signin-এ পাঠিয়ে দেবো
  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * নিচের পাথগুলো বাদ দিয়ে বাকি সব পেজে লগইন বাধ্যতামূলক করা হলো
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)",
  ],
};