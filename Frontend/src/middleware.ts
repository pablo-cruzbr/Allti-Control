import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/" || 
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("Middleware: Sem token, redirecionando para Home");
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);

    if (!isValid) {
      console.log("Middleware: Token inválido, limpando e redirecionando");
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("session"); // Limpa o cookie problemático
      return response;
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("ERRO: NEXT_PUBLIC_API_URL não definida!");
      return false;
    }
    
    const res = await fetch(`${apiUrl}/users/detail`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(5000), 
    });

    if (!res.ok) return false;

    const data = await res.json();
    return !!data?.id; 

  } catch (err) {
    console.error("Middleware Fetch Error:", err);
    return false;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/AreadeUsuario/:path*"], 
};