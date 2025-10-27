"use client"

import { createContext, useContext } from "react"

type ColorModeContextType = {
  colorMode: "light" | "dark"
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  // For now, just provide light mode - can be enhanced later
  const value = {
    colorMode: "light" as const,
    toggleColorMode: () => {},
  }

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}