import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Agar user ke paas token NAHI hai (Not Logged In)
  if (!token) {
    // Aur wo signin ya signup page par NAHI hai, toh use signin par bhejo
    if (path !== '/signin' && path !== '/signup') {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Agar user ke paas token HAI (Logged In)
  if (token) {
    // Aur wo galti se wapas signin ya signup par ja raha hai, toh use dashboard par bhejo
    if (path === '/signin' || path === '/signup') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Baaki sab theek hai, user ko aage badhne do
  return NextResponse.next();
}

// Matcher me dhyan se wo saare routes daalein jinpe ye logic chalna chahiye
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/dashboard/:path*' // Dashboard aur uske andar ke saare routes
  ]
};