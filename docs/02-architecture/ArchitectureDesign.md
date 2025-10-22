# Architecture Design – School ERP System

**Version:** 1.1  
**Date:** 2025-10-22  
**Author:** Codex (with project inputs)  

---

## 1. บทนำ

### 1.1 วัตถุประสงค์
อธิบายสถาปัตยกรรมระบบ School ERP ที่รองรับข้อกำหนดจาก `../01-requirements/PRD.md` และ `../01-requirements/SRS.md`, รวมถึงการย้ายข้อมูลจากฐาน Microsoft Access เดิมสู่ PostgreSQL เพื่อใช้เป็นแนวทางสำหรับทีมพัฒนา ปรับใช้ และดูแลระบบ

### 1.2 ขอบเขต
- ครอบคลุมสถาปัตยกรรมเชิงตรรกะและกายภาพ
- ระบุเทคโนโลยีหลักและ service decomposition (frontend, backend, data, integration)
- กำหนดแนวทาง CI/CD, security, observability, data migration และ operations
- ไม่รวมรายละเอียดโค้ด/implementation เฉพาะเจาะจง และไม่ครอบคลุม third-party services นอกเหนือจากที่ระบุใน PRD/SRS

---

## 2. หลักการออกแบบและข้อจำกัด

| หัวข้อ | รายละเอียด |
| --- | --- |
| Business Priorities | ระบบต้องพร้อมให้โมดูลหลัก (ทะเบียน, เกรด, การเงิน, เอกสาร) ทำงานได้ตาม Sprint incremental |
| Scalability | รองรับ peak load ช่วงส่งเกรด/สร้างใบแจ้งหนี้ (burst write) |
| Data Migration | ต้องย้ายข้อมูลเริ่มต้นจาก Microsoft Access (`Dtbase (1).mdb`, `StudentData69.accdb`) ไปยัง PostgreSQL |
| Security & PDPA | RBAC, data masking, audit log, HTTPS, password hashing |
| Observability | Logging, metrics, tracing สำหรับบริการหลัก |
| Deployment | สนับสนุนการปรับใช้แบบ container-based บน Docker/Kubernetes (หรือเทียบเท่า) |
| Maintainability | โครงสร้างแยก frontend, backend, data layer, มี automated test และ pipeline |
| Compliance | การตัดสินใจสถาปัตยกรรมต้องสอดคล้องกับ NFR ใน `../01-requirements/SRS.md` และกระบวนการ stage gate ตาม `../03-process/SDLC_Overview.md` |

---

## 3. สถาปัตยกรรมเชิงตรรกะ (Logical Architecture)

```
┌──────────────────────────┐
│ Presentation Layer       │  Next.js (Web Client) + Mobile Responsive
└───────▲──────────────────┘
        │ HTTPS
┌───────┴──────────────────┐
│ API Layer / BFF          │  Node.js (NestJS) - REST + RBAC Middleware
└───────▲──────────────────┘
        │ Prisma/ORM
┌───────┴──────────────────┐
│ Service Layer            │  Modules: Auth, Student, Courses, Grades, Finance,
│                           │  Documents, Notifications, Reports, Migration
└───────▲──────────────────┘
        │ SQL / Storage
┌───────┴──────────────────┐
│ Data Layer               │  PostgreSQL (Primary DB)
│                           │  Redis (Optional cache/session)
└───────▲──────────────────┘
        │ Integration / ETL
┌───────┴──────────────────┐
│ External Services        │  Payment Gateway (Webhook), Email SMTP, LINE Notify,
│                           │  QR Verification Service, Legacy Access DB (ETL)
└──────────────────────────┘
```

_Diagram_: เก็บภาพรวม logical architecture ใน `docs/diagrams/logical-architecture.mmd` (Mermaid) และไฟล์ Draw.io (`docs/diagrams/logical-architecture.drawio`) เพื่อซิงก์กับเอกสารนี้ทุก release.

---

## 4. สถาปัตยกรรมเชิงกายภาพ (Physical Architecture)

| Environment | Components | รายละเอียด |
| --- | --- | --- |
| Dev | Developer machines + local Docker Compose | Frontend, Backend API, PostgreSQL, pgAdmin, Migration scripts |
| Staging | Kubernetes namespace / Docker Swarm stack | Replica 1-2 ของ API, PostgreSQL managed instance (snapshot), Object storage สำหรับเอกสาร |
| Production | Kubernetes cluster (HA) หรือ Managed Container Service | API auto-scaling, PostgreSQL with PITR, Redis (optional), Load balancer (HTTPS), Storage for documents, Monitoring stack |

_Diagram_: สร้าง network/data-flow diagram สำหรับ environment mapping ไว้ที่ `docs/diagrams/network-flow.drawio` และ `docs/diagrams/network-flow.mmd` เพื่ออ้างอิงในระหว่าง threat modelling และ audit.

### Networking & Access
- ใช้ HTTPS/TLS ผ่าน Ingress Controller หรือ Load Balancer
- RBAC และ JWT ใช้ภายใน API
- Payment Gateway webhook เปิดเฉพาะ endpoint ที่กำหนด พร้อม IP whitelist (ถ้ารองรับ)
- Legacy Access DB ถูกนำเข้าในสภาพแวดล้อม Data Migration (ไม่ให้ production เข้าถึงโดยตรง)

---

## 5. ส่วนประกอบและเทคโนโลยีหลัก

| Layer | เทคโนโลยีหลัก | หมายเหตุ |
| --- | --- | --- |
| Frontend | Next.js 15 (App Router) + TypeScript 5.6 + Tailwind CSS 3.4 / Chakra UI 2.8 | รองรับ SSR/ISR และ Responsive design |
| Backend API | NestJS 11 บน Node.js 20 LTS + Zod 3.23 / Joi 17 validation | Modular architecture per domain, provider-based |
| ORM / Data Access | Prisma 5.x (หรือ TypeORM 0.3.x) | Schema-first, migration sync |
| Database | PostgreSQL 16.x | ใช้ schema แยกสำหรับโมดูลถ้าจำเป็น |
| File Storage | S3-compatible storage (AWS S3 หรือ MinIO RELEASE.2024-06) | สำหรับเอกสาร PDF, รูป, ปพ. |
| Messaging (optional) | RabbitMQ 3.13.x หรือ Apache Kafka 3.7.x (เมื่อ scaling notification/batch) | เริ่มต้นอาจใช้ cron/queue ภายใน |
| Cache | Redis 7.2.x (optional) | Session/token cache, rate limiting |
| Authentication | JWT + Refresh token, bcrypt 5.x / argon2id libs | รองรับ RBAC ตาม SRS |
| Notification | SMTP server (Postfix 3.8+/SES) + LINE Notify API v2 | ตาม integration ใน PRD |
| ETL Tools | `mdb-tools` 0.9.4, Python 3.12 (`pyodbc` 5.1, `pandas` 2.2, `sqlalchemy` 2.0), Airflow 2.9 / Prefect 2.14 | สำหรับ migration |
| CI/CD | GitHub Actions (runner Node 20) / Jenkins LTS 2.452 | Lint, test, build, deploy |
| Monitoring | Prometheus 2.51 + Grafana 11.1, EFK 8.15, Sentry SaaS 24.x | Logging/alerting |

---

## 6. โครงสร้างโมดูล Backend (Domain Modules)

| Module | Responsibility | Key Entities |
| --- | --- | --- |
| Auth & RBAC | Login, token, permission enforcement | users, roles, permissions |
| Student Registry | Profile, enrollment, guardian data | students, guardians, enrollments |
| Courses & Timetable | Course management, schedules | courses, class_sections, timetables |
| Grades & Assessments | Assessments, score entry, submissions | assessments, scores, grade_submissions, grade_approvals |
| Finance | Fee structures, invoices, payments | fee_structures, invoices, payments, receipts |
| Documents | Templates, generation, approval, QR | document_templates, documents, document_issues |
| Homeroom & Incidents | Evaluations, incident logs | homeroom_evaluations, incidents |
| Reports | Aggregated data & exports | views/materialized views |
| Notifications | Email/LINE triggers | notifications, notification_logs |
| Migration | Data profiling, ETL pipelines | staging tables, mapping tables |

---

## 7. Data Migration Architecture

### 7.1 ขั้นตอนหลัก
1. **Discovery** – ใช้ `mdb-tools` หรือ ODBC สำรวจ schema, export metadata (tables, columns, types)  
2. **Data Profiling** – วิเคราะห์คุณภาพข้อมูล (NULL, duplicate, inconsistent format) และบันทึกในรายงาน  
3. **Mapping & Transformation** – สร้าง mapping document ระหว่าง Access → PostgreSQL, กำหนด rule แปลงชนิดข้อมูล, normalisation  
4. **Staging Load** – ใช้สคริปต์ Python/ETL tool นำข้อมูลจาก Access ไปยัง staging schema บน PostgreSQL (ตารางชั่วคราว)  
5. **Validation** – เปรียบเทียบจำนวนระเบียน, checksum, sample records  
6. **Production Load** – โอนข้อมูลจาก staging → production schema ด้วย transaction/ขั้นตอนควบคุม  
7. **Sign-off** – บันทึกรายงานผลการย้ายข้อมูล, ปัญหา, วิธีแก้ และรับรองโดย PO/ผู้ดูแลข้อมูล

### 7.2 เครื่องมือที่แนะนำ
- `mdb-tables`, `mdb-export`, `mdb-schema` (mdb-tools 0.9.4 บน Linux)
- Python 3.12 scripts (`pyodbc` 5.1, `pandas` 2.2, `sqlalchemy` 2.0) สำหรับแปลงข้อมูลเป็น CSV/Parquet แล้วใช้ `COPY` ใน PostgreSQL
- Apache Airflow 2.9 / Prefect 2.14 หรือ Cron Job สำหรับ orchestration (ถ้าต้อง incremental)

### 7.3 การจัดการคุณภาพ
- Migration Runbook กำหนดคำสั่ง, การตรวจสอบ, จุด rollback
- ใช้ staging schema เพื่อป้องกันการปนกับ production
- เก็บ log การย้ายข้อมูลและ error report ใน `MigrationReport.md`
- ทดสอบ migration ซ้ำได้ (idempotent scripts)

---

## 8. Data Storage & Backup Strategy

| Component | Strategy |
| --- | --- |
| PostgreSQL | PITR, automated daily backups, WAL archiving |
| File Storage | Versioning + replication (S3 bucket with lifecycle policy) |
| Config & Secrets | ใช้ Secret Manager (K8s Secret, HashiCorp Vault, หรือ AWS Secret Manager) |
| Access DB Source | Snapshot/backup ก่อน migration, read-only หลัง migrate |

---

## 9. Security & Compliance

### 9.1 Authentication & Authorization
- JWT + Refresh token, RBAC enforcement, password hashing (bcrypt/argon2)
- ใช้ NestJS Guard/Decorator เพื่อบังคับ RBAC ตามโมดูล
- บังคับ MFA สำหรับผู้ดูแลระบบ (หากใช้ SSO/IdP ภายนอกได้ ให้พิจารณา)

### 9.2 Transport & API Security
- บังคับ HTTPS/TLS 1.2+ ทุก environment
- เปิดใช้งาน HSTS, X-Content-Type-Options, X-Frame-Options (DENY), X-XSS-Protection
- Content-Security-Policy (CSP) จำกัดแหล่ง script/font/image, เพิ่ม nonce สำหรับ Next.js
- ตั้ง Rate Limiting/Throttling ระดับ API (ดูหัวข้อ 10.4)
- ใช้ API Key/Signature สำหรับ webhook จาก Payment Gateway

### 9.3 Data Protection & Storage
- เข้ารหัสข้อมูลสำคัญที่ rest (เช่น เลขประจำตัว, ข้อมูลการเงิน) ด้วย field-level encryption หรือ Transparent Data Encryption
- Masking ข้อมูลส่วนบุคคลใน UI/Log ตาม RBAC
- สำเนาข้อมูลเพื่อ UAT ต้องนิรนาม (anonymised dataset)

### 9.4 Secret & Credential Management
- เก็บ secrets ใน Secret Manager (K8s Secrets + sealed secrets, Vault หรือ AWS Secrets Manager)
- ตั้งนโยบาย rotation (เช่น 90 วัน) สำหรับ DB credentials, API keys, JWT signing keys
- แยก DB role: read/write, reporting, migration; บังคับ principle of least privilege

### 9.5 File Upload Hardening
- ตรวจสอบชนิดไฟล์ (mime type + magic number) และจำกัดขนาดไฟล์
- ใช้ storage แยก (S3/minio) และปิด public ACL; เปิดการสแกนไวรัส (ClamAV หรือบริการเทียบเท่า)
- ป้องกัน path traversal, strip metadata, ตั้งค่า Content-Disposition/Type ให้ปลอดภัยเมื่อดาวน์โหลด

### 9.6 Compliance & Auditing
- จัดทำนโยบาย PDPA: consent management, data subject access request flow
- Audit log บันทึก before/after, actor, timestamp และเก็บแยกจากฐานหลัก
- ตรวจสอบ dependencies ด้วย SCA (npm audit, Snyk) และ static analysis ใน pipeline

### 9.7 Incident Response
- จัดทำ runbook สำหรับ security incident (การแจ้งเตือน, isolation, forensic)
- กำหนด contact list และกระบวนการ escalations ตาม SLA

### 9.8 Threat Model (STRIDE Overview)
ตารางนี้สรุปภัยคุกคามหลักและแนวทางควบคุมสำหรับองค์ประกอบสำคัญ โดยพิจารณาตาม STRIDE และอ้างอิงมาตรการที่อยู่ในสถาปัตยกรรมปัจจุบัน

| Component | STRIDE | Threat Example | Mitigation / Control |
| --- | --- | --- | --- |
| Authentication | Spoofing | ผู้โจมตีใช้รหัสผ่านที่รั่วไหลเข้าสู่ระบบ | บังคับ MFA สำหรับ role สำคัญ, ใช้ rate limiting ต่อ user/IP, เปิด IP reputation/Geo anomaly alerts |
| Authentication | Tampering | แก้ไข JWT payload เพื่อยกระดับสิทธิ์ | เซ็น JWT ด้วย asymmetric keys (RS256), เก็บ private key ใน Secret Manager, ตรวจสอบ signature ทุก request |
| Authentication | Repudiation | ผู้ใช้ปฏิเสธการเปลี่ยนแปลงข้อมูลโปรไฟล์ | เก็บ audit log แบบ append-only พร้อม timestamp, correlation ID, และ signing |
| Authentication | Information Disclosure | Token/refresh token ถูกดักฟัง | ใช้ TLS 1.2+, จัดเก็บ refresh token ด้วย HttpOnly/SameSite, หมดอายุสั้น (≤24h) และ rotate เมื่อผิดปกติ |
| Authentication | Denial of Service | Brute force login ทำให้ระบบ authentication ล่ม | ใช้ exponential backoff + circuit breaker สำหรับ auth service, autoscale ตาม queue depth, แยก worker สำหรับ heavy computations |
| Authentication | Elevation of Privilege | Exploit ช่องโหว่ RBAC เพื่อเข้าถึง role admin | ใช้ principle of least privilege, ทดสอบ unit/integration กับ policy, ทำ periodic review ของ role mapping |
| File Upload | Spoofing | อัปโหลดไฟล์พร้อม header ปลอมเพื่อ bypass validation | ตรวจสอบ mime + magic number, ใช้ AV scan และ block unsigned executables |
| File Upload | Tampering | แก้ไขไฟล์ขณะพักอยู่ใน storage | เปิด object versioning + server-side encryption (SSE-S3/KMS), ใช้ signed URL สั้น ๆ เมื่อดาวน์โหลด |
| File Upload | Repudiation | ผู้ใช้ปฏิเสธการอัปโหลด/ดาวน์โหลดไฟล์สำคัญ | เก็บ audit trail พร้อม file hash, user id, request id, และ IP |
| File Upload | Information Disclosure | URL หลุดสู่สาธารณะ | สร้าง pre-signed URL TTL ≤ 5 นาที, จำกัด scope ด้วย RBAC, บังคับ download ผ่าน backend proxy |
| File Upload | Denial of Service | Flood อัปโหลดไฟล์ใหญ่เกิน quota | จำกัดขนาดไฟล์, ใช้ rate limit เฉพาะ module (20 uploads/ผู้ใช้/ชั่วโมง), เปิด WAF rule จำกัด bandwidth |
| File Upload | Elevation of Privilege | อัปโหลด script เพื่อรันบน server | เก็บไฟล์ใน object storage ที่ไม่ execute, sanitize filename/metadata, ใช้ content-disposition แบบ attachment |
| Database | Spoofing | ใช้ credential service account ที่รั่วเพื่อเข้าถึง DB | Rotate DB credentials ทุก 90 วัน, เปิด IAM role separation, บังคับ mTLS สำหรับ admin channel |
| Database | Tampering | SQL injection เปลี่ยนข้อมูลนักเรียน | ใช้ parameterized query ผ่าน Prisma, เพิ่ม WAF rule ตรวจ input, ทำ automated security test (DAST) |
| Database | Repudiation | ผู้ใช้ปฏิเสธการแก้ไขเรคคอร์ดการเงิน | เปิด audit schema แยก, ใช้ logical replication log สำหรับ forensic |
| Database | Information Disclosure | Backup ถูกเข้าถึงโดยไม่ได้รับอนุญาต | เข้ารหัส backup (AES-256), จัดเก็บใน bucket private, ใช้ access logging + anomaly detection |
| Database | Denial of Service | Query หนักทำให้ connection pool เต็ม | ใช้ connection pool limit ต่อ service, auto-kill long-running query via pg_stat_activity, วาง read replica สำหรับรายงาน |
| Database | Elevation of Privilege | ใช้ role app เพื่อทำ operation admin | แยก role (app-read/app-write/admin), ใช้ RLS สำหรับข้อมูลละเอียด, ทำ policy test ทุก release |
| External API | Spoofing | ปลอม webhook จาก payment gateway | ตรวจสอบ HMAC signature + IP allowlist, ใช้ mutual TLS เมื่อรองรับ |
| External API | Tampering | เปลี่ยน payload ระหว่างส่ง | ใช้ HTTPS + JSON schema validation, log checksum และ replay detection |
| External API | Repudiation | คู่ค้าอ้างว่าไม่เคยเรียก API | เก็บ signed request log พร้อม nonce, ส่งกลับ receipt ID |
| External API | Information Disclosure | ส่งข้อมูลนักเรียนไปยัง partner ที่ไม่เกี่ยวข้อง | จำกัด payload ตาม principle of least privilege, ใช้ data masking สำหรับ test/staging integration |
| External API | Denial of Service | Partner ส่งคำขอถี่เกิน SLA | ตั้ง rate limit per partner key (เช่น 200 req/นาที), circuit breaker + queue buffer |
| External API | Elevation of Privilege | ใช้ API key ที่รั่วเพื่อเรียก endpoint admin | แยก key ต่อ scope, rotate อัตโนมัติ, ล็อกบัญชีเมื่อพบ misuse |

---

## 10. Performance, Scalability & Reliability

### 10.1 Performance Objectives
- กำหนดระบบ SLO/SLI:
  - API availability ≥ 99.5%
  - P95 response time < 1.5 วินาทีสำหรับ endpoint หลัก (ตารางเรียน, ใบแจ้งหนี้)
  - Background jobs (เช่น bulk invoice) ต้องเสร็จภายใน SLA ที่ตกลง (เช่น < 5 นาที สำหรับ 2,000 รายการ)
- จัดทำ Performance Test Plan (load test, stress test, endurance test) โดยใช้ JMeter/k6
- ตั้ง capacity plan สำหรับช่วง peak (จำนวน concurrent users, ปริมาณ invoice)

### 10.2 Caching Strategy
- ใช้ Redis 7.2.x สำหรับ:
  - Session/Token cache: TTL เริ่มต้น 30 นาที (extend on read) พร้อม idle timeout 12 ชั่วโมง
  - RBAC permission cache: TTL 10 นาที + pub/sub invalidation เมื่อ role/permission เปลี่ยน
  - Query result cache: ตารางเรียน/สอบ TTL 5 นาที, รายงานสรุป TTL 15 นาที พร้อม background warmer หลัง deploy
  - Rate limiting counter: TTL เท่ากับหน้าต่างเวลา (60 วินาที, 1 ชั่วโมง) เพื่อป้องกัน counter ตกค้าง
- ใช้ HTTP Cache-Control / ETag สำหรับ static asset และ Next.js ISR/SSG; หน้า public TTL 5 นาที, force revalidate สำหรับหน้าที่มีข้อมูลอ่อนไหว
- Implement application-level cache invalidation ผ่าน domain events หรือ CDC (เช่น PostgreSQL NOTIFY → worker) เพื่อ clear key เฉพาะจุด
- ติดตั้ง cache hit ratio dashboard (target ≥ 85% สำหรับ schedule lookup) และ alert เมื่อ latency Redis > 20 ms

### 10.3 Scalability & High Availability
- Backend API และ Next.js รันบน Kubernetes/Container with auto-scaling (HPA)
- ใช้ PostgreSQL แบบ managed ที่รองรับ read replica (สำหรับ report) และ PITR
- ออกแบบ stateless service, ใช้ shared storage ผ่าน object storage
- ฟีเจอร์ batch/long-running jobs ควรแยก worker service และใช้ queue (RabbitMQ/SQS)

### 10.4 Rate Limiting & Throttling
- ใช้ NestJS interceptor หรือ API gateway (Kong, Nginx Ingress) ด้วย sliding window + token bucket: 100 req/นาที ต่อ user, 1,000 req/นาที ต่อ IP, burst allowance 20 req ภายใน 5 วินาที
- Login endpoint: จำกัด 10 ความพยายาม/ผู้ใช้/5 นาที; file upload: 20 รายการ/ผู้ใช้/ชั่วโมง; webhook: 200 req/partner/นาที พร้อม dynamic ban 15 นาที เมื่อเกิน SLA
- เก็บ counter ใน Redis 7.2.x (key per user/IP/endpoint) พร้อม TTL เท่าหน้าต่าง; replicate rule ไปยัง WAF/Ingress เพื่อกัน traffic ตั้งแต่ขอบเครือข่าย
- เพิ่ม circuit breaker / retry policy สำหรับ external API (Payment Gateway, Email) โดยตั้ง failure threshold 5xx ≥ 5% ภายใน 1 นาที แล้วพัก 60 วินาที
- Log และ alert เมื่อเกิดการละเมิด (potential abuse) พร้อมสร้าง security analytics dashboard เพื่อตรวจจับ credential stuffing / data exfiltration

### 10.5 Reliability & Fault Tolerance
- ใช้ retry + exponential backoff สำหรับงาน asynchronous
- ทำ graceful shutdown และ health check endpoint (readiness/liveness)
- จัดทำ chaos testing/DR drill สำหรับกรณีฐานข้อมูล/บริการล่ม

### 10.6 API Standards & Governance
- ออกแบบ REST API ตาม versioning (`/api/v1/...`) และเตรียมแนวทาง upgrade (deprecation notice ≥ 1 release)
- ใช้มาตรฐาน RFC7807 (Problem Details) สำหรับ error response; รวม correlation ID, timestamp, error code
- รองรับ pagination (cursor/offset), filtering, sorting ที่สอดคล้องกัน across endpoints
- Documentation ผ่าน OpenAPI/Swagger + Postman collection; enforce schema validation ด้วย Zod/DTO ใน NestJS
- บังคับ idempotency key สำหรับ endpoint ที่ส่งผลซ้ำ (เช่น payments)
- เพิ่ม API contract test ใน CI เพื่อป้องกัน breaking changes
## 11. DevOps & CI/CD Pipeline

### 11.1 Pipeline & Automation
1. **Source Control**: Git (main + feature branches)
2. **Pipeline Stages**:
   - Lint / Type check (ESLint, TypeScript)
   - Unit Tests (Jest, Vitest)
   - Integration/API Tests (Cypress, Supertest, Postman)
   - Build Artifacts (Docker images)
   - Static Analysis & Security Scan (ESLint rules, SonarQube, Snyk)
   - Infrastructure validation (Terraform plan)
   - Deploy (Staging → Production) ผ่าน GitHub Actions/Jenkins พร้อม manual approval
   - Pin runtime: Node.js 20 LTS + pnpm 9.x สำหรับขั้นตอน install/test/build
3. **Monitoring Pipeline Metrics**: build time, failure rate, flakiness

### 11.2 Infrastructure as Code & Config
- Terraform/Helm สำหรับ provisioning (K8s cluster, DB, Redis, S3)
- ใช้ GitOps (ArgoCD/Flux) หรือ deployment manifest version control
- จัดการ secrets ด้วย sealed secret/Vault (ตามหัวข้อ 9.4)

### 11.3 Load & Security Testing Integration
- Schedule regular load test ก่อน release สำคัญ
- รวม DAST/SAST ใน pipeline (OWASP ZAP automation, snyk test)

### 11.4 Testing Environment Policy
- ใช้ข้อมูลที่ anonymise/mask ตาม field sensitivity ก่อนโหลดเข้าสู่ UAT/Staging; อ้างอิง data-classification matrix ใน `SRS.md`
- แยก secret/key ต่อ environment (Dev/UAT/Staging/Prod) ใน Secret Manager พร้อม rotation ทุก 60 วัน สำหรับ non-prod และ revoke ทันทีหลังการทดสอบ
- บังคับ single tenant namespace ต่อทีมทดสอบ (K8s namespace/isolated DB schema) เพื่อลด cross-test contamination; cleanup automation หลังจบ test run
- จำกัดสิทธิ์เข้าถึง environment ผ่าน RBAC + SSO; เก็บ audit log การกระทำ admin/tester เหมือน production
- กำหนด policy ห้ามเชื่อมต่อกับ external production service จริง (เช่น payment gateway) ให้ใช้ sandbox key และ mock service แทน
- Synchronise configuration drift โดยใช้ IaC plan เปรียบเทียบกับ production ทุก sprint และบันทึกผลใน release checklist ตาม `SDLC_Overview.md`

## 12. Observability, Data Governance & Lifecycle

### 12.1 Observability
| ด้าน | แนวทาง |
| --- | --- |
| Logging | Winston/structured logs → ELK/EFK stack, trace ID per request |
| Metrics | Prometheus/Grafana: API latency (P50/P95), DB connection usage, queue backlog |
| Tracing | OpenTelemetry instrumentation (NestJS + Next.js), Jaeger/Tempo |
| Alerting | Alertmanager/Stackdriver: SLA breach, error rate, db replica lag, webhook failure |
| Dashboards | แยกตาม domain (Grades, Finance, Documents) + Ops overview |

### 12.1.1 API Monitoring Metrics

| Metric | Target | Alert Threshold | Notes / Data Source |
| --- | --- | --- | --- |
| API Latency (p95) | < 1.5 วินาที สำหรับ endpoint หลัก | > 1.5 วินาที ต่อเนื่อง 5 นาที | Prometheus histogram (`http_request_duration_seconds`), tag ตาม module |
| Error Rate (HTTP 5xx) | < 1% ต่อ 15 นาที | ≥ 2% ภายใน 5 นาที | Ingress/NestJS metrics, cross-check Sentry issue volume |
| Apdex Score | ≥ 0.90 | < 0.85 ภายใน 30 นาที | Calculated ใน Grafana จาก latency buckets |
| Cache Hit Ratio (Redis) | ≥ 85% สำหรับ schedule/timetable | < 75% ภายใน 10 นาที | Redis exporter + custom metric จาก application |
| Rate Limit Trigger Count | < 50 เหตุการณ์/5 นาที | ≥ 100 เหตุการณ์/5 นาที | Redis counter + security analytics dashboard |
| External API Failure Ratio | < 3% ต่อ partner | ≥ 5% ต่อ partner ภายใน 10 นาที | Circuit breaker metrics + webhook retry queue |
| Queue Backlog Age | < 2 นาที สำหรับ job ปกติ | ≥ 5 นาที | Monitoring จาก worker metrics (BullMQ/queue length) |

### 12.2 Data Retention & Archiving
- กำหนด retention policy:
  - Log ระบบ: เก็บ 90 วัน (online) + archive 1 ปี (compressed storage)
  - ข้อมูลธุรกรรมการเงิน: ตามข้อกำหนดโรงเรียน/กฎหมาย (เช่น 10 ปี)
  - Document/ใบเสร็จ: ใช้ lifecycle policy (transition to cheaper storage หลัง 1 ปี)
  - Audit log: เก็บอย่างน้อย 3 ปี แยก storage
- กำหนดกระบวนการ purge/anonymise ข้อมูลเมื่อครบกำหนด หรือเมื่อได้รับคำขอลบข้อมูล (PDPA)
- ทำ data classification เพื่อให้รู้ว่าข้อมูลประเภทไหนต้องเข้ารหัสหรือควบคุมเข้ม

### 12.3 Backup, Restore & DR
- PostgreSQL: PITR, test restore ทุกไตรมาส
- S3/Object storage: เปิด versioning + cross-region replication (ถ้าจำเป็น)
- จัดทำ Disaster Recovery Plan พร้อม RPO/RTO เป้าหมาย (เช่น RPO ≤ 15 นาที, RTO ≤ 2 ชม.)


---

## 13. แผนการพัฒนาตามโมดูล + Migration (Mapping กับ Sprint)

| Sprint | โมดูล | ภารกิจสถาปัตยกรรม | งาน Migration |
| --- | --- | --- | --- |
| 1 | Student Registry | Setup baseline architecture, auth, DB schema | สำรวจ Access schema, สร้าง data dictionary |
| 2 | Grades & Assessments | Implement grade workflow, audit log | Mapping ตารางคะแนน, PoC ETL |
| 3 | Finance | Integrate payment, invoice API | Load ข้อมูลการเงินเดิมไป staging |
| 4 | Documents | Document generation, QR service | ตรวจสอบข้อมูลเอกสาร/นักเรียน, แปลง template |
| 5 | Reports & Notifications | Dashboard, scheduled jobs | Final migration rehearsal, validation report |
| Cutover | Deployment Prep | Hardening, infra tuning | Production migration & sign-off |

---

## 14. Open Issues & Decisions ที่ต้องติดตาม

| ประเด็น | รายละเอียด | ผู้รับผิดชอบ |
| --- | --- | --- |
| Payment Gateway provider | ยังไม่ได้เลือก ถ้าระบบต้องการ webhook security ต้องออกแบบตาม provider | Product Owner |
| Document signature provider | ต้องกำหนดบริการลายเซ็นดิจิทัล/QR | Ops/Legal |
| Access DB mapping detail | ยังไม่ทราบ schema/field เต็มรูปแบบ ต้องสำรวจเพิ่มเติม | Data Migration Team |
| Hosting decision | Kubernetes vs Cloud service (ECS, App Runner ฯลฯ) | DevOps |
| Notification channel limit | LINE Notify quota? ต้องตรวจสอบ | Dev Lead |

---

## 15. ภาคผนวก

- `../01-requirements/PRD.md`, `../01-requirements/SRS.md`, `../03-process/SDLC_Overview.md` – แหล่ง requirement/กระบวนการ
- `data/legacy/microsoft_access_db/` – ตัวอย่างฐาน Microsoft Access จากระบบเดิม (ต้นทาง migration)
- Template เอกสาร migration: `MigrationPlan.md`, `MigrationReport.md` (ต้องจัดทำเพิ่มเติม)

---

เอกสารนี้เป็น living document ควรอัปเดตเมื่อมีการตัดสินใจสถาปัตยกรรมใหม่ (เช่น เปลี่ยนเทค stack, เพิ่มบริการใหม่, หรือปรับโครงสร้าง schema) และควรแนบ diagram (Mermaid/Draw.io) ในเวอร์ชันถัดไปสำหรับภาพสถาปัตยกรรมอย่างละเอียด
