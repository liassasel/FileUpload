import type * as React from "react"
import { ThemeToggle } from "@/components/common/atoms/theme-toggle"

interface PageLayoutProps {
    children: React.ReactNode
    title: string
    description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  )
}
