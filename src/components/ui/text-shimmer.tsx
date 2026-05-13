import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type TextShimmerProps = {
  children: ReactNode
  className?: string
  duration?: number
}

export function TextShimmer({ children, className, duration = 2 }: TextShimmerProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <span className="text-[var(--shimmer-base)]">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent,var(--shimmer-highlight),transparent)] bg-[length:200%_100%] bg-clip-text text-transparent"
        style={{ animation: `text-shimmer ${duration}s linear infinite` }}
      >
        {children}
      </span>
    </span>
  )
}
