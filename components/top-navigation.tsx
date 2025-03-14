"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, MessageSquare, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Upload",
      href: "/upload",
      icon: Upload,
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2" />
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">ArxivLensAI</span>
          </Link>
        </div>

        <nav className="mx-auto hidden md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">API Keys</Link>
          </Button>
          <Button className="md:hidden" size="icon" variant="ghost">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

