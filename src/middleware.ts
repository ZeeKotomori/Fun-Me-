import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const pathName = req.nextUrl.pathname;

    const isProtected = protectedRoutes.some(route => pathName.startsWith(route));

    if(isProtected){
        if(!token){
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (token.role !== "A") {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};