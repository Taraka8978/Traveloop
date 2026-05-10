import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'super-secret-key-for-traveloop';
const encodedKey = new TextEncoder().encode(secretKey);

// Define protected routes here
const protectedRoutes = ['/dashboard', '/trips'];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      await jwtVerify(token, encodedKey, {
        algorithms: ['HS256'],
      });
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      try {
        await jwtVerify(token, encodedKey, { algorithms: ['HS256'] });
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (error) {
        // Invalid token, allow them to stay on login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
