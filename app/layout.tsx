import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { TopNavigation } from "@/components/top-navigation"
import "./globals.css"

export const metadata = {
  title: "AI Research Assistant",
  description: "AI-powered personal research assistant for academic papers",
    generator: 'v0.dev'
}

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                    <TopNavigation />
                  </div>
                  <main className="flex-1 overflow-x-hidden mt-16"> {/* Added margin-top to account for fixed header */}
                    <div className="container mx-auto py-4">{children}</div>
                  </main>
                </div>
              </div>
              <Toaster />
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'