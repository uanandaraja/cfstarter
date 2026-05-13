import { Moon, Sun } from "@phosphor-icons/react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="relative grid size-4 place-items-center">
        <Sun
          className={cn(
            "absolute size-4 transition-[opacity,filter,scale] duration-300 ease-out",
            isDark
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]"
          )}
        />
        <Moon
          className={cn(
            "size-4 transition-[opacity,filter,scale] duration-300 ease-out",
            isDark
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0"
          )}
        />
      </span>
    </Button>
  )
}
