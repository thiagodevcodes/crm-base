import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROUTE_PERMISSIONS } from "@/constants/permissions";
import { canAccess } from "@/utils/canAccess";
import { UserRole } from "./constants/roles";


const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 🔒 Sem token
  if (!token) {
    if (pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  let payload: any;

  try {
    const verified = await jwtVerify(token, secret);
    payload = verified.payload;
  } catch {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  const userRoles: UserRole[] =
    payload.roles ??
    payload.scope?.split(" ") ??
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