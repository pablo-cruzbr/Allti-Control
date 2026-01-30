import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/" || pathname.includes(".")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);

    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    const res = await fetch(`${apiUrl}/users/detail`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return false;

    const data = await res.json();

    return !!data?.isAdmin;
  } catch (err) {
    console.error("Erro no fetch do middleware:", err);
    return false;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};