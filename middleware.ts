import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { importJWK, jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')
        const secretJWK = {
            kty: 'oct',
            k: 'EN5DHZ8ZX4EU+khjhtfw0A==' // Replace with your actual base64 encoded secret key
          }
      
          console.log('token', token.value)
          console.log('secretJWK', 'EN5DHZ8ZX4EU+khjhtfw0A==')
      
          const secretKey = await importJWK(secretJWK, 'HS256')
          const { payload } = await jwtVerify(token.value, secretKey)
          const requestHeaders = new Headers(request.headers)
          requestHeaders.set('user', JSON.stringify({ email: payload.email }))
      
          const response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          })
          return response
    }
    catch (error) {
        console.log('Error middleware', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/todo/:path*',
}