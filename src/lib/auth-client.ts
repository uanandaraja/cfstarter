import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()

export const { signIn, signOut, useSession } = authClient

export async function signOutAndRedirect() {
  await signOut()
  window.location.assign("/")
}

export function signInWithGoogle(callbackURL = "/app") {
  return signIn.social({
    provider: "google",
    callbackURL,
  })
}
