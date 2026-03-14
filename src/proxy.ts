import { NextResponse, type NextRequest } from 'next/server'
import { authMiddleware } from './app/middlewares/auth'
import { allowIfAuthenticatedMiddleware } from './app/middlewares/allowIfAuthenticated'

export async function  proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if(pathname.startsWith('/verify-user')){
        return allowIfAuthenticatedMiddleware(request)
    }

    const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse && authResult.headers.get("location")) {
  return authResult; // this is a redirect
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|images|api/auth|.*\\..*).*)',
  ],
};

