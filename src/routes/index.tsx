import { ArrowRight, Cloud, Database, Moon, ShieldCheck, Sparkle, Sun } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"

import { AuthModalTrigger } from "@/components/auth/auth-modal"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({ component: LandingPage })

function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <section className="mx-auto flex min-h-svh max-w-6xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkle weight="fill" className="size-4" />
            </div>
            CF Starter
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthModalTrigger>
              <Button variant="outline">Sign in</Button>
            </AuthModalTrigger>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm">
              TanStack Start + Cloudflare foundation
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Ship the product, not the boilerplate.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Auth, D1, Drizzle, Tailwind CSS, shadcn components, protected routes, TanStack Query, and Cloudflare deployment are wired from day one.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AuthModalTrigger>
                <Button size="lg" className="h-11 px-5 text-sm">
                  Start building
                  <ArrowRight className="size-4" />
                </Button>
              </AuthModalTrigger>
              <a
                href="https://tanstack.com/start"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Read TanStack Start docs
              </a>
            </div>
          </div>

          <Card className="relative overflow-hidden border-primary/20 bg-card/90 shadow-2xl shadow-primary/10">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-info to-success" />
            <CardHeader>
              <CardTitle>Included stack</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Feature icon={<Cloud className="size-5" />} title="Cloudflare native" description="Workers deploy target with D1 binding and Wrangler config." />
              <Feature icon={<Database className="size-5" />} title="Drizzle schema" description="Better Auth tables plus organization, membership, and subscription models." />
              <Feature icon={<ShieldCheck className="size-5" />} title="Google auth" description="Better Auth route handlers, client helpers, and protected app route." />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="relative grid size-4 place-items-center">
        <Sun className={cn("absolute size-4 transition-[opacity,filter,scale] duration-300 ease-out", isDark ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]")} />
        <Moon className={cn("size-4 transition-[opacity,filter,scale] duration-300 ease-out", isDark ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0")} />
      </span>
    </Button>
  )
}

function Feature({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-background/70 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div>
        <h2 className="font-medium tracking-tight">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
