import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTE_PERMISSIONS } from "@/constants/permissions";
import { canAccess } from "@/utils/canAccess";
import jwt, { JwtPayload } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 1️⃣ Página de login
  if (pathname === "/admin") {
    if (!token) return NextResponse.next(); // sem token → mostra login
    return NextResponse.redirect(new URL("/admin/dashboard", req.url)); // com token → vai para dashboard
  }

  // 2️⃣ Rotas protegidas
  if (!token) return NextResponse.redirect(new URL("/admin", req.url));

  let payload: JwtPayload;
  
  try {
    payload = jwt.decode(token) as JwtPayload;
  } catch {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  const userRoles: string[] =
    payload?.roles ?? payload?.scope?.split(" ") ?? [];

  // 3️⃣ Encontra rota protegida
  const route = Object.keys(ROUTE_PERMISSIONS).find(r =>
    pathname.startsWith(r)
  );
  if (!route) return NextResponse.next(); // rota pública

  const allowedRoles = ROUTE_PERMISSIONS[route];

  // 4️⃣ Usuário sem permissão
  if (!canAccess(userRoles, allowedRoles)) {
    const dashboardRoles = ROUTE_PERMISSIONS["/admin/dashboard"] ?? [];
    if (canAccess(userRoles, dashboardRoles) && pathname !== "/admin/dashboard") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};