# Infrastructure & DevOps Workspace
**Version:** 0.1.0  
**Date:** 2025-10-23  
**Owner:** Platform Engineering Guild  

## Scope
- รวมไฟล์ Docker Compose, IaC (Terraform/Helm), และเครื่องมือ CI/CD pipeline
- สนับสนุนงาน SCRUM-15 (Docker Compose dev stack) และ SCRUM-17 (Initial CI workflow)
- จัดเก็บสคริปต์สำหรับ provisioning local resources (PostgreSQL, Redis, MinIO, RabbitMQ)

## โครงสร้างที่คาดหวัง (ระยะถัดไป)
```
infra/
├── docker/               # Dockerfiles + docker-compose configurations
├── ci/                   # GitHub Actions / Jenkins pipelines
├── terraform/            # Infrastructure as Code modules (phase 2)
├── scripts/              # Helper scripts (backup, seed, migration)
└── README.md
```

> หมายเหตุ: ห้ามเก็บ secret จริงใน repository ให้ใช้งาน `.env.example` + Secret Manager ตามนโยบาย Project Instruction

## งานต่อเนื่อง
- [ ] สร้าง Docker Compose สำหรับ dev (PostgreSQL, Redis, MinIO, RabbitMQ, pgAdmin)
- [ ] ตั้ง Workflow CI พื้นฐาน (lint/test) พร้อม badge สรุป
- [ ] สร้าง runbook/สคริปต์สำหรับ seed data และ migration automation
