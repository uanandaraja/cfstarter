import { SignOut } from "@phosphor-icons/react"
import { createFileRoute, redirect } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signOutAndRedirect } from "@/lib/auth-client"
import { getSession } from "@/server/functions/auth.functions"

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    const session = await getSession()

    if (!session?.user) {
      throw redirect({ to: "/", search: { redirectTo: "/app" } })
    }

    return { session }
  },
  component: AppPage,
})

function AppPage() {
  const { session } = Route.useRouteContext()

  return (
    <main className="min-h-svh bg-muted/30 text-foreground">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div>
            <p className="text-sm text-muted-foreground">Workspace</p>
            <h1 className="font-semibold tracking-tight">SaaS Starter</h1>
          </div>
          <Button variant="outline" onClick={() => void signOutAndRedirect()}>
            <SignOut className="size-4" />
            Sign out
          </Button>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Welcome, {session.user.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Replace this protected dashboard with your product. Auth, routing, query client, and Cloudflare bindings are already in place.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>{session.user.email}</p>
            <p>User ID: {session.user.id}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
