import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // শুধু নির্দিষ্ট কিছু পেজ (যেমন প্রোফাইল বা আপডেট) প্রোটেক্টেড থাকবে
  // বাকি সব পেজ (হোম, ক্যাটাগরি, প্রোডাক্ট ডিটেইলস) সবাই দেখতে পারবে
  const isProtectedPath = pathname.startsWith("/profile");

  // BetterAuth-এর কুকিজ চেক করা
  const sessionCookie = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token");

  if (isProtectedPath && !sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};