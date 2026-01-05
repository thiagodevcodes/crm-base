import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ROUTE_PERMISSIONS } from "./constants/permissions";
import { canAccess } from "./utils/canAccess";


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 🔹 Permite login
  if (pathname === "/admin" || pathname === "/admin/login") {
    if (!token) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 🔹 Sem token → login
  if (!token) return NextResponse.redirect(new URL("/admin", req.url));

  // 🔹 Decodifica token
  let payload: JwtPayload;
  try {
    payload = jwt.decode(token) as JwtPayload;
  } catch {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔹 Extrai permissões
  const userPermissions: string[] = payload?.permissions ?? [];

  // 🔹 Usuário sem permissões → login
  if (userPermissions.length === 0) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔹 Descobre rota protegida
  const route = Object.keys(ROUTE_PERMISSIONS).find(r =>
    pathname.startsWith(r)
  );

  if (!route) return NextResponse.next(); // rota pública

  const allowedPermissions = ROUTE_PERMISSIONS[route];

  // 🔹 Usuário sem acesso → dashboard ou login
  if (!canAccess(userPermissions, allowedPermissions)) {
    const dashboardPermissions = ROUTE_PERMISSIONS["/admin/dashboard"] ?? [];

    if (canAccess(userPermissions, dashboardPermissions) && pathname !== "/admin/dashboard") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // ❌ Usuário não tem acesso a nada → login
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ✅ Usuário tem permissão → deixa passar
  return NextResponse.next();
}

// 🔹 Matcher: todas rotas admin
export const config = {
  matcher: ["/admin/:path*"],
};