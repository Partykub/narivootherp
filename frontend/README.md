# 🎨 Narivoot ERP Frontend

โปรเจ็กต์ frontend สำหรับระบบ Narivoot ERP พร้อม **Complete Design System** ที่สร้างด้วยเทคโนโลยีล่าสุด

## 🏆 **Status: Production Ready Design System**

✅ **50+ FontAwesome Icons** - Professional icon system  
✅ **WCAG 2.1 AA Compliant** - Accessibility standards  
✅ **Modern Gradients** - Beautiful visual design  
✅ **Atomic Design** - Complete component hierarchy  
✅ **Comprehensive Docs** - Guidelines & best practices  

## 🚀 **Complete Tech Stack**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript 5+** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS with modern gradients
- **Chakra UI v3** - Modular and accessible component library
- **FontAwesome 6.6** - Professional icon system (50+ icons)
- **ESLint 9+** - Code linting and best practices

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm หรือ bun

## 🛠️ Installation

```bash
# ติดตั้ง dependencies
npm install

# หรือใช้ yarn
yarn install

# หรือใช้ pnpm
pnpm install
```

## 🏃‍♂️ Development

```bash
# รัน development server
npm run dev

# หรือ
yarn dev

# หรือ
pnpm dev

# หรือ
bun dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 🏗️ Build

```bash
# สร้าง production build
npm run build

# รัน production server
npm start
```

## 🎨 Styling

โปรเจ็กต์นี้ใช้ Tailwind CSS และ Chakra UI ร่วมกัน:

### Tailwind CSS
```tsx
// Utility classes
<div className="flex items-center justify-center bg-blue-500 text-white p-4 rounded-lg">
  Content
</div>
```

### Chakra UI
```tsx
// Component-based approach
<Button colorScheme="blue" size="lg">
  Click me
</Button>
```

### Mixed Approach
```tsx
// ใช้ทั้งสองแบบร่วมกัน
<Box className="shadow-lg hover:shadow-xl transition-shadow">
  <Button colorScheme="blue">Chakra Button</Button>
</Box>
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # Reusable components
│       └── ui/              # UI components
│           ├── provider.tsx # Chakra UI provider
│           └── color-mode.tsx # Color mode context
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## � **Design System Features**

### 📚 **Live Documentation**
- **Design System Hub**: [http://localhost:3000/design-system](http://localhost:3000/design-system)
- **Complete Guidelines**: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- **Rules & Best Practices**: [`DESIGN_GUIDELINES.md`](DESIGN_GUIDELINES.md)

### �🎯 **Icon System** (50+ FontAwesome Icons)
```tsx
// Professional icons replacing all emoji
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

<button className="flex items-center gap-2">
  <FontAwesomeIcon icon={faPlus} />
  เพิ่มรายการ
</button>
```

### 🌈 **Modern Color System**
```tsx
// WCAG 2.1 AA compliant badges
<span className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-sm">
  Active
</span>

// Modern gradient buttons
<button className="bg-linear-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
  Primary Action
</button>
```

### 🏗️ **Atomic Design Structure**
- **Atoms**: Buttons, badges, icons, typography
- **Molecules**: Form fields, search boxes, card headers
- **Organisms**: Navigation, forms, data tables
- **Templates**: Page layouts, dashboard templates
- **Pages**: Complete user interfaces

## 🎯 **Technical Features**

- ✅ Next.js 15 with App Router
- ✅ TypeScript 5+ support  
- ✅ Tailwind CSS v4 with gradients
- ✅ Chakra UI v3 components
- ✅ FontAwesome 6.6 icon system
- ✅ ESLint 9+ configuration
- ✅ Responsive mobile-first design
- ✅ Dark mode support (via Chakra UI)
- ✅ Optimized font loading (Inter)
- ✅ WCAG 2.1 AA accessibility
- ✅ Modern gradient backgrounds
- ✅ Professional shadow effects
- ✅ Smooth transitions & animations

## 🔧 Configuration

### Chakra UI Theme
แก้ไขไฟล์ `src/components/ui/provider.tsx` เพื่อปรับแต่ง theme:

```tsx
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Inter, sans-serif' },
        body: { value: 'Inter, sans-serif' },
      },
      colors: {
        // เพิ่มสีของคุณเอง
      }
    },
  },
})
```

### Tailwind CSS
แก้ไขไฟล์ `tailwind.config.ts` เพื่อปรับแต่งการตั้งค่า

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://v3.chakra-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🚀 Deployment

### Vercel (แนะนำ)
```bash
npm run build
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
