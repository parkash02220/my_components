
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/signin', '/signup', '/auth/callback','/google-success'];

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  console.log("::token in middleware",token)
  const path = request.nextUrl.pathname;
  console.log("::path in middleware",request)
  const isPublicPath = PUBLIC_PATHS.includes(path) || path.startsWith('/auth') || path.startsWith('/google'); 

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
