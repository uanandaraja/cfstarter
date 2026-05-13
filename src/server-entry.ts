import type { Register } from "@tanstack/react-router"
import type { RequestHandler } from "@tanstack/react-start/server"
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server"
import { createServerEntry } from "@tanstack/react-start/server-entry"

const fetch = createStartHandler(defaultStreamHandler)

type ServerEntry = { fetch: RequestHandler<Register> }

export default createServerEntry({ fetch } satisfies ServerEntry)
