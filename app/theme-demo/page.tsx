'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useColorTheme, type ColorTheme } from '@/contexts/theme-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeSelector } from '@/components/theme-selector'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function ThemeDemoPage() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()
  const [sliderValue, setSliderValue] = useState([33])

  const colorThemes: { name: string; value: ColorTheme }[] = [
    { name: 'Default', value: 'default' },
    { name: 'Purple', value: 'purple' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Amber', value: 'amber' },
    { name: 'Red', value: 'red' },
  ]

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Theme Customization</h1>
        <p className="text-muted-foreground">
          Customize the appearance of the application by selecting different themes and color schemes.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <span className="text-sm text-muted-foreground">
            Current theme: <span className="font-medium text-foreground">{theme}</span> / 
            <span className="font-medium text-foreground ml-1">{colorTheme}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Themes</CardTitle>
            <CardDescription>
              Choose a color theme that matches your brand or personal preference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {colorThemes.map((item) => (
                <Button
                  key={item.value}
                  variant={colorTheme === item.value ? 'default' : 'outline'}
                  className="h-20 flex flex-col gap-1"
                  onClick={() => setColorTheme(item.value)}
                >
                  <span className="text-xs">{item.name}</span>
                  <div className="flex gap-1">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ 
                        backgroundColor: 
                          item.value === 'default' ? 'hsl(0 0% 9%)' :
                          item.value === 'purple' ? 'hsl(270 75% 60%)' :
                          item.value === 'blue' ? 'hsl(210 100% 50%)' :
                          item.value === 'green' ? 'hsl(150 80% 40%)' :
                          item.value === 'amber' ? 'hsl(40 95% 50%)' :
                          'hsl(0 90% 50%)'
                      }} 
                    />
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ 
                        backgroundColor: 
                          item.value === 'default' ? 'hsl(0 0% 96.1%)' :
                          item.value === 'purple' ? 'hsl(270 20% 96%)' :
                          item.value === 'blue' ? 'hsl(210 20% 96%)' :
                          item.value === 'green' ? 'hsl(150 20% 96%)' :
                          item.value === 'amber' ? 'hsl(40 20% 96%)' :
                          'hsl(0 20% 96%)'
                      }} 
                    />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setColorTheme('default')}>Reset to Default</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mode Preference</CardTitle>
            <CardDescription>
              Choose between light, dark, or system preference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={theme} onValueChange={(value) => setTheme(value)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8">Theme Preview</h2>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Preview of form elements with the current theme.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI Elements</CardTitle>
            <CardDescription>Preview of UI elements with the current theme.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
