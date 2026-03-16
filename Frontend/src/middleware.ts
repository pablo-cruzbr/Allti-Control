import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/AreadeUsuario")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);

    if (!isValid) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("session");
      response.cookies.delete("role"); 
      return response;
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3334";
    
    const res = await fetch(`${apiUrl}/users/detail`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(3000), 
    });

    if (!res.ok) return false;

    const data = await res.json();
    return !!data?.id; 

  } catch (err) {
    console.error("❌ Middleware Auth Error (Backend Offline?):", err);
    return false;
  }
}
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/AreadeUsuario/:path*"
  ], 
};