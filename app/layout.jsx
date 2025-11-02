import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

export const metadata = {
  title: "CloudDeck",
  description: "Unified Cloud Dashboard",
  generator: "v0.app",
}

function CloudDeckHeader() {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="text-blue-500 text-xl">⚡</div>
              <span className="text-white font-semibold text-lg">CloudDeck</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Integrations</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Pricing</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">⚡</span> Status
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">?</span> Help
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Sign in</a>
            <a href="/signup" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Sign up</a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
              Get started <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-black text-white min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Suspense fallback={null}>
            <CloudDeckHeader />
            <main className="bg-black min-h-screen">
              {children}
            </main>
            <Toaster />
            {!process.env.NEXT_PUBLIC_DISABLE_VERCEL_ANALYTICS && <Analytics />}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}