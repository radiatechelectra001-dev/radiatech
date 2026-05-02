-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "images" TEXT NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfrastructureImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfrastructureImage_pkey" PRIMARY KEY ("id")
);

-- Seed the existing public project gallery so the site keeps its current images until admins edit them.
INSERT INTO "ProjectImage" ("id", "title", "image", "sortOrder", "createdAt", "updatedAt") VALUES
('project-cooling-tower-piping-installation', 'Cooling Tower Piping Installation', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('project-industrial-pprc-pipeline-system', 'Industrial PPR-C Pipeline System', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('project-process-plant-piping-network', 'Process Plant Piping Network', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('project-pump-room-piping-installation', 'Pump Room Piping Installation', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('project-hvac-system-pprc-piping', 'HVAC System PPR-C Piping', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('project-factory-pipeline-installation', 'Factory Pipeline Installation', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed the existing infrastructure gallery so admins can reorder or replace it from the dashboard.
INSERT INTO "InfrastructureImage" ("id", "title", "image", "sortOrder", "createdAt", "updatedAt") VALUES
('infrastructure-main-production-unit', 'Main Production Unit', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-piping-assembly-area', 'Piping Assembly Area', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-valve-fitting-testing', 'Valve & Fitting Testing', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-pump-motor-room', 'Pump & Motor Room', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-hvac-integration-unit', 'HVAC Integration Unit', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-raw-material-warehouse', 'Raw Material Warehouse', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-pipeline-storage-dispatch', 'Pipeline Storage & Dispatch', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-cooling-tower-project-site', 'Cooling Tower Project Site', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM (1).jpeg', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('infrastructure-completed-installation', 'Completed Installation', '/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg', 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);