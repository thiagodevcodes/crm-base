import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin";

  // 🔒 Não autenticado tentando acessar área protegida
  if (isAdminRoute && !isLoginRoute && !token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔁 Autenticado tentando acessar login
  if (isLoginRoute && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};