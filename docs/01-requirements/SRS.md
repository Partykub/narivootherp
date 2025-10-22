# เอกสาร Software Requirements Specification (SRS) ระบบข้อมูลการศึกษา (School ERP)
**Version 1.1 – 2025-10-22**

## 1. บทนำ

### 1.1 วัตถุประสงค์
กำหนดรายละเอียดข้อกำหนดเชิงฟังก์ชันและไม่ใช่ฟังก์ชันสำหรับการพัฒนาระบบ School ERP โดยอ้างอิงจาก PRD เพื่อใช้เป็นฐานในการออกแบบ สร้าง และทดสอบระบบ

### 1.2 ขอบเขตระบบ
ระบบครอบคลุมการจัดการทะเบียนนักเรียน วิชา ตารางเรียน การประเมินผล การเงิน เอกสารทางการศึกษา การแจ้งเตือน และการควบคุมสิทธิ์ เพื่อให้โรงเรียนบริหารข้อมูลได้อย่างครบวงจรและปลอดภัย

### 1.3 คำจำกัดความและตัวย่อ
- **PRD**: Product Requirements Document
- **RBAC**: Role-Based Access Control
- **PITR**: Point-In-Time Recovery
- **GPA/GPAX**: เกรดย่อย/เกรดเฉลี่ยสะสม
- **Assessment**: องค์ประกอบการประเมิน (งาน, สอบย่อย, สอบกลางภาค ฯลฯ)
- **Invoice**: ใบแจ้งหนี้
- **Receipt**: ใบเสร็จรับเงิน

### 1.4 เอกสารอ้างอิง
- `PRD.md` – Product Requirements Document ระบบ School ERP
- ข้อกำหนด PDPA ประเทศไทย (สำหรับการประมวลผลข้อมูลส่วนบุคคล)
- มาตรฐานหรือข้อกำหนดจาก Payment Gateway และ LINE OA (เมื่อตกลงเลือกผู้ให้บริการ)

## 2. ภาพรวมระบบ

### 2.1 มุมมองผลิตภัณฑ์
ระบบเป็นเว็บแอปพลิเคชันแบบหลายบทบาท เชื่อมต่อฐานข้อมูลส่วนกลาง และบูรณาการกับบริการภายนอก (Payment Gateway, LINE, Email, QR verification) ผ่าน API/Webhook

### 2.2 ฟังก์ชันหลัก (สรุป)
1. ทะเบียนนักเรียนและผู้ปกครอง
2. จัดการวิชา ภาคเรียน ตารางเรียน
3. ระบบการประเมินคะแนนและอนุมัติเกรด
4. การประเมินห้องเรียนและบันทึกเหตุการณ์
5. ระบบการเงิน (fee structures → invoice → payment → receipt)
6. ระบบเอกสารทางการศึกษา (template, approval, digital signature, QR)
7. รายงานและแดชบอร์ด
8. การแจ้งเตือน (Email, LINE)
9. RBAC และ audit logs

### 2.3 ผู้ใช้งานและลักษณะ
- นักเรียน/ผู้ปกครอง: ผู้ใช้ปลายทางที่เข้าดูข้อมูลของตนเอง
- อาจารย์ฝ่ายสอน/ครูประจำชั้น: ผู้สร้างคะแนน ประเมิน และบันทึกเหตุการณ์
- หัวหน้ากลุ่ม/ฝ่ายวิชาการ: ผู้อนุมัติเกรดและเปลี่ยนสถานะหลังล็อก
- เจ้าหน้าที่การเงิน: ผู้จัดการใบแจ้งหนี้ การชำระ และรายงาน
- เจ้าหน้าที่เอกสาร/ธุรการ: ผู้ดูแลการออกเอกสารทางการศึกษา
- ผู้ดูแลระบบ: ผู้กำหนดสิทธิ์ เทมเพลต ค่าใช้จ่าย ปีการศึกษา ฯลฯ

### 2.4 ข้อจำกัดระดับสูง
- ใช้ Timezone Asia/Bangkok สำหรับการเก็บและแสดงเวลา
- ต้องปฏิบัติตาม PDPA และนโยบายความปลอดภัยข้อมูล
- ต้องรองรับ peak load ช่วงส่งเกรดและออกใบแจ้งหนี้พร้อมกัน
- ระบบเริ่มแรกเป็นเว็บ responsive; แอป native อยู่ในขอบเขตระยะถัดไป

### 2.5 สมมติฐานและการพึ่งพา
- สถานศึกษามีข้อมูลพื้นฐานพร้อมสำหรับการ migration/seed
- จะเลือก Payment Gateway และผู้ให้บริการลายเซ็นดิจิทัลที่สนับสนุน API
- ผู้ใช้มีการเชื่อมต่ออินเทอร์เน็ตที่เพียงพอสำหรับใช้งานเว็บแอป

## 3. ข้อกำหนดเชิงฟังก์ชัน (Functional Requirements)

### 3.1 ทะเบียนนักเรียน (Student Registry)  
เชื่อมโยง `PRD.md` ส่วน 4 (Student Registry) และ `USE_CASES.md` UC-01
FR-REG-01: ระบบต้องให้ผู้ดูแลบันทึก/แก้ไขข้อมูลนักเรียน (ข้อมูลส่วนตัว, ผู้ปกครอง, ช่องทางติดต่อ, เอกสารแนบ)  
FR-REG-02: ระบบต้องแสดงประวัติการลงทะเบียนเรียน/ย้ายห้องของนักเรียนแต่ละคน  
FR-REG-03: นักเรียนและผู้ปกครองต้องเข้าดูข้อมูลเฉพาะของตนเอง  
FR-REG-04: การเปลี่ยนแปลงข้อมูลสำคัญต้องบันทึก audit log

### 3.2 จัดการวิชา ภาคเรียน ตารางเรียน (Subjects & Timetables)  
เชื่อมโยง `PRD.md` ส่วน 4 (Subjects / Terms / Timetables) และ `USE_CASES.md` UC-01, UC-02
FR-SUB-01: ผู้ดูแลกำหนดปีการศึกษา ภาคเรียน วิชา กลุ่มเรียน และมอบหมายครูได้  
FR-SUB-02: ระบบสร้างและแสดงตารางเรียน/สอนสำหรับบทบาทที่เกี่ยวข้อง  
FR-SUB-03: ระบบต้องรองรับการ export timetable (PDF หรือ Excel)  
FR-SUB-04: ทุกการเปลี่ยนแปลงต้องเคารพข้อจำกัดเวลาของภาคเรียน

### 3.3 ระบบประเมินผลและเกรด (Grades & Assessments)  
เชื่อมโยง `PRD.md` ส่วน 4 (Grades & Assessments) และ `USE_CASES.md` UC-02, UC-03, UC-10
FR-GRD-01: ครูสร้างองค์ประกอบคะแนน (assessment) พร้อมน้ำหนักรวม 100%  
FR-GRD-02: ครูบันทึกคะแนนย่อยได้ทั้งแบบทีละรายการและอัปโหลด CSV  
FR-GRD-03: ระบบคำนวณคะแนนรวมและเกรดตามเกณฑ์ที่กำหนด  
FR-GRD-04: Workflow ต้องรองรับสถานะ draft → submitted → approved → locked  
FR-GRD-05: นักเรียนเห็นผลคะแนนเฉพาะเมื่อสถานะเป็น published  
FR-GRD-06: ต้องรองรับคำขอแก้ไขคะแนนหลังล็อกพร้อมการอนุมัติ  
FR-GRD-07: ระบบคำนวณ GPA/GPAX อัตโนมัติและบันทึกประวัติ

### 3.4 การประเมินห้องเรียนและเหตุการณ์ (Homeroom & Incidents)  
เชื่อมโยง `PRD.md` ส่วน 4 (Homeroom Evaluations & Incidents) และ `USE_CASES.md` UC-07
FR-HRM-01: ครูประจำชั้นเลือกแบบประเมิน (rubric) และบันทึกผลสำหรับนักเรียนได้  
FR-HRM-02: บันทึกเหตุการณ์ (คะแนนความประพฤติ/โทษ) พร้อมแจ้งผู้ปกครอง  
FR-HRM-03: ข้อมูล incidents ต้องสามารถค้นหา/กรองตามช่วงเวลาและประเภทได้  
FR-HRM-04: การแก้ไขต้องมีเหตุผลและบันทึกใน audit log

### 3.5 ระบบการเงิน (Finance)  
เชื่อมโยง `PRD.md` ส่วน 4 (Finance) และ `USE_CASES.md` UC-04, UC-05
FR-FIN-01: ผู้ดูแลกำหนด fee items และโครงสร้างค่าใช้จ่ายตามระดับ/โปรแกรม  
FR-FIN-02: ระบบสร้างใบแจ้งหนี้แบบกลุ่มและบันทึกสถานะการออก  
FR-FIN-03: รองรับการบันทึกการชำระแบบเต็มจำนวน บางส่วน และการคืนเงิน  
FR-FIN-04: ระบบออกใบเสร็จและเชื่อมโยงกับการชำระ  
FR-FIN-05: รายงานลูกหนี้ (Aged Receivables) และสถานะใบแจ้งหนี้ต้องพร้อมใช้งาน  
FR-FIN-06: เชื่อมต่อ webhook จาก Payment Gateway เพื่ออัปเดตสถานะการชำระ  
FR-FIN-07: รองรับการ export รายการการเงินเป็น CSV/Excel

### 3.6 ระบบเอกสารทางการศึกษา (Official Documents)  
เชื่อมโยง `PRD.md` ส่วน 4 (Official Documents) และ `USE_CASES.md` UC-06
FR-DOC-01: ผู้มีสิทธิ์สร้าง/แก้ไขเทมเพลตเอกสารพร้อมตัวแปรข้อมูล  
FR-DOC-02: ระบบรองรับเวิร์กโฟลว์ preview → submit → approve → publish  
FR-DOC-03: เอกสารที่อนุมัติแล้วต้องมีเลขที่, ลายเซ็นดิจิทัล, และ QR verification  
FR-DOC-04: นักเรียนดาวน์โหลดเอกสารได้ หากไม่ติดเงื่อนไขบล็อก (เช่น ค้างชำระ)  
FR-DOC-05: ทุกการออกเอกสารต้องเก็บ log และตรวจสอบย้อนหลังได้

### 3.7 การแจ้งเตือนและสื่อสาร (Notifications)  
เชื่อมโยง `PRD.md` ส่วน 4 (Notifications / Communication) และ `USE_CASES.md` UC-04, UC-06, UC-09
FR-NOT-01: ผู้ดูแลกำหนดเทมเพลตการแจ้งเตือนสำหรับ Email และ LINE ได้  
FR-NOT-02: ระบบทริกเกอร์การแจ้งเตือนกรณีใบแจ้งหนี้ออก, ใกล้ครบกำหนด, เกรดเผยแพร่, เหตุการณ์พฤติกรรม ฯลฯ  
FR-NOT-03: บันทึกประวัติการแจ้งเตือนและสถานะการส่ง  
FR-NOT-04: รองรับ opt-in/out สำหรับช่องทางที่รองรับ

### 3.8 รายงานและแดชบอร์ด  
เชื่อมโยง `PRD.md` ส่วน 4 (Reports & Dashboards) และ `USE_CASES.md` UC-09, `UserScenario.md` Scenario 7
FR-RPT-01: รายงานผลการเรียนต่อวิชา/ห้องพร้อมสถิติพื้นฐาน  
FR-RPT-02: รายงาน GPA/GPAX และการจัดอันดับ (ถ้าเปิดใช้)  
FR-RPT-03: รายงานสถานะใบแจ้งหนี้/ใบเสร็จ/ลูกหนี้คงค้าง  
FR-RPT-04: รายงานการออกเอกสารตามช่วงเวลาและผู้อนุมัติ  
FR-RPT-05: แดชบอร์ดสรุปกิจกรรมระบบ (เช่น การเข้าสู่ระบบ, การแจ้งเตือน)

### 3.9 RBAC และการจัดการผู้ใช้  
เชื่อมโยง `PRD.md` ส่วน 4 (RBAC & Audit Logs) และ `USE_CASES.md` UC-08, UC-10
FR-RBAC-01: ผู้ดูแลสร้างบทบาทและกำหนด permission codes ได้  
FR-RBAC-02: ระบบจำกัดการเข้าถึงข้อมูลตามบทบาทและขอบเขต (เช่น วิชาที่สอน)  
FR-RBAC-03: บันทึก audit log สำหรับการจัดการสิทธิ์และกิจกรรมสำคัญทั้งหมด  
FR-RBAC-04: รองรับการระงับ/ปลดการใช้งานบัญชีและการรีเซ็ตรหัสผ่าน

### 3.10 API และการผสานระบบ  
เชื่อมโยง `PRD.md` ส่วน 4 (API Layer & Integrations) และ `PRD.md` ส่วน 10
FR-API-01: จัดทำ REST API ตามสัญญาใน PRD พร้อม JWT authentication  
FR-API-02: บังคับ RBAC และ data scoping ในทุก endpoint  
FR-API-03: รองรับ webhook รับชำระจาก Payment Gateway ด้วยการตรวจสอบลายเซ็น  
FR-API-04: จัดทำ endpoint สำหรับ QR document verification (สาธารณะ)  
FR-API-05: ให้ความสามารถ export/import ข้อมูลตามรูปแบบที่กำหนด

### 3.11 การย้ายข้อมูลจากระบบเดิม (Legacy Data Migration)  
เชื่อมโยง `PRD.md` ส่วน 4 (Legacy Data Migration) และ `microsoft_access_db/`  
FR-MIG-01: ทีมต้องสำรวจฐาน Microsoft Access เดิม (`Dtbase (1).mdb`, `StudentData69.accdb`) เพื่อจัดทำ data dictionary และ inventory ของตาราง/ฟิลด์  
FR-MIG-02: ต้องกำหนด mapping ระหว่างตาราง/ฟิลด์ใน Access กับ schema ใหม่ของ PostgreSQL (รวมการจับคู่ data type, primary/foreign key)  
FR-MIG-03: ระบบต้องรองรับสคริปต์/เครื่องมือในการดึงข้อมูลจาก Access (ผ่าน ODBC/mdb-tools หรือรูปแบบ CSV) และนำเข้าลง PostgreSQL  
FR-MIG-04: ต้องมี validation (record count, checksum, sampling) เพื่อยืนยันความถูกต้องของข้อมูลที่ย้าย  
FR-MIG-05: จัดทำ log/report ของกระบวนการ migration และจัดเก็บใน Change Log  
FR-MIG-06: หากต้องมี incremental migration ให้กำหนด trigger/เงื่อนไขการดึงข้อมูลใหม่อย่างชัดเจนหรือยืนยันว่าไม่จำเป็น

## 4. ข้อกำหนดข้อมูล (Data Requirements)
- สนับสนุนฐานข้อมูลเชิงสัมพันธ์ (เช่น PostgreSQL) พร้อม ER ที่กำหนดใน PRD (ดู `PRD.md` ส่วน 5)
- ฟิลด์สำคัญ:  
  - `users(id, username, password_hash, role, teacher_id?, student_id?)`  
  - `students`, `guardians`, `teachers`, `enrollments`, `courses`, `terms`, `class_sections`  
  - `assessments`, `scores`, `grade_submissions`, `grade_approvals`, `grade_change_requests`  
  - `fee_items`, `fee_structures`, `invoices`, `invoice_lines`, `payments`, `receipts`, `credit_notes`  
  - `documents`, `document_templates`, `document_approvals`, `document_issues`  
  - `homeroom_evaluations`, `incidents`, `notifications`, `notification_logs`, `audit_logs`
- ต้องกำหนด foreign key, unique constraint, index และ referential integrity อย่างชัดเจน
- มีการจัดเก็บ timestamp (`created_at`, `updated_at`) สำหรับทุกตารางหลัก
- ข้อมูลส่วนบุคคลและจำนวนเงินต้องเก็บตามรูปแบบและความละเอียดที่กำหนด (เช่น decimal(12,2))
- ต้องจัดทำ data dictionary ของฐาน Microsoft Access เดิมและ mapping สู่ schema PostgreSQL รวมถึงการจัดการค่าที่ไม่ตรง type หรือข้อมูลที่ขาดหาย

## 5. ข้อกำหนดเชิงคุณภาพ (Non-functional Requirements)  
สอดคล้องกับ `PRD.md` ส่วน 9

### 5.1 ประสิทธิภาพ (Performance)
- รองรับผู้ใช้พร้อมกันตาม peak load ที่คาด (เช่น ช่วงส่งเกรดและสร้าง invoice)
- การตอบสนองหน้าเว็บหลักควร ≤ 3 วินาที ภายใต้ภาระปกติ
- งาน batch (สร้างใบแจ้งหนี้กลุ่ม, ส่งแจ้งเตือนจำนวนมาก) ต้องทำผ่าน queue/worker เพื่อลดผลกระทบ

### 5.2 ความปลอดภัย (Security)
- ใช้ HTTPS สำหรับทุกการสื่อสาร
- จัดเก็บรหัสผ่านด้วย bcrypt/argon2 และบังคับนโยบายรหัสผ่าน
- ใช้ RBAC + data scoping, masking ข้อมูลอ่อนไหว, และบันทึก audit log
- ตรวจสอบ webhook ด้วย signature/token, ป้องกัน replay
- ปฏิบัติตาม PDPA และมีขั้นตอนตอบสนองเหตุการณ์ (incident response)

### 5.3 ความพร้อมใช้งานและสำรองข้อมูล (Availability & Backup)
- จัดทำแผนสำรองข้อมูลรายวันและ PITR สำหรับฐานข้อมูล
- มี health check endpoint และระบบแจ้งเตือนหากเกิด downtime

### 5.4 ความเชื่อถือได้ (Reliability)
- การออกเอกสารและการสร้างใบแจ้งหนี้ต้องเป็น atomic (สำเร็จทั้งหมดหรือไม่สำเร็จ)
- รองรับ retry สำหรับการบันทึกการชำระจาก webhook

### 5.5 ความสามารถในการดูแลรักษา (Maintainability)
- โค้ดต้องมีการจัดโครงสร้างและเอกสารประกอบตามมาตรฐานทีม (เช่น Clean Architecture, CI/CD)
- มี automated test (unit, integration) สำหรับ workflow สำคัญ

### 5.6 การจัดการเวลาและความถูกต้องของข้อมูล (Timezone & Data Integrity)
- จัดเก็บและแสดงเวลาตามเขต เวลา Asia/Bangkok (UTC+7) ให้สอดคล้องทุกบริการ
- ตรวจสอบน้ำหนักคะแนนรวม 100%, ความถูกต้องของจำนวนเงิน และการจัดการค่า NULL ตามข้อกำหนดเชิงธุรกิจ

### 5.7 การตรวจสอบย้อนกลับ (Auditability)
- บันทึก audit log สำหรับการแก้ไขข้อมูลสำคัญ เช่น คะแนน, การเงิน, เอกสาร โดยเก็บ before/after, ผู้กระทำ, timestamp
- Audit log ต้องสามารถค้นหาและส่งออกได้ตามบทบาทที่กำหนด

### 5.8 การทดสอบและข้อมูลทดลอง (Testing & UAT)
- เตรียมชุดข้อมูลทดสอบที่นิรนามสำหรับ UAT และการฝึกอบรม
- กำหนด test case ครอบคลุมกรณีปกติ, ขอบ, และกรณียกเว้นของ workflow ที่สำคัญ

### 5.9 คุณภาพการย้ายข้อมูล (Data Migration Quality)
- ต้องมีเอกสารขั้นตอนการย้ายข้อมูล (Migration Runbook) ระบุเครื่องมือ, คำสั่ง, และจุด rollback
- ตรวจสอบจำนวนระเบียนก่อน/หลัง, ค่า checksum/aggregate สำคัญ และบันทึกผล
- บันทึกปัญหาหรือข้อมูลที่ตกหล่นพร้อมวิธีแก้ใน Change Log

## 6. ข้อกำหนดส่วนติดต่อ (Interface Requirements)

### 6.1 ส่วนติดต่อผู้ใช้ (UI)
- เว็บ responsive ต้องรองรับ Desktop/Tablet/Mobile และจอแสดงผลขนาดใหญ่ (TV/Display ≥ 55") โดยปรับ layout ให้ใช้งานได้ครบฟังก์ชัน
- นำเสนอข้อมูลสำคัญ (ตารางเรียน, รายวิชา, เกรด, ใบแจ้งหนี้, เอกสาร) ตามบทบาท
- มี state แสดงความคืบหน้าของ workflow (เช่น สถานะการส่งเกรด, สถานะอนุมัติเอกสาร)

### 6.2 ส่วนติดต่อภายนอก (External Interfaces)
- Payment Gateway: REST/Webhook (ตามผู้ให้บริการที่เลือก)
- LINE Notify/LINE OA: HTTP API สำหรับส่งข้อความ
- Email: SMTP หรือบริการส่งอีเมล
- QR Verification: Endpoint สาธารณะสำหรับตรวจสอบเอกสาร

### 6.3 API ภายใน
- RESTful API ตาม Endpoint ที่ระบุใน PRD (มาตรฐาน JSON, pagination, error format)
- ใช้ JWT Bearer token ใน header Authorization

## 7. ข้อกำหนดการยอมรับ (Acceptance Criteria)
- ครอบคลุม acceptance criteria จาก PRD หมวด MVP (นักเรียนใช้งานได้, ครูส่งเกรด, การเงินออกใบแจ้งหนี้, เอกสารอนุมัติพร้อม QR, audit log)
- ต้องมี test case ครอบคลุมกรณีปกติ/ข้อผิดพลาด/edge cases (คะแนนไม่ครบ, partial payment, บล็อกเอกสารเพราะค้างชำระ ฯลฯ)
- ต้องมี migration test case ที่ยืนยันการย้ายข้อมูลจากฐาน Microsoft Access ตาม mapping และผ่านการตรวจสอบคุณภาพข้อมูล

## 8. ภาคผนวก

### 8.1 แผนการส่งมอบ (Release Plan)
- อิง Sprint 5 ช่วง (Core models → Grades → Finance → Documents → Homeroom/Notifications/Dashboard)

### 8.2 รายการเปิดประเด็น (Open Issues)
- การเลือกผู้ให้บริการ Payment Gateway และลายเซ็นดิจิทัล
- นโยบายการเข้าถึงของผู้ปกครอง (บัญชีแยกหรือใช้ของนักเรียน)
- รายละเอียดการบล็อกเอกสารเมื่อมีหนี้ค้างชำระ
- ความต้องการภาษี/ใบกำกับภาษีที่เกี่ยวข้อง

### 8.3 การอ้างอิงสถาปัตยกรรม
- สถาปัตยกรรมและเทคโนโลยี (เช่น Next.js, NestJS, PostgreSQL) จะยืนยันในเอกสาร Architecture Decision Record ภายหลัง

---

เอกสาร SRS นี้ใช้ร่วมกับ `PRD.md` และแบบจำลองอื่น ๆ (ER Diagram, API Spec) เพื่อกำกับการออกแบบและพัฒนาระบบ School ERP
