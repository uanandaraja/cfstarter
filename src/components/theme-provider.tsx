import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

const THEME_STORAGE_KEY = "saas-starter:theme"
const THEMES = ["light", "dark"] as const

type Theme = (typeof THEMES)[number]

type ThemeProviderContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContext | null>(null)

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  return storedTheme === "dark" ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const storedTheme = getStoredTheme()
    setThemeState(storedTheme)
    applyTheme(storedTheme)
  }, [])

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme)
    applyTheme(nextTheme)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }

  function toggleTheme() {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark"
      applyTheme(nextTheme)
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      return nextTheme
    })
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
