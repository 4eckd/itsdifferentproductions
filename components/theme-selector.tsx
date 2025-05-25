'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Laptop, Palette } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { useColorTheme, type ColorTheme } from '@/contexts/theme-context'

const colorThemes = [
  { name: 'Default', value: 'default', lightPreview: '#ffffff', darkPreview: '#1a1a1a' },
  { name: 'Purple', value: 'purple', lightPreview: '#f5f3ff', darkPreview: '#2e1065' },
  { name: 'Blue', value: 'blue', lightPreview: '#eff6ff', darkPreview: '#172554' },
  { name: 'Green', value: 'green', lightPreview: '#f0fdf4', darkPreview: '#14532d' },
  { name: 'Amber', value: 'amber', lightPreview: '#fffbeb', darkPreview: '#78350f' },
  { name: 'Red', value: 'red', lightPreview: '#fef2f2', darkPreview: '#7f1d1d' },
  { name: 'Cyan', value: 'cyan', lightPreview: '#ecfeff', darkPreview: '#164e63' },
  { name: 'Pink', value: 'pink', lightPreview: '#fdf2f8', darkPreview: '#831843' },
  { name: 'Pure White', value: 'white', lightPreview: '#ffffff', darkPreview: '#f8f9fa' },
  { name: 'Midnight', value: 'midnight', lightPreview: '#1e293b', darkPreview: '#0f172a' },
  { name: 'Ocean', value: 'ocean', lightPreview: '#e0f2fe', darkPreview: '#0c4a6e' },
  { name: 'Sunset', value: 'sunset', lightPreview: '#fff7ed', darkPreview: '#9a3412' },
  { name: 'Forest', value: 'forest', lightPreview: '#ecfdf5', darkPreview: '#064e3b' },
  { name: 'Lavender', value: 'lavender', lightPreview: '#faf5ff', darkPreview: '#581c87' },
  { name: 'Gold', value: 'gold', lightPreview: '#fffbeb', darkPreview: '#92400e' },
  { name: 'Neon', value: 'neon', lightPreview: '#f0fdf4', darkPreview: '#1a1a1a' },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
              {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
              {theme === 'system' && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme('light')}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <span className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme('dark')}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <span className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme('system')}
        >
          <Laptop className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && (
            <span className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Color Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-56">
              {colorThemes.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  className="flex items-center gap-2"
                  onClick={() => setColorTheme(item.value as ColorTheme)}
                >
                  <div className="flex h-5 w-5 items-center justify-center">
                    <div className="flex h-4 w-4 rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full w-1/2"
                        style={{ backgroundColor: item.lightPreview }}
                      />
                      <div
                        className="h-full w-1/2"
                        style={{ backgroundColor: item.darkPreview }}
                      />
                    </div>
                  </div>
                  <span>{item.name}</span>
                  {colorTheme === item.value && (
                    <span className="ml-auto">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
