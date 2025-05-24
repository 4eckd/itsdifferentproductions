# Theming System

Its Different Productions features a comprehensive theming system with 6 unique color schemes and full light/dark mode support. This guide explains how to use and customize themes.

## 🎨 Available Themes

### Default Theme
The classic theme with neutral colors and professional appearance.

**Light Mode:**
- Primary: `hsl(0 0% 9%)`
- Background: `hsl(0 0% 100%)`
- Secondary: `hsl(0 0% 96.1%)`

**Dark Mode:**
- Primary: `hsl(0 0% 98%)`
- Background: `hsl(0 0% 3.9%)`
- Secondary: `hsl(0 0% 14.9%)`

### Purple Theme
Creative and artistic theme with purple accents.

**Light Mode:**
- Primary: `hsl(270 75% 60%)`
- Background: `hsl(270 100% 99%)`
- Secondary: `hsl(270 20% 96%)`

**Dark Mode:**
- Primary: `hsl(270 75% 60%)`
- Background: `hsl(270 30% 5%)`
- Secondary: `hsl(270 30% 15%)`

### Blue Theme
Professional and trustworthy theme with blue tones.

**Light Mode:**
- Primary: `hsl(210 100% 50%)`
- Background: `hsl(210 100% 99%)`
- Secondary: `hsl(210 20% 96%)`

**Dark Mode:**
- Primary: `hsl(210 100% 50%)`
- Background: `hsl(210 30% 5%)`
- Secondary: `hsl(210 30% 15%)`

### Green Theme
Natural and eco-friendly theme with green accents.

**Light Mode:**
- Primary: `hsl(150 80% 40%)`
- Background: `hsl(150 100% 99%)`
- Secondary: `hsl(150 20% 96%)`

**Dark Mode:**
- Primary: `hsl(150 80% 40%)`
- Background: `hsl(150 30% 5%)`
- Secondary: `hsl(150 30% 15%)`

### Amber Theme
Warm and energetic theme with amber/orange tones.

**Light Mode:**
- Primary: `hsl(40 95% 50%)`
- Background: `hsl(40 100% 99%)`
- Secondary: `hsl(40 20% 96%)`

**Dark Mode:**
- Primary: `hsl(40 95% 50%)`
- Background: `hsl(40 30% 5%)`
- Secondary: `hsl(40 30% 15%)`

### Red Theme
Bold and passionate theme with red accents.

**Light Mode:**
- Primary: `hsl(0 90% 50%)`
- Background: `hsl(0 100% 99%)`
- Secondary: `hsl(0 20% 96%)`

**Dark Mode:**
- Primary: `hsl(0 90% 50%)`
- Background: `hsl(0 30% 5%)`
- Secondary: `hsl(0 30% 15%)`

## 🔧 Implementation

### CSS Variables

Our theming system uses CSS variables for dynamic color switching:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
}
```

### Theme Context

The theme system is managed through React Context:

```typescript
import { useColorTheme } from '@/contexts/theme-context'

function MyComponent() {
  const { colorTheme, setColorTheme, isDark } = useColorTheme()
  
  return (
    <div>
      <p>Current theme: {colorTheme}</p>
      <p>Dark mode: {isDark ? 'Yes' : 'No'}</p>
      <button onClick={() => setColorTheme('purple')}>
        Switch to Purple
      </button>
    </div>
  )
}
```

### Theme Selector Component

Use the built-in theme selector for easy theme switching:

```typescript
import { ThemeSelector } from '@/components/theme-selector'

function Header() {
  return (
    <header>
      <nav>
        {/* Other navigation items */}
        <ThemeSelector />
      </nav>
    </header>
  )
}
```

## 🎯 Using Themes in Components

### Tailwind CSS Classes

Use semantic color classes that automatically adapt to themes:

```jsx
<div className="bg-background text-foreground">
  <h1 className="text-primary">Themed Heading</h1>
  <p className="text-muted-foreground">Themed text</p>
  <button className="bg-primary text-primary-foreground">
    Themed Button
  </button>
</div>
```

### Custom CSS with Variables

For custom styling, use CSS variables directly:

```css
.custom-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

.custom-component:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

### JavaScript/TypeScript

Access theme values programmatically:

```typescript
import { useColorTheme } from '@/contexts/theme-context'

function DynamicComponent() {
  const { colorTheme, isDark } = useColorTheme()
  
  const getThemeSpecificValue = () => {
    switch (colorTheme) {
      case 'purple':
        return isDark ? '#8b5cf6' : '#a855f7'
      case 'blue':
        return isDark ? '#3b82f6' : '#2563eb'
      case 'green':
        return isDark ? '#10b981' : '#059669'
      case 'amber':
        return isDark ? '#f59e0b' : '#d97706'
      case 'red':
        return isDark ? '#ef4444' : '#dc2626'
      default:
        return isDark ? '#ffffff' : '#000000'
    }
  }
  
  return (
    <div style={{ color: getThemeSpecificValue() }}>
      Dynamic themed content
    </div>
  )
}
```

## 🔄 Theme Persistence

Themes are automatically persisted using localStorage:

```typescript
// Theme is saved automatically when changed
setColorTheme('purple')

// Theme is restored on page load
useEffect(() => {
  const savedTheme = localStorage.getItem('color-theme')
  if (savedTheme) {
    setColorTheme(savedTheme as ColorTheme)
  }
}, [])
```

## 🎨 Creating Custom Themes

### Step 1: Define Color Palette

Create a new color palette following our structure:

```css
/* Custom Orange Theme */
[data-color-theme="orange"] {
  --background: 30 100% 99%;
  --foreground: 30 10% 5%;
  --primary: 30 95% 55%;
  --primary-foreground: 30 10% 98%;
  --secondary: 30 20% 96%;
  --secondary-foreground: 30 10% 20%;
  /* ... other variables */
}

.dark[data-color-theme="orange"] {
  --background: 30 30% 5%;
  --foreground: 30 10% 98%;
  --primary: 30 95% 55%;
  --primary-foreground: 30 10% 5%;
  --secondary: 30 30% 15%;
  --secondary-foreground: 30 10% 98%;
  /* ... other variables */
}
```

### Step 2: Update Theme Context

Add your theme to the ColorTheme type:

```typescript
export type ColorTheme = 'default' | 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'orange'
```

### Step 3: Update Theme Selector

Add your theme to the theme selector options:

```typescript
const colorThemes = [
  // ... existing themes
  { name: 'Orange', value: 'orange', lightPreview: '#fff7ed', darkPreview: '#7c2d12' },
]
```

## 📱 Mobile Considerations

All themes are optimized for mobile devices:

- **Touch-friendly** color contrasts
- **Readable** text in all lighting conditions
- **Consistent** appearance across devices
- **Accessible** color combinations

## ♿ Accessibility

Our theming system ensures accessibility compliance:

- **WCAG AA** contrast ratios maintained
- **Color blindness** friendly palettes
- **High contrast** mode support
- **Screen reader** compatible

### Contrast Ratios

All theme combinations meet WCAG AA standards:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Body text | 4.5:1+ | 4.5:1+ |
| Headings | 3:1+ | 3:1+ |
| Interactive elements | 3:1+ | 3:1+ |

## 🧪 Testing Themes

### Manual Testing

Test your components across all themes:

```bash
# Start the theme demo page
npm run dev
# Navigate to /theme-demo
```

### Automated Testing

Include theme testing in your test suite:

```typescript
import { render } from '@testing-library/react'
import { ColorThemeProvider } from '@/contexts/theme-context'

const themes: ColorTheme[] = ['default', 'purple', 'blue', 'green', 'amber', 'red']

themes.forEach(theme => {
  test(`Component renders correctly with ${theme} theme`, () => {
    render(
      <ColorThemeProvider>
        <YourComponent />
      </ColorThemeProvider>
    )
    // Test theme-specific behavior
  })
})
```

## 📚 Best Practices

1. **Use semantic colors** instead of hardcoded values
2. **Test all themes** during development
3. **Consider accessibility** in custom themes
4. **Maintain consistency** across components
5. **Document custom themes** for team members

---

**Next Steps:**
- [Component Library](./components.md)
- [Typography System](./typography.md)
- [Color Palette Reference](./colors.md)
