# Narivootherp – School ERP Knowledge Base

เอกสารชุดนี้รวบรวม requirement, สถาปัตยกรรม, ขั้นตอน SDLC และแนวทางสำคัญของโครงการ School ERP อย่างเป็นระบบ เพื่อใช้เป็น single source of truth สำหรับทีมผลิตภัณฑ์ วิศวกร และผู้ทดสอบ

## โครงสร้างที่เก็บข้อมูล

```
docs/
├── 00-guidelines/
│   └── PROJECT_INSTRUCTION.md        # กติกาการทำงานของเอเจนต์/ทีม
├── 01-requirements/
│   ├── PRD.md                        # Product Requirements Document
│   ├── SRS.md                        # Software Requirements Specification
│   ├── USE_CASES.md                  # รายละเอียด Use Case หลัก
│   └── UserScenario.md               # สถานการณ์การใช้งานตาม persona
├── 02-architecture/
│   └── ArchitectureDesign.md         # สถาปัตยกรรมเชิงตรรกะ/กายภาพ + NFR
└── 03-process/
    └── SDLC_Overview.md              # ขั้นตอนและ stage-gate ของ SDLC

data/
└── legacy/
    └── microsoft_access_db/          # ฐานข้อมูล Microsoft Access เดิม (ต้นทาง migration)
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
1. จัดทำ ER Diagram, Sequence Diagram และ OpenAPI spec โดยอ้างอิง `SRS.md` และ `ArchitectureDesign.md`
2. แตก requirement เป็น Epic/User Story ในระบบติดตามงาน พร้อมเชื่อมโยงกลับมาที่เอกสารใน `docs/01-requirements`
3. เตรียมโครงสร้าง repo โค้ด (frontend, backend, infrastructure) โดยนำ guideline และ stack จาก `PROJECT_INSTRUCTION.md` ไปใช้จริง

---

> หากเพิ่มเอกสาร/โฟลเดอร์ใหม่ กรุณาอัปเดต README และ `PROJECT_INSTRUCTION.md` เพื่อรักษา single source of truth
