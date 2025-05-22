import { NextResponse } from 'next/server';

const PRIVATE_PATHS = ['/projects', '/users', '/addproject', '/user','/home'];

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const path = request.nextUrl.pathname;

  const isPrivatePath = PRIVATE_PATHS.some((privatePath) =>
    path.startsWith(privatePath)
  );

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (token && (path === '/signin' || path === '/')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!token && path === '/') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }


  return NextResponse.next();
}
export const config = {
  matcher: [
    '/',
    '/signin',
    '/projects/:path*',
    '/users/:path*',
    '/addproject',
    '/user/:path*',
  ],
};