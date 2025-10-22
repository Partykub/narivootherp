# เอกสาร Product Requirements Document (PRD) ระบบข้อมูลการศึกษา (School ERP)
**Version 1.1 – 2025-10-22**

## 1. ภาพรวมโครงการ
- **วัตถุประสงค์หลัก**: สร้างระบบศูนย์กลางสำหรับทะเบียนนักเรียน วิชา ตารางเรียน เกรด การเงิน และเอกสารทางการศึกษา เพื่อลดงานแมนนวล ลดความผิดพลาด และเปิดให้นักเรียน/ผู้ปกครองเข้าถึงข้อมูลได้เอง
- **ปัญหาที่ต้องแก้ไข**: การกระจายข้อมูลในหลายระบบ, ขั้นตอนอนุมัติที่ใช้เวลานาน, การออกเอกสารที่ต้องทำเอง, ความไม่ครบถ้วนของข้อมูลการเงินและเกรด, การขาด audit trail
- **ตัวชี้วัดความสำเร็จ (KPI)**: อัตราส่งออกเกรดตรงเวลา, สัดส่วนใบแจ้งหนี้ค้างชำระ, ค่าเฉลี่ยเวลาการออกเอกสารทางการศึกษา, คะแนนความพึงพอใจของผู้ใช้, อัตราข้อผิดพลาดจากการบันทึกข้อมูล

## 2. ผู้ใช้งานและบทบาท (Personas & Roles)
- **นักเรียน**: ดูตารางเรียน/สอบ, ตรวจคะแนน/เกรด/GPA, ดาวน์โหลดเอกสาร ปพ., ตรวจสอบใบแจ้งหนี้และประวัติชำระ
- **ผู้ปกครอง** (ผ่านบัญชีนักเรียนหรือสิทธิ์เฉพาะ): รับการแจ้งเตือนค่าใช้จ่าย ดาวน์โหลดเอกสาร และติดตามเหตุการณ์บุตร
- **อาจารย์ผู้สอน**: ตั้งองค์ประกอบคะแนน, บันทึกคะแนนย่อย, ส่งเกรดเพื่ออนุมัติ, ดูรายชื่อนักเรียนและตารางสอน
- **ครูประจำชั้น/ที่ปรึกษา**: ประเมินคุณลักษณะ, บันทึกเหตุการณ์, แจ้งเตือนผู้ปกครอง
- **หัวหน้ากลุ่มสาระ/ผู้อนุมัติ**: ตรวจสอบและอนุมัติเกรด, พิจารณาคำขอแก้ไขหลังปิดภาคเรียน
- **เจ้าหน้าที่การเงิน**: ตั้งค่าโครงสร้างค่าใช้จ่าย, สร้างใบแจ้งหนี้แบบกลุ่ม, บันทึกการชำระ/คืนเงิน, ออกใบเสร็จ, ตรวจรายงานลูกหนี้
- **เจ้าหน้าที่เอกสาร**: จัดทำเทมเพลตเอกสาร, กำกับการออกเลขที่และลายเซ็นดิจิทัล, ตรวจสอบประวัติการออก
- **ผู้ดูแลระบบ (Administrator)**: จัดการปีการศึกษา/ภาคเรียน, สิทธิ์ผู้ใช้, เกณฑ์ตัดเกรด, แบบฟอร์ม/เทมเพลต, โครงสร้างค่าใช้จ่าย, ตั้งค่าการแจ้งเตือน
- **หมายเหตุเรื่องสิทธิ์ (RBAC)**: ใช้ permission codes เช่น GRADE_READ, GRADE_WRITE, EVAL_WRITE, FIN_INVOICE_ISSUE, DOC_ISSUE_PP, DOC_APPROVE, ADMIN_USER_MGMT พร้อม data scoping (เช่น ครูเห็นเฉพาะวิชาที่สอน)

## 3. ขอบเขตโครงการ (Scope)
- **In Scope (MVP)**
  - ทะเบียนนักเรียนและประวัติการลงทะเบียน/ย้ายห้อง
  - จัดการวิชา ปีการศึกษา ภาคเรียน ตารางเรียน และมอบหมายครู
  - ระบบประเมินผล (assessment definition → score entry → grade submission → approve → lock → grade change request)
  - การประเมินคุณลักษณะรายห้องและบันทึกเหตุการณ์
  - ระบบการเงิน (fee structures, bulk invoices, การชำระ, partial/refund, ใบเสร็จ, Aged AR report)
  - ระบบเอกสาร (เทมเพลต, preview, approve, digital signature, QR verify, ดาวน์โหลด)
  - การแจ้งเตือน (Email/LINE) และหน้า public สำหรับตรวจสอบเอกสาร
  - รายงานหลักและการส่งออก CSV/Excel
  - RBAC, audit logs, integrations ที่จำเป็นต่อการชำระเงิน/การแจ้งเตือน
  - การย้ายข้อมูลเริ่มต้นจากฐาน Microsoft Access เดิม (`microsoft_access_db/*.mdb`, `*.accdb`) ไปยัง PostgreSQL พร้อมทำความสะอาดข้อมูล
- **Out of Scope ระยะแรก**
  - ระบบ LMS เต็มรูปแบบ (การบ้าน ออนไลน์ควิซ)
  - เชื่อมต่อ ERP/ระบบบัญชีเชิงลึก หรือ POS
  - แอปมือถือ native
  - Single Sign-On ภายนอก (พิจารณาในเฟสถัดไป)

## 4. โมดูลและข้อกำหนดเชิงฟังก์ชัน (Functional Modules)
- รายละเอียดเชิง use case ดูเพิ่มเติมใน `USE_CASES.md` (UC-01 ถึง UC-10) และ `UserScenario.md`
1. **Student Registry**
   - เก็บข้อมูลนักเรียน, ผู้ปกครอง/ผู้ชำระเงิน, เอกสารแนบ
   - ประวัติการลงทะเบียนวิชาและการย้ายห้อง/สถานศึกษา
   - เชื่อมโยง SRS ส่วน 3.1
2. **Subjects / Terms / Timetables**
   - จัดการวิชา กลุ่มเรียน ครูผู้สอน
   - จัดตารางเรียน/สอบสำหรับนักเรียนและครู
   - เชื่อมโยง SRS ส่วน 3.2
3. **Grades & Assessments**
   - สร้างองค์ประกอบคะแนนพร้อมน้ำหนัก (รวม = 100)
   - บันทึกคะแนนย่อย, import CSV, บันทึก remark
   - คำนวณคะแนนรวม, เกณฑ์ตัดเกรด, จัดการสถานะพิเศษ (I, W, U)
   - Workflow submit → review/approve → lock, พร้อม request แก้ไข
   - คำนวณ GPA/GPAX และประวัติการเปลี่ยนเกรด
   - เชื่อมโยง SRS ส่วน 3.3
4. **Homeroom Evaluations & Incidents**
   - แบบประเมินคุณลักษณะ (configurable rubric)
   - บันทึกเหตุการณ์ (merit/demerit) และการแจ้งเตือนผู้ปกครอง
   - เชื่อมโยง SRS ส่วน 3.4
5. **Finance**
   - Fee items, fee structures, rules per term/grade/program
   - Bulk invoice generation, partial payment, credit note/refund
   - Receipts, รายงานลูกหนี้, การกระทบยอดขั้นต้น
   - เชื่อมโยง SRS ส่วน 3.5
6. **Official Documents**
   - Template management (versioning, variables), preview, approve
   - ลายเซ็นดิจิทัล, เลขที่เอกสาร, QR verification page
   - เชื่อมโยง SRS ส่วน 3.6
7. **Reports & Dashboards**
   - รายงานผลการเรียน, GPA/GPAX, Aged receivables, สถานะใบแจ้งหนี้/ใบเสร็จ, Log เอกสาร
   - เชื่อมโยง SRS ส่วน 3.8
8. **Notifications / Communication**
   - Email/LINE templates, trigger events (invoice issued, payment overdue, grade published)
   - บันทึก history การส่ง
   - เชื่อมโยง SRS ส่วน 3.7
9. **RBAC & Audit Logs**
   - Role management, permission mapping, data scoping
   - Audit trail สำหรับการแก้ไขข้อมูลสำคัญ (grades, finance, documents)
   - เชื่อมโยง SRS ส่วน 3.9
10. **API Layer & Integrations**
    - REST API ตามสัญญา (ดูหัวข้อ 10)
    - Integration กับ payment gateway (webhooks), LINE Notify/OA, Email (SMTP), QR verification, Export CSV/Excel
    - เชื่อมโยง SRS ส่วน 3.10
11. **Legacy Data Migration**
    - สำรวจโครงสร้างและข้อมูลจากฐาน Microsoft Access เดิม (ไฟล์ในโฟลเดอร์ `microsoft_access_db/`)
    - สร้าง data dictionary และ mapping สู่ schema PostgreSQL
    - กำหนดกระบวนการ ETL/ELT สำหรับ initial load และ incremental sync ถ้าจำเป็น
    - เชื่อมโยง SRS ส่วน 3.11 และ SDLC_Overview.md ส่วน Change Management/Data Migration Tasks

## 5. โครงสร้างข้อมูล (Data Model Summary)
- ดูรายละเอียดเชิงสคีม่าใน `SRS.md` ส่วน 4
- **users**(id, username, password_hash, role, teacher_id?, student_id?)
- **students**, **guardians**, **teachers**
- **terms**, **courses**, **class_sections**, **teaching_assignments**
- **enrollments** (student-course mapping)
- **assessments**(course_id, term_id, name, weight, due_date), **scores**(assessment_id, student_id, value, remark, status)
- **grade_submissions**, **grade_approvals**, **grade_change_requests**
- **homeroom_evaluations**, **incidents**
- **fee_items**, **fee_structures**(rules_json), **invoices**, **invoice_lines**, **payments**, **receipts**, **credit_notes**
- **documents**, **document_templates**(variables_json, version), **document_approvals**, **document_issues**
- **notifications**, **notification_templates**
- **audit_logs** (entity, action, before/after, actor, timestamp)
- แหล่งข้อมูลเดิม: Microsoft Access (`Dtbase (1).mdb`, `StudentData69.accdb`) ต้องทำการ reverse engineer เพื่อสร้าง data dictionary และ mapping
- อ้างอิงรายละเอียด field และโครงสร้างเพิ่มเติมในภาคผนวกหรือ schema design ที่จะจัดทำ

## 6. เวิร์กโฟลว์หลัก (Key Workflows)
- **วงจรการประเมินผล**
  1. ครูนิยาม assessments และน้ำหนักรวม 100%
  2. กรอกคะแนน (single หรือ bulk CSV) พร้อม validation
  3. ครูกด submit → หัวหน้ากลุ่มตรวจสอบ/อนุมัติ/ขอแก้ไข
  4. เมื่อปิดภาคเรียน ระบบ lock; การเปลี่ยนต้องผ่าน request และมี audit
  5. ระบบคำนวณ GPA/GPAX และเตรียมข้อมูลออกเอกสาร
- **วงจรการเงิน**
  1. การเงินตั้ง fee structures และกำหนด target (grade level/program)
  2. สร้างใบแจ้งหนี้แบบกลุ่ม และแจ้งเตือนผ่าน Email/LINE
  3. รับการชำระ (manual หรือ gateway webhook), รองรับ partial/refund
  4. ออกใบเสร็จอัตโนมัติและอัปเดตรายงาน Aged Receivables
- **วงจรเอกสาร**
  1. เลือก template → ดึงข้อมูลที่เกี่ยวข้อง → preview
  2. ส่งขออนุมัติ → ผู้มีสิทธิ์ approve → ระบบออกเลขที่, ลายเซ็นดิจิทัล, QR
  3. บันทึกประวัติการออก และเปิดให้นักเรียนดาวน์โหลด/ตรวจสอบ
- **การประเมินห้องเรียน & Incident**
  - ครูบันทึกผลประเมินและเหตุการณ์ → แจ้งผู้ปกครอง → เก็บประวัติ

## 7. รายงานและแดชบอร์ด (Reporting & Analytics)
- ผลการเรียนรายวิชา/รายห้องพร้อมสถิติผ่าน/ไม่ผ่าน
- รายงาน GPA/GPAX รายบุคคลและจัดอันดับ (ถ้าได้รับอนุมัติจากฝ่ายบริหาร)
- รายงานใบแจ้งหนี้ตามสถานะ, รายงานใบเสร็จ, รายงานลูกหนี้คงค้าง (Aged Receivables)
- รายงานการออกเอกสารตามประเภท/ช่วงเวลา/ผู้อนุมัติ
- สถิติการใช้งานระบบและการแจ้งเตือน
- Export CSV/Excel สำหรับฝ่ายบัญชีหรือการวิเคราะห์ต่อ

## 8. การผสานระบบภายนอก (Integrations)
- **Payment Gateway**: รับ webhook การชำระ, ตรวจสอบ signature, อัปเดตสถานะใบแจ้งหนี้
- **LINE Notify / LINE OA**: ส่งการแจ้งเตือนสถานะการเงิน/เหตุการณ์สำคัญ
- **Email (SMTP)**: ส่งอีเมลระบบ
- **QR Verification Page**: Endpoint สาธารณะสำหรับตรวจเอกสารด้วย serial/verify hash
- **Export**: รองรับ CSV/Excel สำหรับบัญชีและรายงาน
- **Microsoft Access Source**: เครื่องมือสำหรับสำรวจ/ส่งออก (`mdb-tools`, ODBC, สคริปต์ Python) เพื่อ migrate ข้อมูลไป PostgreSQL

## 9. ความต้องการที่ไม่ใช่ฟังก์ชัน (Non-functional Requirements)
- ดูข้อกำหนดรายละเอียดใน `SRS.md` ส่วน 5
- Timezone: ใช้ Asia/Bangkok (UTC+7) ในการจัดเก็บและแสดงผล
- Security & Privacy: ปฏิบัติตาม PDPA, principle of least privilege, masking ข้อมูลอ่อนไหว, password hashing (bcrypt/argon2), บันทึกการเข้าถึง
- Data Integrity & Validation: น้ำหนักรวมเท่ากับ 100, ความถูกต้องของจำนวนเงิน, การจัดการค่าที่เป็น NULL, validation ตาม schema
- Availability & Backup: สำรองข้อมูลสม่ำเสมอ, วางแผน PITR หากใช้ PostgreSQL/MySQL
- Performance: รองรับ peak load ช่วงส่งเกรด/สร้าง invoice; สนับสนุน batch processing และ queue สำหรับงานขนาดใหญ่
- Auditability: ทุกการแก้ไขที่สำคัญต้องสร้าง audit_logs พร้อม before/after และผู้กระทำ
- Testing & UAT: เตรียม dataset นิรนามสำหรับ UAT, กำหนด test case สำหรับ workflow สำคัญ
- Maintainability: โครงสร้างโค้ดต้องรองรับการทดสอบอัตโนมัติและแนวทาง CI/CD ที่สอดคล้อง (ดู SRS ส่วน 5.5)
- Data Migration Quality: ต้องมีรายงานตรวจสอบความครบถ้วนของข้อมูลหลัง migration (จำนวน record, checksum, sampling) และรองรับการ rollback หากพบปัญหา

## 10. สัญญา API ระดับสูง (API Contract Overview)
- **Auth**
  - `POST /api/auth/login {username,password} -> {token, expires}`
  - `POST /api/auth/logout`
- **Students**
  - `GET /api/students/:id`
  - `GET /api/students/:id/timetable`
  - `GET /api/students/:id/grades`
  - `GET /api/students/:id/documents`
- **Courses & Assessments**
  - `GET /api/courses/:id`
  - `GET /api/courses/:id/assessments`
  - `POST /api/courses/:id/assessments` (สิทธิ์ GRADE_WRITE)
  - `POST /api/assessments/:id/scores` (รองรับ bulk/CSV)
- **Finance**
  - `POST /api/fee-structures`
  - `POST /api/invoices/bulk-generate`
  - `GET /api/invoices?studentId=...`
  - `POST /api/invoices/:id/payments`
- **Documents**
  - `GET /api/documents/:id`
  - `POST /api/documents/generate`
  - `GET /verify/:serial` (public QR endpoint)
- ทุก endpoint ใช้ `Authorization: Bearer <token>` และตรวจสิทธิ์ RBAC + data scoping
- รายละเอียด payload/response, error codes, pagination จะระบุต่อใน API spec (OpenAPI) ภายหลัง

## 11. กรณีขอบและกฎธุรกิจ (Edge Cases & Business Rules)
- คะแนนที่ไม่ครบ (NULL) ต้องกำหนดว่าจะคิดเป็นศูนย์หรือไม่รวม (config per course)
- เกรด draft/published: นักเรียนเห็นเฉพาะเกรดที่ published
- ใบแจ้งหนี้รองรับการชำระบางส่วน, ยอดคงเหลือ, การคืนเงิน/credit note
- การออกเอกสารอาจต้องตรวจสอบสถานะการเงินหรือเงื่อนไขอื่นก่อน (configurable per doc_type)
- รองรับการแก้ไขข้อมูลย้อนหลังพร้อมเหตุผลและผู้อนุมัติ

## 12. เกณฑ์ยอมรับ (Acceptance Criteria - MVP)
- นักเรียนสามารถเข้าสู่ระบบ ดูตาราง ดูเกรด ดาวน์โหลดเอกสารส่วนตัวได้
- อาจารย์สร้างคะแนนย่อย ส่งเกรด และหัวหน้ากลุ่มอนุมัติได้ตาม workflow
- เจ้าหน้าที่การเงินสร้างใบแจ้งหนี้ บันทึกการชำระ และระบบออกใบเสร็จอัตโนมัติ
- เอกสารถูกสร้าง/preview/อนุมัติ พร้อมลายเซ็นดิจิทัลและ QR download ได้
- ระบบมี audit log ครอบคลุมการเปลี่ยนแปลงสำคัญ และ RBAC บังคับใช้งานถูกต้อง
- ข้อมูลสำคัญจากฐาน Microsoft Access ถูกย้ายเข้าสู่ PostgreSQL และผ่านการตรวจสอบคุณภาพตาม checklist

## 13. ความเสี่ยงและการบรรเทา (Risks & Mitigations)
- เกณฑ์คะแนน/การตัดเกรดหลากหลาย → ใช้ config ที่ยืดหยุ่นและจัดทำคู่มือใช้งาน
- Payment gateway integration → เลือกผู้ให้บริการที่มี webhook security และทดสอบ end-to-end
- ข้อมูลส่วนบุคคลรั่วไหล → จำกัดสิทธิ์, เข้ารหัสดาต้า, audit log, ทำ penetration test
- ขั้นตอนอนุมัติหลายบทบาท → กำหนด workflow และ SLA ชัดเจน, แจ้งเตือนอัตโนมัติ
- การฝึกอบรมผู้ใช้ → จัดอบรมตามบทบาท, มี knowledge base ในระบบ
- การย้ายข้อมูลจากฐาน Access → จัดทำแผน migration, ทดสอบบน sandbox, ตรวจสอบคุณภาพก่อนใช้งานจริง

## 14. คำถามเปิด (Open Questions)
- ต้องรองรับหลักสูตร/ระดับการศึกษากี่แบบ และมีเกณฑ์คะแนนต่างกันอย่างไร?
- ผู้ปกครองต้องมีบัญชีแยกจากนักเรียนหรือใช้ร่วมกัน?
- ผู้ให้บริการลายเซ็นดิจิทัล/QR verification ที่ต้องการ?
- ต้องการเชื่อมต่อ SSO หรือระบบภายนอกอื่นหรือไม่?
- เงื่อนไขการบล็อกเอกสารเมื่อมีหนี้ค้างชำระต้องเข้มงวดแค่ไหน?
- ต้องมีเอกสารภาษี/ใบกำกับภาษีแบบเต็มรูปแบบหรือไม่?
- รายละเอียดโครงสร้างตาราง/ฟิลด์ในฐาน Microsoft Access เดิมและการแม็ปกับ schema ใหม่เป็นอย่างไร?

## 15. ขั้นตอนถัดไป (Next Steps)
1. จัดลำดับความสำคัญของฟีเจอร์ตาม KPI และกำลังทีม
2. แตกงานเป็น Epics/User Stories พร้อม acceptance criteria และการประเมิน effort
3. จัดทำ ER Diagram และ schema รายละเอียดของฐานข้อมูล
4. จัดทำ OpenAPI spec พร้อม payload/validation และ error handling
5. เลือกเทคโนโลยีและเครื่องมือ (เช่น Next.js + NestJS + PostgreSQL) และกำหนดเครื่องมือ CI/CD
6. สร้าง data dictionary และ mapping จากฐาน Microsoft Access เดิม พร้อมกำหนดขั้นตอน ETL
7. เตรียมข้อมูลตัวอย่างและ UAT dataset (นิรนาม) สำหรับการทดสอบ
8. วางแผน roadmap/sprint หลังจากทุกฝ่ายยืนยันขอบเขต
