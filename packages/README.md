# Shared Packages Workspace
**Version:** 0.1.0  
**Date:** 2025-10-23  
**Owner:** Cross-Functional Platform Team  

## Scope
- เก็บโค้ดที่แชร์ระหว่าง frontend/backend เช่น domain model, validation schema, utility, design token
- รองรับการเผยแพร่ผ่าน `pnpm` workspace และซิงก์ version ตาม Semantic Versioning ภายใน
- ปรับใช้แนวทาง Clean Architecture และ DDD ตาม `docs/02-architecture/ArchitectureDesign.md`

## ตัวอย่างโมดูลที่วางแผนไว้
- `packages/domain/*` – โครงสร้าง entity/value object ที่ใช้ร่วมกัน
- `packages/config/*` – การจัดการ environment + schema validation
- `packages/ui/*` – Component library (ใช้โดย Next.js และเอกสาร design system)

## งานต่อเนื่อง
- [ ] สร้าง scaffolding สำหรับ `packages/config` (Zod schema) รองรับ `.env`
- [ ] เตรียม design token package ให้ Next.js + Storybook/Docs ใช้ร่วมกัน
- [ ] ออกแบบ strategy สำหรับการ publish package ภายใน (ถ้าจำเป็น)
