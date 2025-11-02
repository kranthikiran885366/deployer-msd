import { NextResponse } from 'next/server'

export async function GET() {
  // Redirect to NextAuth GitHub provider
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const githubAuthUrl = `${baseUrl}/api/auth/signin/github`
  
  return NextResponse.redirect(githubAuthUrl)
}