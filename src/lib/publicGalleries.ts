import { markPublicDbAvailable, markPublicDbUnavailable, shouldSkipPublicDbRead } from "@/lib/dbHealth";

type PrismaClientInstance = typeof import("@/lib/db")["prisma"];

export type PublicGalleryImage = {
  id: string;
  title: string;
  image: string;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const fallbackProjectImages: PublicGalleryImage[] = [
  { id: "project-cooling-tower-piping-installation", title: "Cooling Tower Piping Installation", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg", sortOrder: 1 },
  { id: "project-industrial-pprc-pipeline-system", title: "Industrial PPR-C Pipeline System", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg", sortOrder: 2 },
  { id: "project-process-plant-piping-network", title: "Process Plant Piping Network", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg", sortOrder: 3 },
  { id: "project-pump-room-piping-installation", title: "Pump Room Piping Installation", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg", sortOrder: 4 },
  { id: "project-hvac-system-pprc-piping", title: "HVAC System PPR-C Piping", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg", sortOrder: 5 },
  { id: "project-factory-pipeline-installation", title: "Factory Pipeline Installation", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg", sortOrder: 6 },
];

const fallbackInfrastructureImages: PublicGalleryImage[] = [
  { id: "infrastructure-main-production-unit", title: "Main Production Unit", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg", sortOrder: 1 },
  { id: "infrastructure-piping-assembly-area", title: "Piping Assembly Area", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (1).jpeg", sortOrder: 2 },
  { id: "infrastructure-valve-fitting-testing", title: "Valve & Fitting Testing", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM (2).jpeg", sortOrder: 3 },
  { id: "infrastructure-pump-motor-room", title: "Pump & Motor Room", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.24 PM.jpeg", sortOrder: 4 },
  { id: "infrastructure-hvac-integration-unit", title: "HVAC Integration Unit", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.25 PM.jpeg", sortOrder: 5 },
  { id: "infrastructure-raw-material-warehouse", title: "Raw Material Warehouse", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.27 PM.jpeg", sortOrder: 6 },
  { id: "infrastructure-pipeline-storage-dispatch", title: "Pipeline Storage & Dispatch", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.28 PM.jpeg", sortOrder: 7 },
  { id: "infrastructure-cooling-tower-project-site", title: "Cooling Tower Project Site", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM (1).jpeg", sortOrder: 8 },
  { id: "infrastructure-completed-installation", title: "Completed Installation", image: "/images/projects/WhatsApp Image 2026-04-17 at 12.17.20 PM.jpeg", sortOrder: 9 },
];

const galleryOrder = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

async function queryPublicGallery<T>(query: (client: PrismaClientInstance) => Promise<T>, fallback: T) {
  if (shouldSkipPublicDbRead()) return fallback;

  try {
    const { prisma } = await import("@/lib/db");
    const result = await query(prisma);
    markPublicDbAvailable();
    return result;
  } catch (error) {
    markPublicDbUnavailable(error);
    return fallback;
  }
}

export async function getPublicProjectImages() {
  return queryPublicGallery(
    (client) => client.projectImage.findMany({ orderBy: galleryOrder }),
    fallbackProjectImages,
  );
}

export async function getPublicInfrastructureImages() {
  return queryPublicGallery(
    (client) => client.infrastructureImage.findMany({ orderBy: galleryOrder }),
    fallbackInfrastructureImages,
  );
}