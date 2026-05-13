import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: [".env.local", ".env"] })

function getEnvVar(name: string): string {
  return process.env[name] ?? ""
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: getEnvVar("CLOUDFLARE_ACCOUNT_ID"),
    databaseId: getEnvVar("CLOUDFLARE_DATABASE_ID"),
    token: getEnvVar("CLOUDFLARE_D1_TOKEN"),
  },
})
