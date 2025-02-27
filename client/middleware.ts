import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('.AspNetCore.Identity.Application')?.value;

    const { pathname } = request.nextUrl

    if (pathname.includes('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname === '/register' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/login', '/register', '/portfolio']
}
