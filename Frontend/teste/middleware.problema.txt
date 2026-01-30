import { NextRequest, NextResponse } from "next/server";
import { api } from "./services/api";

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
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  try {
    const response = await api.get("/users/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.isAdmin !== true) {
      console.log("ACESSO NEGADO: Usuário não é ADMIN");
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERRO NA VALIDAÇÃO DO TOKEN:", err);
    return false;
  }
}

// Configuração do Matcher para performance
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};