# 🧠 PROJECT_INSTRUCTION.md
**Project:** School ERP System  
**Version:** 1.1  
**Date:** 2025-10-22  
**Author:** [Your Name]  
**Approved by:** [Project Owner / System Architect]

---

## 1. Project Overview
School ERP System is a web-based platform designed to streamline school operations — including student registration, academic grading, finance, document generation, and reporting.  
This system replaces a legacy Microsoft Access–based solution and migrates all data to **PostgreSQL**.

**Primary Users:**  
- Administrators / Registrars  
- Teachers / Academic Officers  
- Finance Officers  
- Students / Guardians  

**Core Modules:**  
1. Student Registry  
2. Grades & Assessments  
3. Finance & Billing  
4. Document Management (Certificates, Reports)  
5. Reporting & Dashboard

---

## 2. Agent Context
This document defines global rules for **Codex (GPT-based)** and all supporting AI Agents (Dev, Reviewer, Doc, Security, and Test).

Each agent must:
- Understand the project’s architecture and SDLC process.  
- Follow **`../01-requirements/PRD.md`**, **`../01-requirements/SRS.md`**, **`../02-architecture/ArchitectureDesign.md`**, และ **`../03-process/SDLC_Overview.md`**.  
- Preserve consistency in style, naming, and structure across code and documentation.  
- Generate safe, maintainable, and auditable outputs.

---

## 3. Technology Stack (Authoritative Reference)

| Layer | Technology | Notes |
|-------|-------------|-------|
| Frontend | **Next.js 15 (App Router) + TypeScript 5.6** | Tailwind CSS 3.4 / Chakra UI 2.8, ISR/SSR enabled |
| Backend | **NestJS 11 on Node.js 20 LTS** | Modular architecture, Zod 3.23 / Joi 17 for validation |
| ORM / Data Access | **Prisma 5.x** (หรือ TypeORM 0.3.x) | Schema migrations, connection pooling |
| Database | **PostgreSQL 16.x** | UTF-8 encoding, PITR, managed backups |
| Cache | **Redis 7.2.x** | Sessions, RBAC cache, rate limiting counters |
| Message / Queue | **RabbitMQ 3.13** หรือ **Apache Kafka 3.7** | Background jobs & notifications |
| File Storage | **AWS S3 / MinIO (RELEASE.2024-06)** | AV scan, signed URL, versioning |
| Authentication | **JWT + Refresh Token + RBAC** | MFA for privileged roles, asymmetric signature |
| CI/CD | **GitHub Actions / Jenkins LTS 2.452** | Lint → Test → Build → Scan → Deploy |
| Deployment | **Docker + Kubernetes / GitOps** | Terraform + Helm, environment parity |
| Observability | **Prometheus 2.51, Grafana 11.1, EFK 8.15, Sentry SaaS 24.x** | Metrics, logs, tracing |
| Documentation | **Markdown, Mermaid, Draw.io** | Store diagrams in `docs/diagrams/` |

- Diagram artefacts: `docs/diagrams/ERD.md` (Mermaid ERD สำหรับโดเมน MVP; อัปเดตเมื่อ schema เปลี่ยน)

## 4. Security & Compliance Guidelines
**Mandatory for all agents (Dev, Security, Reviewer, Test):**

- บังคับใช้ HTTPS/TLS 1.2+, CSP, HSTS, X-Frame-Options (DENY), X-Content-Type-Options, CORS allowlist ตาม `../02-architecture/ArchitectureDesign.md`.  
- Hashing รหัสผ่านด้วย **bcrypt 5.x** หรือ **argon2id** พร้อม salting; บังคับ MFA สำหรับผู้ดูแลระบบ.  
- JWT: ใช้ signing แบบ asymmetric (RS256), refresh token HttpOnly/SameSite, rotate key อย่างน้อยทุก 90 วัน (prod) และ 60 วัน (non-prod).  
- Rate limiting ตามสถาปัตยกรรม:  
  - 100 req/นาที ต่อผู้ใช้ (sliding window + token bucket)  
  - 1,000 req/นาที ต่อ IP  
  - Login endpoint: 10 ครั้ง/ผู้ใช้/5 นาที  
  - File upload: 20 ไฟล์/ผู้ใช้/ชั่วโมง  
  - Webhook partner: 200 req/นาที พร้อม dynamic ban 15 นาที เมื่อเกิน SLA  
- ตรวจสอบ/validate input ทุกจุดด้วย DTO/Schema (Zod/Joi) และ sanitize output.  
- File Upload: อนุญาตเฉพาะ PDF/JPG/PNG/CSV, จำกัด 10MB, ตรวจ MIME + magic number, สแกนไวรัส (ClamAV) ก่อนบันทึก.  
- ปฏิบัติตาม **PDPA**: ใช้ data masking/log redaction, สำเนาข้อมูลสำหรับ UAT ต้อง anonymise ตาม data-classification matrix.  
- เก็บ secrets ใน Secret Manager/Sealed Secrets/Vault เท่านั้น; ห้าม push ลง repo.  
- Logs/Audit: เก็บ event สำคัญทั้งหมด (ก่อน/หลัง, actor, timestamp, request ID) อย่างน้อย 90 วัน online + archive ถึง 1 ปี; อ้างอิง STRIDE table ใน `../02-architecture/ArchitectureDesign.md`.  
- Enforcement RBAC อย่างเคร่งครัด, ใช้ least privilege และทบทวน role mapping รายไตรมาส.  
- ปฏิบัติตาม incident response runbook: แจ้งเตือน, isolate, forensic, postmortem ตาม SLA.

---

## 5. Performance & Scalability
- **SLO/SLI Targets (อ้างอิง `../02-architecture/ArchitectureDesign.md`):**  
  - API availability ≥ 99.5%  
  - p95 latency < 1.5 วินาทีสำหรับ endpoint หลัก (ตารางเรียน, ใบแจ้งหนี้)  
  - Background job SLA: 2,000 รายการ (bulk invoice) เสร็จภายใน 5 นาที  
  - Cache hit ratio ≥ 85% สำหรับ schedule/timetable lookup  
- **Caching & Invalidation:**  
  - Redis TTL: Session 30 นาที (extend on read), RBAC cache 10 นาที, ตารางเรียน 5 นาที, รายงานสรุป 15 นาที  
  - ใช้ domain event / PostgreSQL NOTIFY สำหรับ targeted cache invalidation  
  - Static asset: Cache-Control 5 นาที + revalidate; CDN edge สำหรับ public content  
- **Async Processing & Queue:**  
  - ใช้ BullMQ/RabbitMQ worker (Node.js) หรือเทียบเท่า, retry ด้วย exponential backoff  
  - ตั้ง circuit breaker เมื่อ external API 5xx ≥ 5% ภายใน 1 นาที  
- **Load & Reliability Testing:**  
  - เครื่องมือ: k6 / JMeter (load, stress, endurance)  
  - ทดสอบก่อนทุก major release และบันทึกผลใน release checklist  
- **Scalability Playbook:**  
  - Stateless services พร้อม Kubernetes HPA (CPU/latency-based)  
  - ใช้ connection pooling (PgBouncer/Prisma) และ read replica สำหรับรายงาน  
  - ตั้ง graceful shutdown และ health probes (liveness/readiness) ให้ครบทุก service

---

## 6. Observability & Monitoring
- ครอบคลุม Logs, Metrics, Traces ทุก environment; ใช้ Prometheus 2.51 + Grafana 11.1 + EFK/Sentry.  
- instrument ด้วย OpenTelemetry (NestJS + Next.js) และรวม correlation ID ในทุก log.  
- **Metrics บังคับ:** API latency (p50/p95), HTTP error rate, cache hit ratio, queue backlog age, DB connection usage, external API failure ratio.  
- **Alert Policy:** 5xx ≥ 2% (5 นาที), p95 > 1.5 วินาที (5 นาที), Cache hit < 75% (10 นาที), Queue backlog age ≥ 5 นาที, Redis latency > 20 ms, CPU > 85% (10 นาที), Memory > 80% (5 นาที).  
- Dashboard ต้องมี domain overview (Grades, Finance, Documents) + Ops overview + security analytics (rate-limit trigger, failed login).  
- เก็บ audit trail metrics (จำนวน event, anomaly detection) และทดสอบ alert routing ในแต่ละ release.

---

## 7. Documentation & Traceability
- ทุก deliverable (โค้ด, เอกสาร, diagram) ต้องอ้างอิง **SRS Requirement ID** หรือ **Use Case ID** ที่เกี่ยวข้อง.  
- รูปแบบอ้างอิงใน Markdown: `> Ref: SRS-REQ-XX, UC-YY`. ในโค้ดให้ใช้คอมเมนต์ `// Ref: SRS-REQ-XX`.  
- เอกสารใหม่/อัปเดตต้องเพิ่มเมตาดาต้า (Version, Date, Author) และบันทึกใน changelog ของ repository.  
- Diagram เก็บใน `docs/diagrams/` พร้อมไฟล์ Mermaid (`.mmd`) และ Draw.io (`.drawio`) ควบคู่; ชื่อไฟล์สอดคล้องกับหัวข้อใน `../02-architecture/ArchitectureDesign.md`.  
- ทุกการเปลี่ยนแปลงที่มีผลต่อสถาปัตยกรรมต้อง sync กับ `../02-architecture/ArchitectureDesign.md` ภายในสปรินต์เดียวกัน ตามขั้นตอน Stage Gate ใน `../03-process/SDLC_Overview.md`.

---

## 8. Coding & Review Rules

**General**
- ปฏิบัติตาม TypeScript ESLint + Prettier config และ naming convention ที่กำหนดใน repo.  
- ใช้ dependency injection ของ NestJS + Prisma service pattern; หลีกเลี่ยง query raw โดยไม่จำเป็น.  
- ใช้ async/await และจัดการ error ครอบคลุม (Problem Details RFC7807).  
- เขียน **unit test** (Jest/Vitest) สำหรับ service/controller ทุกตัว และ integration test (Supertest/Cypress) สำหรับ API สำคัญ.  
- รัน lint, test, security scan (npm audit/snyk) ในทุก PR; Reviewer ตรวจสอบ STRIDE impact เมื่อแก้ไขโมดูลที่เกี่ยวข้อง.  
- ห้าม commit secrets/credentials; ใช้ sample `.env.example` เท่านั้น.

**Commit & Branching**
- Branch format: `feature/<module>`, `fix/<issue>`, `chore/<task>` (อ้างอิง issue ID เมื่อมี).  
- Commit message: `[Module] Short description (#issue-id)`; หลาย requirement ใช้ conventional scope เช่น `[Auth] Implement MFA (#123)`.  
- Merge ผ่าน Pull Request เท่านั้น โดย Reviewer Agent หรือเพื่อนร่วมทีมต้องอนุมัติ และ pipeline ผ่านทุกขั้นตอน.

---

## 9. Testing Environment Policy
- ห้ามใช้ข้อมูล production โดยไม่ anonymise; ใช้ data masking script จาก Data Team ก่อนนำเข้าทุก environment non-prod.  
- Secrets/credentials แยกต่อ environment ใน Secret Manager; non-prod secrets rotate ทุก 60 วัน, revoke หลังการทดสอบเสร็จ.  
- สร้าง namespace/DB schema แยกต่อทีมทดสอบเพื่อป้องกัน cross-contamination; มี automation ลบ resource หลัง test run.  
- ปิดการเชื่อมต่อ external production services ใน non-prod; ใช้ sandbox key หรือ mock service เสมอ.  
- Log และ audit ใน environment ทดสอบต้องเก็บเทียบเท่า production (แต่ mask PII).  
- เปรียบเทียบ configuration drift ด้วย Terraform plan/GitOps sync ทุก sprint และบันทึกผลใน release checklist.

---

## 10. Data Migration Rules
- Source: `StudentData69.accdb`, `Dtbase (1).mdb` (อ่านผ่าน `mdb-tools` 0.9.4 หรือ ODBC).  
- Target: PostgreSQL 16.x schema `school` (+ staging schema สำหรับ ETL).  
- วิธีการ: Export CSV/Parquet → PostgreSQL `COPY`; จัดเก็บสคริปต์ ETL ด้วย Python 3.12 (`pyodbc` 5.1, `pandas` 2.2, `sqlalchemy` 2.0).  
- ขั้นตอน (ต้องมี runbook): Discovery → Data Profiling → Mapping/Transformation → Staging Load → Validation (row count, checksum, sample) → Production Load → Sign-off.  
- Data Cleaning: normalize วันที่/เวลา, boolean, trim whitespace, mapping code → reference table, validate foreign key.  
- Validation & Audit: บันทึกรายงานใน `MigrationReport.md`, เก็บ log ETL ทุกครั้ง, ให้ Data Owner เซ็นรับรอง.  
- Migration scripts ต้อง idempotent และทดสอบใน Staging ก่อน Production cutover.

---

## 11. Test & Quality
- ปฏิบัติตามแผนการทดสอบใน `../03-process/SDLC_Overview.md`: Unit → Integration → System → UAT → Regression → Cutover rehearsal.  
- Security testing: SAST (ESLint rules, SonarQube), DAST (OWASP ZAP), Dependency scan (npm audit/snyk), Pen-test checklist ตาม OWASP Top 10.  
- Coverage targetsขั้นต่ำ: Unit ≥ 80%, Integration ≥ 70%, Critical domain (Finance, Auth) ≥ 90%.  
- Load/Stress test: p95 < 1.5 วินาที, Error rate < 2%, Background job SLA ตามข้อ 5; บันทึกผลใน QA report ก่อน GO/NO-GO.  
- Chaos/Failover drill อย่างน้อยรายไตรมาส: ทดสอบ DB failover, cache outage, external API timeout.  
- ใช้ Test Data ที่ anonymise และปฏิบัติตาม Testing Environment Policy (หัวข้อ 9).  
- Reviewer/Test Agent ต้องตรวจสอบว่าทุก deliverable ระบุ reference ไปยัง SRS/Use Case ที่สอดคล้อง.

---

## 12. Collaboration Policy
- ช่องทางสื่อสารหลัก: GitHub Issues (tracking), Slack, LINE Dev group (alert).  
- บริหารงานผ่าน GitHub Projects (Kanban); ทุกงานต้องมี ticket พร้อมลิงก์ไปยัง SRS/Use Case.  
- ส่งมอบงานด้วย Pull Request หรือ MR พร้อม checklist (lint/test/security) และสรุปผลกระทบ.  
- เมื่อ agent ใดปรับเอกสาร/โค้ด ต้องแจ้ง note ใน ticket และ sync กับเจ้าของโมดูล.  
- หลีกเลี่ยงการ overwrite ค่าคอนฟิก/secret ที่ไม่ได้เป็น scope; หากจำเป็นต้องเสนอ RFC ก่อน.  
- ยึดโครงสร้างไฟล์/โฟลเดอร์ตาม `SDLC_Overview.md`; การเพิ่มไฟล์ใหม่ต้องใส่เหตุผลใน PR description.

---

## 13. Agent Behavior Guidelines

| Rule | Description |
|------|--------------|
| 1️⃣ | Always follow this instruction before generating code or docs |
| 2️⃣ | If requirement unclear → review `../01-requirements/SRS.md` or `../01-requirements/PRD.md` before proceeding |
| 3️⃣ | Never assume missing data — ask or note as `// TODO` |
| 4️⃣ | Always validate schema & input before use |
| 5️⃣ | For sensitive data, use masking in logs |
| 6️⃣ | Never expose secrets in output |
| 7️⃣ | Produce outputs in Markdown, JSON, YAML, or valid code blocks |
| 8️⃣ | Include version trace at end of every generated file |

---

## 14. Maintenance & Review
- Review this document **every major release** or if architecture changes.  
- Version control via Git (tag format: `inst-vX.Y`).  
- Approved revisions require sign-off จาก:  
  - System Architect  
  - Product Owner  
  - Security Engineer  

---

**End of PROJECT_INSTRUCTION.md**
