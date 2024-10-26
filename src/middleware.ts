import { NextResponse } from 'next/server'

export function middleware(request: NextResponse) {
  console.log('中间件 ')

  return NextResponse.redirect(new URL('/blog/yayu_middleware', request.url))
}

export const config = {
  matcher: '/blog/yayu',
}
