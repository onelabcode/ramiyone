import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const userCookie = request.cookies.get("accessToken")?.value;

  let user = null;

  if (userCookie) {
    try {
      const { payload } = await jwtVerify(
        userCookie,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_KEY)
      );
      user = payload; 
    } catch (error) {
      console.error("Token verification failed:", error.message);
      user = null;
    }
  }
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith("/auth/login")||url.pathname.startsWith("/auth/signup")) {
    if (user) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  if (url.pathname.startsWith("/auth/profile")) {
    if (user){
    if (user.role==='scout'||user.role==='coach') {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/signup","/auth/login","/auth/profile/:path*"],
};
