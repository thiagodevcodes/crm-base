import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin";

  // ❌ Não logado tentando acessar área protegida
  if (isAdmin && !isLogin && !token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔁 Logado tentando acessar login
  if (isLogin && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};