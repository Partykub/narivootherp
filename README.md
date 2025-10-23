# Narivootherp – School ERP Knowledge Base

เอกสารชุดนี้รวบรวม requirement, สถาปัตยกรรม, ขั้นตอน SDLC และแนวทางสำคัญของโครงการ School ERP อย่างเป็นระบบ เพื่อใช้เป็น single source of truth สำหรับทีมผลิตภัณฑ์ วิศวกร และผู้ทดสอบ

## โครงสร้างที่เก็บข้อมูล

```
backend/                                # พื้นที่เตรียม NestJS + Prisma (SCRUM-11)
frontend/                               # พื้นที่เตรียม Next.js + Atomic Design (SCRUM-12)
infra/                                  # Workspace สำหรับ Docker Compose, CI/CD, IaC (SCRUM-15, SCRUM-17)
packages/                               # ไลบรารี/โมดูลที่แชร์ระหว่าง service
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

## แผนงานถัดไปที่แนะนำ
1. ทบทวน ER Diagram (`docs/diagrams/ERD.md`) แล้วถอดแบบข้อมูลสำหรับ sequence diagram และ OpenAPI spec
2. แตก requirement เป็น Epic/User Story ในระบบติดตามงาน พร้อมเชื่อมโยงกลับมาที่เอกสารใน `docs/01-requirements`
3. เตรียมโครงสร้าง repo โค้ด (frontend, backend, infrastructure) โดยนำ guideline และ stack จาก `PROJECT_INSTRUCTION.md` ไปใช้จริง — **ดำเนินการแล้วใน Sprint 1 (SCRUM-10)**

## การใช้งานโครงสร้างโค้ด (เบื้องต้น)
- ติดตั้ง `Node.js 20 LTS` และ `pnpm 9.x` ตามสถาปัตยกรรม
- ใช้คำสั่ง `pnpm install` ที่ root เพื่อเตรียม workspace (backend/fronted จะ scaffold ในงานถัดไป)
- อ่าน `backend/README.md`, `frontend/README.md`, `infra/README.md`, `packages/README.md` เพื่อดู scope และงานถัดไปของแต่ละ workspace

---

> หากเพิ่มเอกสาร/โฟลเดอร์ใหม่ กรุณาอัปเดต README และ `PROJECT_INSTRUCTION.md` เพื่อรักษา single source of truth
