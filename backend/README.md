# Backend Service Workspace
**Version:** 0.1.0  
**Date:** 2025-10-23  
**Owner:** Backend Engineering Guild  

## Scope
- เตรียมพื้นที่สำหรับแอป NestJS หลัก (SCRUM-11) พร้อม Prisma และโมดูลย่อย
- เก็บสคริปต์ที่เกี่ยวข้องกับการตั้งค่า backend, migration, และ API documentation
- รักษาความสอดคล้องกับสถาปัตยกรรมใน `docs/02-architecture/ArchitectureDesign.md`

## โครงสร้างที่คาดหวัง (ระยะถัดไป)
```
backend/
├── apps/                 # NestJS applications (API, background workers)
├── prisma/               # Prisma schema + migration + seed
├── configs/              # Runtime configuration, validation schema
├── test/                 # Unit / integration tests
└── README.md
```

> หมายเหตุ: งานภายใต้ Ticket `SCRUM-11` จะสร้างโครงสร้าง NestJS จริงและเชื่อมต่อ PostgreSQL

## งานต่อเนื่อง
- [ ] สร้างสคริปต์ตั้งค่า `.env.example` และคำสั่ง `pnpm dev`, `pnpm test`
- [ ] จัดทำ Health Check endpoint + OpenAPI spec พื้นฐาน
- [ ] กำหนดมาตรฐานโฟลเดอร์ module ตาม Domain (Auth, Student, Finance ฯลฯ)
