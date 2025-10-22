# SDLC Overview – School ERP Project

**Version:** 1.0  
**Date:** 2025-10-22  
**Author:** [Ratchanon Kunyodying]  
**Approved by:** [Product Owner / Project Manager]

---

## 1. SDLC Model
ใช้โมเดล **Agile-Scrum + Incremental Delivery**

### เหตุผลที่เลือก
- ระบบ School ERP มีหลายโมดูล (ทะเบียน, เกรด, การเงิน, เอกสาร, รายงาน)
- แต่ละโมดูลสามารถพัฒนาแยกเป็น Sprint ย่อยได้
- ต้องการ feedback เร็วจากฝ่ายงาน เช่น ครู, ฝ่ายทะเบียน, การเงิน
- สามารถปรับ requirement ได้ตามผลการทดสอบหรือ UAT

---

## 2. Roles & Responsibilities
| บทบาท | หน้าที่หลัก |
|--------|---------------|
| **Product Owner (PO)** | จัดลำดับความสำคัญของฟีเจอร์, ตรวจรับผลงาน, ตัดสินใจด้านธุรกิจ |
| **Scrum Master** | ดูแลให้ทีมทำงานตามกระบวนการ Agile, จัดการอุปสรรค |
| **Developers** | ออกแบบ/พัฒนาโค้ด, เขียน Unit Test, เชื่อม API |
| **QA/Testers** | ออกแบบ Test Case, ทดสอบฟังก์ชันและ UAT |
| **UX/UI Designer** | ออกแบบหน้าจอ, สร้าง prototype |
| **Stakeholders** | ให้ requirement และ feedback ระหว่าง sprint review |

---

## 3. SDLC Phases

| Phase | รายละเอียด | Deliverables | เอกสารอ้างอิง |
|-------|--------------|---------------|----------------|
| **1. Requirement & Analysis** | เก็บและวิเคราะห์ความต้องการจากผู้ใช้ และสำรวจระบบเดิม | PRD, SRS, Use Cases, User Scenarios, Legacy System Inventory | `../01-requirements/PRD.md`, `../01-requirements/SRS.md`, `../01-requirements/USE_CASES.md`, `../01-requirements/UserScenario.md`, เอกสารสรุปการสำรวจ Access |
| **2. System Design** | ออกแบบสถาปัตยกรรม, โครงสร้างฐานข้อมูล, อินเทอร์เฟซ, data mapping | Architecture Design, ER Diagram, OpenAPI Spec, Data Mapping Spec | `../02-architecture/ArchitectureDesign.md`, ER Diagram, แผนผัง API, แผนผังการแม็ปข้อมูล |
| **3. Data Migration Planning & PoC** | วิเคราะห์ฐาน Microsoft Access เดิม, สร้าง data dictionary, PoC ETL | Data Dictionary, Migration Plan, Prototype Scripts | โฟลเดอร์ `data/legacy/microsoft_access_db/`, รายงานการทดลอง migration |
| **4. Implementation (Sprint)** | พัฒนาและทดสอบแต่ละโมดูลตาม Sprint Plan | Source Code, Sprint Backlog | Git Repository |
| **5. Testing & QA** | ทดสอบ Unit / Integration / UAT และ Migration Verification | Test Plan, Test Report, Migration Verification Report | `TestPlan.md`, `MigrationReport.md` |
| **6. Deployment** | ส่งมอบระบบไปยัง Staging / Production | Release Note, Deployment Log | `DeploymentPlan.md` |
| **7. Maintenance & Improvement** | แก้ไขบั๊ก, ปรับปรุงตาม feedback, บันทึก CR | Change Request Log | `ChangeLog.md` |

---

## 4. Agile Workflow
1. แบ่งงานจาก PRD/SRS เป็น **Epics → User Stories → Tasks**  
2. วางแผนใน **Sprint (2 สัปดาห์)**  
3. ประชุมสำคัญ:
   - **Sprint Planning:** วางแผนงานรอบใหม่  
   - **Backlog Refinement:** ทบทวน/ปรับ requirement และ story ก่อนเข้า Sprint  
   - **Daily Stand-up:** รายงานความคืบหน้า/อุปสรรค  
   - **Sprint Review:** สาธิตฟีเจอร์ให้ PO ตรวจรับ  
   - **Sprint Retrospective:** ปรับปรุงกระบวนการในรอบถัดไป  

---

## 5. Definition of Ready (DoR)
เรื่องงานจะถือว่า “พร้อมทำ” เมื่อ:
- Requirement ชัดเจน มี Acceptance Criteria ครบ
- ไม่มี dependency ที่ยังไม่พร้อม
- UX/UI ออกแบบครบถ้วน
- ประเมิน effort แล้วใน Story Points
- PO ตรวจสอบและอนุมัติให้นำเข้าสู่ Sprint

---

## 6. Definition of Done (DoD)
งานจะถือว่า “เสร็จสมบูรณ์” เมื่อ:
- โค้ดผ่านการทดสอบ Unit และ Integration  
- ผ่านการ Review และ Merge เข้าสู่ main branch  
- เอกสาร (README, API, User Manual) อัปเดตแล้ว  
- ผ่าน UAT และได้รับการยืนยันจาก PO  
- Deploy สำเร็จใน environment เป้าหมาย  

---

## 7. Deliverables per Sprint
| Sprint | โมดูลเป้าหมาย | Deliverables |
|:------:|----------------|---------------|
| 1 | Student Registry | ฟอร์มทะเบียน, ระบบล็อกอิน, DB Schema |
| 2 | Grades & Assessments | ระบบบันทึกคะแนน, export PDF |
| 3 | Finance | ระบบใบแจ้งหนี้, ชำระเงิน, รายงาน |
| 4 | Documents | ระบบออกเอกสาร ปพ., QR Verification |
| 5 | Reports | Dashboard, สถิติผลการเรียน |
| ทุก Sprint | Data Migration | ปรับปรุง data mapping, สคริปต์ ETL, รายงานตรวจสอบ (ทำควบคู่ไปกับโมดูลที่ใช้ข้อมูลจริง) |

*(ตารางนี้สามารถปรับได้ตาม backlog จริง)*

---

## 8. Tools & Environments
| หมวด | เครื่องมือที่ใช้ |
|------|------------------|
| Version Control | Git / GitHub |
| Issue Tracking | Jira / GitHub Projects |
| Communication | Slack / LINE |
| CI/CD | GitHub Actions / Jenkins |
| Testing | Postman, Cypress, Pytest |
| Deployment | Docker, Kubernetes, AWS / GCP |
| Documentation | Markdown, Mermaid, draw.io |
| Data Migration | `mdb-tools`, Python + `pyodbc`/`sqlalchemy`, Excel/CSV utilities |

---

## 9. Traceability & Quality
- ทุกฟีเจอร์ต้องเชื่อมโยงกับ Requirement ID จาก SRS  
- Test Case ต้องอ้างอิง Use Case หรือ Scenario ที่เกี่ยวข้อง  
- บันทึกผลการทดสอบใน Test Report ทุก Sprint  
- ใช้ Lint, Code Review, และ Static Analysis ใน CI  

---

## 10. Change Management
- ทุกการแก้ไข Requirement ต้องผ่านการบันทึกใน Change Log และ Backlog  
- การเปลี่ยนแปลงใหญ่ต้องมี Impact Analysis (ขอบเขต, เวลา, งบประมาณ, ความเสี่ยง)  
- เวอร์ชันของเอกสารและโค้ดต้องตรงกัน (เช่น v1.1 → v1.2)  
- กระบวนการรับการเปลี่ยนแปลง:
  1. **Intake:** ผู้ร้องขอส่งรายละเอียดการเปลี่ยนแปลงผ่าน Change Request (หรือ Story ใหม่ใน Backlog) ที่อ้างอิง requirement เดิม  
  2. **Triage:** Product Owner และทีมวิเคราะห์ผลกระทบ, จัดลำดับความสำคัญ, และตัดสินใจว่าจะยอมรับ/ปฏิเสธ  
  3. **Update Artifacts:** หากรับการเปลี่ยนแปลง ให้ปรับ `../01-requirements/PRD.md`, `../01-requirements/SRS.md`, Use Case, Test Case พร้อมระบุเวอร์ชัน/Revision History  
  4. **Estimate & Plan:** ทีมประเมิน Story Points และวางใน Sprint ที่เหมาะสม หรือปรับ Release Plan  
  5. **Communicate:** แจ้ง Stakeholder และทีมที่ได้รับผลกระทบ (Dev, QA, Deployment)  
  6. **Trace & Verify:** ปรับ Traceability Matrix/Test Plan ให้ครอบคลุม requirement ที่เปลี่ยน และยืนยันใน Sprint Review/UAT  

---

## 11. Risk Management
| หมวดความเสี่ยง | รายละเอียด | แนวทางลดความเสี่ยง |
|----------------|-------------|----------------------|
| บุคลากร | ทีมมีขนาดเล็ก | Cross-training, จัดลำดับงานสำคัญ |
| Requirement | ความเข้าใจไม่ตรงกัน | ใช้ PRD/SRS ที่ version control และ sign-off |
| เทคโนโลยี | Framework ใหม่ | เริ่มต้นด้วย prototype เล็ก |
| การส่งมอบ | Delay จากฝ่ายธุรกิจ | มี milestone ชัดเจนในแต่ละ Sprint |
| การย้ายข้อมูล | Schema Access ไม่ชัดเจน, คุณภาพข้อมูลต่ำ | ทำ data profiling ตั้งแต่ต้น, จัดทำ mapping, ทดสอบ migration บ่อยๆ |

---

## 12. References
- `../01-requirements/PRD.md` – Product Requirements Document  
- `../01-requirements/SRS.md` – Software Requirements Specification  
- `../01-requirements/USE_CASES.md` – Use Case Document  
- `../01-requirements/UserScenario.md` – User Scenarios  

---

*(เอกสารนี้สามารถเก็บไว้ในโฟลเดอร์ `/docs/03-process/SDLC_Overview.md` และอัปเดตเวอร์ชันเมื่อเปลี่ยนโมเดลหรือขั้นตอนการทำงาน)*
