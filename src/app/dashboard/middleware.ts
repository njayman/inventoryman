import { ADMIN_AUTH_COOKIE } from "@/utils/constants";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get(ADMIN_AUTH_COOKIE);

  const url = new URL(req.url);

  if (!isLoggedIn && url.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
