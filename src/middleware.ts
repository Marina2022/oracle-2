import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    })
  }

  const credentials = Buffer.from(auth.slice(6), 'base64').toString()
  const [username, password] = credentials.split(':')

  // Замените 'your_username' и 'your_password' на свои значения
  const validUsername = 'admin'  // Ваш логин
  const validPassword = 'oracul54321'  // Ваш пароль

  if (username !== validUsername || password !== validPassword) {
    return new Response('Invalid credentials', { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}