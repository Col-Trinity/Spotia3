import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_PAGES = ['/', '/es/login', '/en/login'];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const pathname = req.nextUrl.pathname;

    // Si ya está logueado y visita la home o el login, redirigir al dashboard
    if (token && AUTH_PAGES.includes(pathname)) {
        const locale = ['es', 'en'].includes(pathname.split('/')[1]) ? pathname.split('/')[1] : 'es';
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    // Si no está logueado e intenta acceder al dashboard, redirigir al login
    if (!token && !AUTH_PAGES.includes(pathname)) {
        const locale = pathname.split('/')[1] || 'es';
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/es/login', '/en/login', '/es/dashboard/:path*', '/en/dashboard/:path*'],
};
