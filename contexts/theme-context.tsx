'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// Define the available color themes
export type ColorTheme = 'default' | 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'cyan' | 'pink' | 'white' | 'midnight' | 'ocean' | 'sunset' | 'forest' | 'lavender' | 'gold' | 'neon'

type ThemeContextType = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default')
  const [isDark, setIsDark] = useState(false)

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('color-theme') as ColorTheme
    if (savedColorTheme) {
      setColorTheme(savedColorTheme)
      document.documentElement.setAttribute('data-color-theme', savedColorTheme)
    }
  }, [])

  // Update isDark when theme changes
  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  // Save theme to localStorage and update data attribute when colorTheme changes
  useEffect(() => {
    localStorage.setItem('color-theme', colorTheme)
    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }, [colorTheme])

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider')
  }
  return context
}
