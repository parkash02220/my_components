
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/signin', '/signup', '/auth/callback'];

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;

  const path = request.nextUrl.pathname;
  const isPublicPath = PUBLIC_PATHS.includes(path) || path.startsWith('/auth');

  if (!token && (!isPublicPath ||  request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (token && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/') ) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$|.*\\.webp$|.*\\.gif$).*)',
  ],
};
