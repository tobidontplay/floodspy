import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AlertTriangle, Home, Video } from "lucide-react"

export function MainNav() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <AlertTriangle size={20} />
          </div>
          <Link href="/" className="text-xl font-bold">
            FloodSpy
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
          <Link href="/feed">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Relief Feed</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}

