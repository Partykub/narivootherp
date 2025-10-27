# Theme System Documentation

## Overview
ระบบ Theme (Dark/Light Mode) สำหรับ Narivoot ERP System ที่สร้างด้วย Design Tokens

## Features
- ✅ Light Theme และ Dark Theme
- ✅ ใช้ Design Tokens จาก globals.css
- ✅ บันทึก preference ใน localStorage
- ✅ รองรับ system preference
- ✅ Toggle button แบบ floating
- ✅ Smooth transitions

## การใช้งาน

### 1. Theme Context
```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### 2. Theme Toggle Button
Component `ThemeToggle` จะแสดงเป็น floating button ที่มุมล่างขวา

```tsx
import { ThemeToggle } from '@/components/ui/theme-toggle'

// ใช้ใน layout หรือ page
<ThemeToggle />
```

### 3. CSS Variables
ใช้ design tokens ที่จะเปลี่ยนตาม theme โดยอัตโนมัติ:

```css
/* Background Colors */
.bg-page { background-color: var(--color-background-page); }
.bg-surface { background-color: var(--color-background-surface); }

/* Text Colors */
.text-primary { color: var(--color-content-primary); }
.text-secondary { color: var(--color-content-secondary); }

/* Brand Colors */
.bg-brand-primary { background-color: var(--color-brand-primary); }
.text-brand-primary { color: var(--color-brand-primary); }
```

## Design Tokens

### Light Theme Colors
- Background: `#f9fafb` (gray-50)
- Surface: `#ffffff` (white)
- Primary Text: `#111827` (gray-900)
- Brand Primary: `#ec4899` (pink-500)

### Dark Theme Colors
- Background: `#030712` (gray-950)
- Surface: `#1f2937` (gray-900)
- Primary Text: `#f9fafb` (gray-50)
- Brand Primary: `#f472b6` (pink-400 - lighter)

## Implementation Details

### Files
- `/src/contexts/ThemeContext.tsx` - Theme context และ provider
- `/src/components/ui/theme-toggle.tsx` - Toggle button component
- `/src/app/globals.css` - Design tokens และ theme styles
- `/src/app/layout.tsx` - Theme provider integration

### Theme Detection Priority
1. localStorage (saved preference)
2. System preference (`prefers-color-scheme`)
3. Default to light theme

### CSS Selectors
Theme ใช้ทั้ง media query และ class-based selector:
- `@media (prefers-color-scheme: dark)` - Auto system preference
- `.dark` และ `[data-theme="dark"]` - Manual toggle

## Customization

### เปลี่ยนสี Brand
แก้ไขใน `globals.css`:
```css
:root {
  --color-brand-primary: #yourcolor;
}

.dark {
  --color-brand-primary: #yourlightercolor;
}
```

### เปลี่ยนตำแหน่ง Toggle Button
แก้ไข CSS class `.theme-toggle` ใน `globals.css`:
```css
.theme-toggle {
  bottom: 2rem;  /* เปลี่ยนตำแหน่ง */
  right: 2rem;   /* เปลี่ยนตำแหน่ง */
}
```

## Best Practices

1. **ใช้ Semantic Tokens**: ใช้ `var(--color-content-primary)` แทน `#111827`
2. **ตรวจสอบ Contrast**: ใช้เครื่องมือ contrast checker สำหรับ accessibility
3. **ทดสอบทั้ง 2 themes**: ตรวจสอบ UI ใน both light และ dark mode
4. **Avoid Hard-coded Colors**: หลีกเลี่ยงการใช้สีโดยตรง ให้ใช้ tokens แทน

## Future Enhancements
- [ ] เพิ่ม theme presets (เช่น high contrast, colorblind-friendly)
- [ ] Theme transition animations
- [ ] Per-component theme overrides
- [ ] Theme editor UI
