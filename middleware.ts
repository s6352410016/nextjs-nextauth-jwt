import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname === "/feed" || req.nextUrl.pathname === "/find-people") {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/otp-verify" || req.nextUrl.pathname === "/reset-password") {
    if (!req.cookies.get("emailVerify")?.value) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
};

export const config = {
  matcher: ["/feed", "/otp-verify", "/reset-password", "/find-people"],
}