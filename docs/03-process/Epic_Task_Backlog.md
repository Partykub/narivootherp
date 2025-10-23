# แผนงานส่งมอบ School ERP – ลำดับ Epic และ Task ตามความสำคัญ

**วัตถุประสงค์**: แปลง requirement จาก `docs/01-requirements/PRD.md`, `SRS.md` และ `USE_CASES.md` เป็นรายการงานที่เรียงลำดับก่อน-หลัง พร้อมความสัมพันธ์ของงาน เพื่อใช้เปิด Ticket ในระบบติดตามงาน (Jira / GitHub Projects)

> ทุก Ticket ต้องอ้างอิง requirement เช่น `FR-REG-01`, `UC-02` และแนบไฟล์อ้างอิงที่เกี่ยวข้องเพื่อให้ตรวจสอบย้อนกลับได้ง่าย

> **หมายเหตุ Roadmap ปัจจุบัน**: ทีมยังโฟกัสการพัฒนาและทดสอบบนเครื่อง local (Docker Compose) เท่านั้น งานที่เกี่ยวข้องกับการเตรียม production cloud เช่น Terraform, Kubernetes, GitOps จะถูกย้ายไปดำเนินการใน Phase 2 เมื่อเริ่มวางแผน deploy บน cloud

## สรุปลำดับงาน (Priority Backlog)

| ลำดับ | งานหลัก | เป้าหมาย | Requirement อ้างอิง | งานที่ต้องทำก่อน |
| --- | --- | --- | --- | --- |
| P01 | ประชุม Kickoff | ยืนยันขอบเขต ความคาดหวัง และ cadence การส่งมอบร่วมกับผู้มีส่วนได้ส่วนเสีย | `PRD §1`, `SDLC_Overview.md` | - |
| P02 | วางแผนโครงการ (Project Planning) | สรุป roadmap, มอบหมายบทบาท, จัดระเบียบ backlog | `SDLC_Overview.md`, `PROJECT_INSTRUCTION.md` | P01 |
| P03 | ตั้งโครงสร้างโปรเจ็กต์และสภาพแวดล้อมพัฒนาเบื้องต้น | สร้าง repo, ตั้งโครงสร้าง frontend/backend, เตรียม Docker/Database, จัดเตรียมระบบ Design System ตาม Atomic Design | `PROJECT_INSTRUCTION §3`, `SRS §6.1`, `SRS §5.3` | P01–P02 |
| P04 | Epic E11 – ฐานรากแพลตฟอร์ม (DevOps, QA, Observability) | ยกระดับ CI/CD, Infrastructure-as-code, Observability และ Security gate | `SRS §5`, `ArchitectureDesign.md`, `PROJECT_INSTRUCTION §3` | P03 |
| P05 | Epic E8 – ระบบบัญชีผู้ใช้และสิทธิ์ (RBAC & Identity Platform) | วางรากฐานการจัดการผู้ใช้และความปลอดภัย | `FR-RBAC-01`..`FR-RBAC-04`, `FR-AUD-01` | P03–P04 |
| P06 | Epic E2 – โครงสร้างวิชาการและตารางเรียน | สร้างข้อมูลปีการศึกษา วิชา ตารางเรียน | `FR-SUB-01`..`FR-SUB-04`, `UC-01`, `UC-06` | P03–P05 |
| P07 | Epic E1 – ทะเบียนนักเรียนและผู้ปกครอง | จัดการข้อมูลพื้นฐานนักเรียน/ผู้ปกครองและประวัติลงทะเบียน | `FR-REG-01`..`FR-REG-04`, `UC-01` | P06 |
| P08 | Epic E3 – กระบวนการประเมินผลและเกรด | จัดการการสอบ คะแนน เกรด และ workflow | `FR-GRD-01`..`FR-GRD-07`, `UC-02`, `UC-03`, `UC-10` | P06–P07 |
| P09 | Epic E5 – การเงินและการเรียกเก็บ | จัดการค่าใช้จ่าย ใบแจ้งหนี้ การชำระ/คืนเงิน และรายงานการเงิน | `FR-FIN-01`..`FR-FIN-04`, `UC-04`, `UC-05` | P06–P07 |
| P10 | Epic E6 – เอกสารและลายเซ็นดิจิทัล | ระบบออกเอกสารทางการศึกษาและการตรวจสอบ QR | `FR-DOC-01`..`FR-DOC-05`, `UC-08` | P07–P09 |
| P11 | Epic E7 – การแจ้งเตือนและสื่อสาร | ส่งแจ้งเตือนผ่าน Email/LINE ตาม workflow | `FR-NTF-01`..`FR-NTF-03`, `UC-09` | P08–P10 |
| P12 | Epic E13 – Frontend Platform & Design System (ขยายผล) | ขยาย component ตาม Atomic Design และจัดทำเอกสาร design system ภายในแอป | `SRS §6.1`, `PRD §5`, `PROJECT_INSTRUCTION §3` | P03–P04, P08–P11 |
| P13 | Epic E4 – Homeroom & Incident | บันทึกการประเมินคุณลักษณะและเหตุการณ์นักเรียน | `FR-HRM-01`..`FR-HRM-04`, `UC-07` | P07–P11 |
| P14 | Epic E9 – รายงานและแดชบอร์ด | สร้างรายงานผลการเรียน การเงิน เอกสาร | `FR-REP-01`..`FR-REP-03`, `UC-09` | P06–P11 |
| P15 | Epic E10 – การย้ายข้อมูลและบูรณาการ | เตรียม ETL, ตรวจสอบคุณภาพ และ runbook migration | `FR-MIG-01`..`FR-MIG-04`, `SRS §5.9`, `PRD §6` | P06–P14 |
| P16 | Epic E12 – UAT, Training & Go-Live | เตรียมแผนทดสอบ อบรม และ cutover ก่อนเปิดระบบ | `SRS §5.8`, `SDLC_Overview.md` | P01–P15 |

## รายละเอียดงานตามลำดับ

### P01 ประชุม Kickoff
- **เป้าหมาย**: สร้างความเข้าใจร่วมเรื่องขอบเขต MVP, คุณภาพ, ไทม์ไลน์ และช่องทางการสื่อสาร
- **Deliverables**: บันทึกประชุม Kickoff, รายชื่อผู้ติดต่อหลัก, Action items แรก, schedule ของ ceremony
- **ภารกิจสำคัญ**:
  - เชิญ Product, Tech, QA, Data, Infra และผู้ตัดสินใจหลักเข้าร่วม
  - ทบทวน `PRD.md`, `SRS.md`, `SDLC_Overview.md` เพื่อย้ำขอบเขตและตัวชี้วัดความสำเร็จ
  - ยืนยัน Definition of Done, รูปแบบรายงานความคืบหน้า, ช่องทางสื่อสารหลัก (Slack, GitHub Projects)

### P02 วางแผนโครงการ (Project Planning)
- **Deliverables**: Roadmap ราย sprint, RACI matrix, แผนการสื่อสาร, นโยบายเครื่องมือกลาง
- **ภารกิจสำคัญ**:
  - สร้าง Ticket ตามรายการ P01–P16 พร้อมอ้างอิง requirement
  - มอบหมายเจ้าของงานหลัก/ทีมสนับสนุน และกำหนด SLA/Metric
  - สร้าง milestone และ Gate ตาม `SDLC_Overview.md`

### P03 ตั้งโครงสร้างโปรเจ็กต์และสภาพแวดล้อมพัฒนาเบื้องต้น
- **Deliverables**: Repository พร้อมโครงสร้าง, Backend/Frontend skeleton, Docker Compose, Database + Cache + Queue mock, Design System base, Template CI ขั้นต้น
- **ภารกิจสำคัญ**:
  - สร้าง Git repository (mono-repo หรือ multi-repo) พร้อมโฟลเดอร์ `frontend/`, `backend/`, `infra/`, `docs/diagrams/` ให้สอดคล้องกับสถาปัตยกรรมใน `docs/02-architecture/ArchitectureDesign.md`
  - ตั้งโครงสร้าง backend ด้วย NestJS 11 + Prisma เชื่อม PostgreSQL 16: ตั้งค่า `.env.example`, สร้าง Prisma schema แรก, script `pnpm install`, `pnpm dev`, และ health endpoint
  - ตั้งโครงสร้าง frontend ด้วย Next.js 15 + TypeScript + Tailwind/Chakra: จัดโครงสร้าง Atomic Design (atoms → organisms → pages) พร้อม component ตัวอย่าง (Button, Input, Card)
  - สร้างหน้า `/design-system` หรือ workspace เอกสารภายใน Next.js เพื่ออธิบายหลัก Atomic Design, ตัวอย่าง component และแนวทางการใช้งาน โดยไม่ใช้ Storybook
  - นิยาม design token (สี, typography, spacing, elevation) ในไฟล์รวมเพื่อให้ component ทุกตัวเรียกใช้
  - สร้าง Docker Compose รวม backend, frontend, PostgreSQL, Redis, MinIO (mock file storage), RabbitMQ (mock queue) และ pgAdmin ให้ dev/test รันได้ (`docker compose up`)
  - เตรียม script seed ฐานข้อมูล, Prisma migration แรก, รวมถึง mock data เบื้องต้น (นักเรียน, วิชา, ผู้ใช้) เพื่อใช้ใน P06–P08
  - สร้าง workflow CI ขั้นต้น (lint/test frontend & backend) + ตรวจสอบ pre-commit ว่าเชื่อมกับ Husky/lint-staged แล้ว เพื่อใช้เป็นฐานให้งาน P04 ขยายต่อ
  - เขียนคู่มือ `docs/03-process/DevSetup.md` สำหรับการตั้งค่า dev (clone → pnpm install → pre-commit install → docker compose up) และอัปเดต README ส่วน “วิธีเริ่มต้น”

### P04 Epic E11 – ฐานรากแพลตฟอร์ม (DevOps, QA, Observability)
- **Phase ปัจจุบัน**: เลื่อนไป Phase 2 (เริ่มเมื่อเตรียม production cloud)
- **Deliverables**: โครงสร้างพื้นฐานระดับ production, CI/CD เต็มรูปแบบ, Observability, Security gate
- **ภารกิจสำคัญ**:
  - รวบรวม requirement ด้าน infrastructure/operation เพื่อเตรียมทำงาน cloud ใน Phase 2
  - นิยาม blueprint เครือข่ายและ IAM baseline (`ArchitectureDesign.md`) **เมื่อเข้าสู่ Phase 2**
  - พัฒนา Terraform/Helm module สำหรับ PostgreSQL, Redis, RabbitMQ, MinIO พร้อม PITR/backup (`PROJECT_INSTRUCTION §3`, `§10`) **ทำเมื่อเริ่มเตรียม environment cloud**
  - ติดตั้ง Kubernetes cluster + GitOps (Argo CD/Flux) ให้มี parity ทุก environment **เลื่อนดำเนินการหลังจากตัดสินใจใช้ production cloud**
  - ยกระดับ Docker build เป็น multi-stage พร้อม base image hardened (`SRS §5.3`)
  - เสริม CI/CD pipeline เต็มรูปแบบ (lint → unit/integration → build → scan → deploy) และ release promotion strategy (`PROJECT_INSTRUCTION §3`) **เริ่มจาก pipeline บน local/GitHub Actions** แล้วขยายภายหลัง
  - ติดตั้ง Prometheus, Grafana, EFK, Sentry กำหนด SLO/Alert (`PROJECT_INSTRUCTION §3`) **รอเมื่อมี environment cloud**
  - บริหาร secret ผ่าน Vault/Sealed Secrets + rotation policy (`PROJECT_INSTRUCTION §4`, `§9`) **เลื่อนไปพร้อมงาน cloud**
  - จัดทำ runbook สำรอง/กู้คืน และแผนซ้อม DR (`SRS §5.5`, `PROJECT_INSTRUCTION §10`) **จัดทำสอดคล้องกับ production rollout**
  - บังคับใช้ SAST, DAST, dependency scanning พร้อมรายงานและ gate (`PROJECT_INSTRUCTION §4`) – เริ่มต้นด้วย scanning ที่รันบน CI local ก่อน
  - บริหาร Husky + lint-staged, เฟรมเวิร์ก `pre-commit` สำหรับภาษาอื่น และ checklist การส่ง PR (`SDLC_Overview.md`)
  - เปิด cost monitoring/tagging และ budget alert (`SDLC_Overview.md`) **ทำเมื่อมี resource บน cloud จริง**

### P05 Epic E8 – ระบบบัญชีผู้ใช้และสิทธิ์ (RBAC & Identity Platform)
- **Deliverables**: ระบบจัดการผู้ใช้, ผูก actor, MFA, Session control, Audit log
- **ภารกิจสำคัญ**:
  - ออกแบบ schema ผู้ใช้และการเชื่อมโยงนักเรียน/ผู้ปกครอง/บุคลากร (`FR-RBAC-01`)
  - สร้าง Role/Permission matrix พร้อม data scoping (`FR-RBAC-02`, `PRD §2`)
  - พัฒนา MFA + recovery flow สำหรับบทบาทสำคัญ (`SRS §5.2`)
  - จัดการ session/logout ทุกอุปกรณ์ (`ArchitectureDesign.md`)
  - สร้าง Audit log (before/after, request ID, IP) (`FR-AUD-01`)
  - ทำ security hardening checklist (CSP, rate limit, secret policy) (`PROJECT_INSTRUCTION §4`)

### P06 Epic E2 – โครงสร้างวิชาการและตารางเรียน
- **Deliverables**: Workflow ปีการศึกษา ภาคเรียน วิชา ตารางเรียน และข้อมูล seed
- **ภารกิจสำคัญ**:
  - ออกแบบ workflow การสร้างปีการศึกษา/ภาคเรียน (`FR-SUB-01`)
  - พัฒนา CRUD Subject, Grade band, Program (`PRD §4.2`)
  - จัดการ Class Section และการกำหนดครู/ห้องเรียน (`FR-SUB-01`, `UC-06`)
  - พัฒนา UI ตารางเรียน + ตรวจสอบชนกัน + export PDF/Excel (`FR-SUB-02`, `FR-SUB-03`)
  - ผูก event การประกาศตารางกับระบบแจ้งเตือน (`FR-NTF-01`)
  - เตรียมข้อมูล seed สำหรับ QA/Test

### P07 Epic E1 – ทะเบียนนักเรียนและผู้ปกครอง
- **Deliverables**: บริการ CRUD นักเรียน, การเชื่อม guardian, ไทม์ไลน์ลงทะเบียน, audit log
- **ภารกิจสำคัญ**:
  - สร้าง data dictionary และกฎปกปิดข้อมูลตาม PDPA (`FR-REG-01`)
  - พัฒนา Student CRUD API/UI พร้อม validation (`FR-REG-01`, `UC-01`)
  - พัฒนา guardian linking (primary/secondary) (`FR-REG-01`)
  - แสดงประวัติลงทะเบียน/ย้ายห้อง (`FR-REG-02`, `FR-REG-03`)
  - บันทึก audit log และแจ้งเตือนเมื่อข้อมูลสำคัญถูกแก้ไข (`FR-REG-04`, `FR-AUD-01`)
  - เขียน test case ครอบคลุมกรณีปกติ/edge/negative

### P08 Epic E3 – กระบวนการประเมินผลและเกรด
- **Deliverables**: Assessment builder, ระบบบันทึกคะแนน, workflow อนุมัติ, ระบบ GPA/GPAX
- **ภารกิจสำคัญ**:
  - สร้าง schema องค์ประกอบคะแนนและตรวจสอบน้ำหนักรวม 100% (`FR-GRD-01`)
  - พัฒนา UI/API บันทึกคะแนน (manual + CSV) พร้อม error report (`FR-GRD-02`)
  - สร้างเครื่องคำนวณคะแนนรวมและแปลงเกรด (`FR-GRD-03`)
  - พัฒนา workflow draft → submitted → approved → locked พร้อมการแจ้งเตือน (`FR-GRD-04`, `UC-02`, `UC-03`)
  - คำนวณ GPA/GPAX และทำรายงาน (`FR-GRD-07`)
  - ตั้งโมดูลคำขอแก้ไขคะแนนหลังล็อก (`FR-GRD-06`, `UC-10`)

### P09 Epic E5 – ระบบการเงินและการเรียกเก็บ
- **Deliverables**: โครงสร้างค่าใช้จ่าย, ใบแจ้งหนี้, การชำระ/คืนเงิน, รายงานการเงิน
- **ภารกิจสำคัญ**:
  - กำหนด fee items และโครงสร้างค่าใช้จ่าย (`FR-FIN-01`)
  - ออกใบแจ้งหนี้แบบกลุ่มพร้อมติดตามสถานะ (`FR-FIN-02`, `UC-04`)
  - พัฒนาการบันทึกการชำระเต็ม/บางส่วน และตั้ง placeholder integration กับ payment gateway (`FR-FIN-03`)
  - ตั้ง workflow คืนเงินและการอนุมัติ (`FR-FIN-03`)
  - พัฒนาแดชบอร์ดการเงินและ aging report (`FR-REP-02`)
  - ทำรูปแบบ export สำหรับบัญชีและ audit (`PRD §4.4`, `FR-AUD-01`)

### P10 Epic E6 – ระบบเอกสารและลายเซ็นดิจิทัล
- **Deliverables**: เทมเพลตเอกสาร, workflow การออกเอกสาร, การตรวจสอบ QR, นโยบายจัดเก็บไฟล์
- **ภารกิจสำคัญ**:
  - บริหาร metadata/เวอร์ชันของเทมเพลต (`FR-DOC-01`)
  - พัฒนา workflow ขอ/ออกเอกสารและติดตามสถานะ (`FR-DOC-02`, `UC-08`)
  - วางแผนเชื่อม digital signature provider และสร้าง QR token (`FR-DOC-03`, `FR-DOC-04`)
  - เปิด endpoint ตรวจสอบเอกสารพร้อมการป้องกัน (`FR-DOC-05`)
  - จัดนโยบายจัดเก็บไฟล์ (S3/MinIO), สแกนไวรัส, การจำกัดสิทธิ์ (`PROJECT_INSTRUCTION §4`)

### P11 Epic E7 – ระบบการแจ้งเตือนและสื่อสาร
- **Deliverables**: Event bus, dispatcher Email/LINE, ศูนย์ตั้งค่าการแจ้งเตือน, template
- **ภารกิจสำคัญ**:
  - นิยาม schema และ routing ของ notification event (`FR-NTF-01`)
  - พัฒนา worker Email และ LINE (mock + provider จริง) (`FR-NTF-02`)
  - สร้างระบบจัดการ template การแจ้งเตือน (`PRD §5.4`)
  - พัฒนาหน้าตั้งค่า (quiet hour, ช่องทาง) (`FR-NTF-03`)
  - วางระบบมอนิเตอร์, retry และ dead-letter queue (`ArchitectureDesign.md`)

### P12 Epic E13 – Frontend Platform & Design System (ขยายผล)
- **Deliverables**: Component library ครอบคลุม UI หลัก, เอกสาร design system ภายใน Next.js, Guideline Atomic Design ที่บังคับใช้จริง
- **ภารกิจสำคัญ**:
  - ขยาย design token (theme, component states, layout scale) ให้ครอบคลุมทั้งระบบ (`SRS §6.1`)
  - สร้าง component ตาม Atomic Design ให้ครบชุด (atoms → organisms → templates) พร้อม unit/visual test (`PRD §5`, `SRS §5.3`)
  - พัฒนาหน้าเอกสาร design system บน Next.js (เช่น เพจ `/design-system` หรือเอกสารแบบ MDX) พร้อม usage guideline, accessibility checklist และ code sample
  - สร้าง example page/dashboard ที่ใช้ component library ทั้งหมด เพื่อตรวจสอบความสอดคล้อง
  - กำหนดกระบวนการอนุมัติ component ใหม่ (Design review → Dev review → Accessibility sign-off)

### P13 Epic E4 – Homeroom & Incident
- **Deliverables**: ระบบประเมินคุณลักษณะ, บันทึก incident, การแจ้งเตือนผู้ปกครอง, audit log
- **ภารกิจสำคัญ**:
  - จัดการ rubric พร้อม version และ active period (`FR-HRM-01`)
  - พัฒนาหน้าบันทึก homeroom และสรุปผล (`FR-HRM-01`, `FR-HRM-03`)
  - บันทึก incident พร้อมระดับความรุนแรงและ action (`FR-HRM-02`)
  - เชื่อม automated notification ให้ผู้ปกครองเมื่อเกิดเหตุสำคัญ (`FR-HRM-02`, `FR-NTF-02`)
  - บังคับใช้ RBAC และ audit log สำหรับการแก้ไข (`FR-HRM-04`, `FR-RBAC-02`)

### P14 Epic E9 – รายงานและแดชบอร์ด
- **Deliverables**: รายงานผลการเรียน การเงิน เอกสาร, การ export, การตั้ง trigger
- **ภารกิจสำคัญ**:
  - จัด workshop นิยาม KPI/แดชบอร์ด (`PRD §1 KPI`)
  - สร้าง report query layer ที่เคารพสิทธิ์ผู้ใช้ (`FR-REP-01`)
  - พัฒนา UI แดชบอร์ดและการ export (`FR-REP-02`, `UC-09`)
  - ทำระบบตั้งเวลาส่งรายงานและ trigger (`FR-REP-03`)
  - ทดสอบประสิทธิภาพ/แคชตาม SLA (`SRS §5.4`)

### P15 Epic E10 – การย้ายข้อมูลและบูรณาการ
- **Deliverables**: Pipeline ETL, Data mapping, Validation report, Migration runbook
- **ภารกิจสำคัญ**:
  - วิเคราะห์ข้อมูลต้นทางและ mapping (`SRS §5.9`, `PROJECT_INSTRUCTION §10`)
  - พัฒนากระบวนการ extract → staging → transform → load (`FR-MIG-02`)
  - ตรวจสอบคุณภาพ (row count, checksum, sampling) (`FR-MIG-03`)
  - จัดทำ runbook และ fallback plan (`FR-MIG-01`)
  - ทำ dry run และขอ sign-off จาก Data Owner (`FR-MIG-04`)

### P16 Epic E12 – UAT, Training & Go-Live
- **Deliverables**: แผนการทดสอบ, script UAT, เอกสารอบรม, checklist cutover, แผนดูแลหลังเปิดระบบ
- **ภารกิจสำคัญ**:
  - รวม test case จากทุก use case (ปกติ/ขอบ/ผิดพลาด) (`SRS §5.8`)
  - เตรียม environment UAT พร้อมข้อมูล anonymise (`PROJECT_INSTRUCTION §9`)
  - พัฒนาคู่มือ/FAQ สำหรับบทบาทต่าง ๆ (`PRD §7`)
  - จัดทำ go-live checklist และ rollback plan (`SDLC_Overview.md`)
  - วางแผน monitoring หลังเปิดระบบและกระบวนการ triage (`PROJECT_INSTRUCTION §11`)

## แนวทางติดตามและกำกับดูแล
- ทุก Ticket ต้องระบุอ้างอิง requirement (`FR-xxx`, `UC-yy`) และไฟล์อ้างอิงเพิ่มเติมที่เกี่ยวข้อง
- Definition of Done ต้องครอบคลุม: โค้ด, เทสต์, เอกสาร, checklist ความปลอดภัย/โครงสร้างพื้นฐาน, รายงาน migration (ถ้ามี)
- ปรับปรุง RACI เมื่อมีการเปลี่ยนบทบาทหรือเจ้าของงาน
- รายงานความคืบหน้าใน Sprint Review โดยอิงลำดับ P01–P16 เพื่อเห็นภาพรวมของการส่งมอบ
- ทำ Retrospective ทุก milestone เพื่อทบทวนความเสี่ยงและปรับแผน

---

Version: 0.7 – 2025-10-23 – ปรับปรุงโดย Codex (ภาษาไทย + ลำดับความสำคัญ + โครงสร้างโปรเจ็กต์)
