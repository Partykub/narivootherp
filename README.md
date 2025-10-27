# Narivootherp – School ERP System

เอกสารและซอร์สโค้ดของโครงการ School ERP ที่รวบรวม requirement, สถาปัตยกรรม, ขั้นตอน SDLC และแนวทางสำคัญอย่างเป็นระบบ พร้อม **Frontend Design System** ที่ complete และ production-ready

## 🎉 **Project Status: Phase 2 Complete**

✅ **Infrastructure Setup** - Next.js 15 + TypeScript + Tailwind + Chakra UI  
✅ **Design System** - 50+ FontAwesome icons, WCAG 2.1 AA compliant, modern gradients  
✅ **Documentation** - Comprehensive guidelines และ best practices  
🚧 **Next Phase** - Business logic implementation

## โครงสร้างที่เก็บข้อมูล

```
backend/                                # 🚧 พื้นที่เตรียม NestJS + Prisma (SCRUM-11)
frontend/                               # ✅ Next.js 15 + Complete Design System (SCRUM-12)
├── src/app/design-system/             # 🎨 Design System Documentation Hub
├── src/components/design-system/      # 📚 50+ FontAwesome icons, modern components
├── DESIGN_SYSTEM.md                   # 📖 Complete documentation
├── DESIGN_GUIDELINES.md               # 📋 Rules & best practices
└── PROJECT_STATUS.md                  # 📊 Development status
infra/                                  # 🚧 Workspace สำหรับ Docker Compose, CI/CD, IaC (SCRUM-15, SCRUM-17)
packages/                               # 🚧 ไลบรารี/โมดูลที่แชร์ระหว่าง service
docs/
├── 00-guidelines/
│   └── PROJECT_INSTRUCTION.md          # กติกาการทำงานของเอเจนต์/ทีม
├── 01-requirements/
│   ├── PRD.md                          # Product Requirements Document
│   ├── SRS.md                          # Software Requirements Specification
│   ├── USE_CASES.md                    # รายละเอียด Use Case หลัก
│   └── UserScenario.md                 # สถานการณ์การใช้งานตาม persona
├── 02-architecture/
│   └── ArchitectureDesign.md           # สถาปัตยกรรมเชิงตรรกะ/กายภาพ + NFR
├── 03-process/
│   ├── SDLC_Overview.md                # ขั้นตอนและ stage-gate ของ SDLC
│   └── Epic_Task_Backlog.md            # รายการ Epic/Task เชื่อมโยง requirement
└── diagrams/
    └── ERD.md                          # Mermaid ER diagram โครงสร้างข้อมูลหลัก

data/
└── legacy/
    └── microsoft_access_db/            # ฐานข้อมูล Microsoft Access เดิม (ต้นทาง migration)
```

> เพิ่ม diagram ใหม่เก็บไว้ที่ `docs/diagrams/` (Mermaid + Draw.io) ตามคำแนะนำใน `docs/00-guidelines/PROJECT_INSTRUCTION.md`

## วิธีเริ่มต้นอ่านเอกสาร
1. **`docs/01-requirements/PRD.md`** – เข้าใจเป้าหมายธุรกิจ ขอบเขต และตัวชี้วัด
2. **`docs/01-requirements/SRS.md`** – รายละเอียด functional / non-functional requirements, data และ interface
3. **`docs/02-architecture/ArchitectureDesign.md`** – โครงสร้างระบบ, threat model, performance & reliability guardrails
4. **`docs/03-process/SDLC_Overview.md`** – ขั้นตอนการทำงาน, stage gate, deliverable แต่ละช่วง
5. ใช้ **`docs/00-guidelines/PROJECT_INSTRUCTION.md`** เป็นกติกากลางสำหรับทุก agent/ทีมเมื่อสร้าง artefact เพิ่มเติม

## แนวปฏิบัติร่วม
- อ้างอิง requirement ด้วยรหัส `SRS-REQ-XX` หรือ `UC-YY` ในทุก deliverable ตาม guideline
- ปรับปรุงเอกสาร/โฟลเดอร์ให้สอดคล้องกับโครงสร้างนี้ทุกครั้งที่มีการเพิ่มเนื้อหาใหม่
- ตรวจสอบให้แน่ใจว่าการย้ายหรือเพิ่มไฟล์ไม่ทำให้ลิงก์ภายในเอกสารเสีย หากจำเป็นให้อัปเดต path ให้ถูกต้อง

## 🎨 **Design System Highlights**

### ✅ **เข้าถึง Design System**
- **Live Demo**: [http://localhost:3000/design-system](http://localhost:3000/design-system)
- **Documentation**: [`frontend/DESIGN_SYSTEM.md`](frontend/DESIGN_SYSTEM.md)
- **Guidelines**: [`frontend/DESIGN_GUIDELINES.md`](frontend/DESIGN_GUIDELINES.md)

### 🏆 **Key Achievements**
- **50+ FontAwesome Icons** - Professional icon system across 6 categories
- **WCAG 2.1 AA Compliant** - All color combinations tested for accessibility
- **Modern Gradients** - Beautiful gradient backgrounds with proper shadows
- **Atomic Design** - Complete 5-level component hierarchy
- **Zero Emoji Policy** - Consistent FontAwesome icons throughout
- **Comprehensive Docs** - Guidelines, examples, do's and don'ts

### 🚀 **Technology Stack**
```typescript
Next.js 15 + React 19 + TypeScript 5
+ Tailwind CSS v4 + Chakra UI v3 + FontAwesome 6.6
= Production-Ready Design System
```

## 📋 **แผนงานถัดไป**

### ✅ **Completed (Phase 1-2)**
1. ~~เตรียมโครงสร้าง repo โค้ด~~ — **ดำเนินการแล้วใน Sprint 1 (SCRUM-10)**
2. ~~Frontend Setup + Design System~~ — **สำเร็จแล้วใน Sprint 2**

### 🎯 **Phase 3: Business Logic** (Current Priority)
1. **Authentication System** - NextAuth.js integration with design system styling
2. **ERP Core Features** - Dashboard, CRUD operations with modern components
3. **State Management** - Zustand + TanStack Query implementation

### 📊 **Phase 4: Backend Integration**
1. ทบทวน ER Diagram (`docs/diagrams/ERD.md`) สำหรับ API design
2. NestJS + Prisma backend development
3. API integration กับ frontend design system

## การใช้งานโครงสร้างโค้ด (เบื้องต้น)
- ติดตั้ง `Node.js 20 LTS` และ `pnpm 9.x` ตามสถาปัตยกรรม
- ใช้คำสั่ง `pnpm install` ที่ root เพื่อเตรียม workspace (backend/fronted จะ scaffold ในงานถัดไป)
- อ่าน `backend/README.md`, `frontend/README.md`, `infra/README.md`, `packages/README.md` เพื่อดู scope และงานถัดไปของแต่ละ workspace

---

> หากเพิ่มเอกสาร/โฟลเดอร์ใหม่ กรุณาอัปเดต README และ `PROJECT_INSTRUCTION.md` เพื่อรักษา single source of truth
