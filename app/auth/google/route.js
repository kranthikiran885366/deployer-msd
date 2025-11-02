import { NextResponse } from 'next/server'

export async function GET() {
  // Redirect to NextAuth Google provider
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const googleAuthUrl = `${baseUrl}/api/auth/signin/google`
  
  return NextResponse.redirect(googleAuthUrl)
}