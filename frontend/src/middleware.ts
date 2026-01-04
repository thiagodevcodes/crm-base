import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ROUTE_PERMISSIONS } from "@/constants/permissions";
import { canAccess } from "@/utils/canAccess";
import { Role } from "@/constants/roles";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 🔒 sem token
  if (!token) {
    if (pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  const decoded: any = jwt.decode(token);

  const userRoles: Role[] =
    decoded?.roles ??
    decoded?.scope?.split(" ") ??
    [];

  const route = Object.keys(ROUTE_PERMISSIONS).find(r =>
    pathname.startsWith(r)
  );

  if (!route) return NextResponse.next();

  const allowedRoles = ROUTE_PERMISSIONS[route];

  if (
    !canAccess(userRoles, allowedRoles) &&
    pathname !== "/admin/dashboard"
  ) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};