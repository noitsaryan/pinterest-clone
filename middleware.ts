import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith("/profile")) {
        let cookie = request.cookies.has("pintrest-user") && request.cookies.has("pintrest-session");
        if (cookie) return;
        return NextResponse.rewrite(new URL('/sign-in', request.url))
    }
    if (request.nextUrl.pathname.startsWith("/sign-in")) {
        let cookie = request.cookies.has("pintrest-user") && request.cookies.has("pintrest-session");
        if (!cookie) return;
        return NextResponse.rewrite(new URL('/profile', request.url))
    }
    if (request.nextUrl.pathname.startsWith("/create")) {
        let cookie = request.cookies.has("pintrest-user") && request.cookies.has("pintrest-session");
        if (cookie) return;
        return NextResponse.rewrite(new URL('/sign-in', request.url))
    }
}

export const config = {
    matcher: ['/profile/:path*', '/sign-in', '/create']
}