# Frontend Platform Workspace
**Version:** 0.1.0  
**Date:** 2025-10-23  
**Owner:** Frontend Engineering Guild  

## Scope
- เตรียมพื้นที่สำหรับ Next.js 15 + TypeScript (SCRUM-12) ตามแนวคิด Atomic Design
- รวม design token, UI component library และเพจ `/design-system`
- รองรับการทดสอบด้วย Jest/Vitest + Playwright/Cypress ตาม `PROJECT_INSTRUCTION.md`

## โครงสร้างที่คาดหวัง (ระยะถัดไป)
```
frontend/
├── apps/erp-web/         # Next.js App Router project
├── packages/ui/          # Shared UI component library
├── styles/               # Global styles + design token
├── test/                 # Unit/UI tests
└── README.md
```

> หมายเหตุ: Ticket `SCRUM-12` และ `SCRUM-13` จะเติมเนื้อหา (scaffold Next.js, design system documentation)

## งานต่อเนื่อง
- [ ] สร้างโครงสร้าง Atomic Design (atoms → templates) พร้อมตัวอย่าง component
- [ ] ตั้งค่า ESLint/Prettier/Stylelint + testing framework
- [ ] ผูกรวม design token, theme provider และ accessibility guideline
