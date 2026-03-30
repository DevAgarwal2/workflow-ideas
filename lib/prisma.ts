import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var __prisma: PrismaClient | undefined;
  var __pgPool: Pool | undefined;
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  // Store pool globally for cleanup
  globalThis.__pgPool = pool;

  return new PrismaClient({ adapter });
}

// Use singleton pattern to prevent multiple instances during hot reload
export const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// Cleanup function for graceful shutdown
export async function disconnect() {
  await prisma.$disconnect();
  if (globalThis.__pgPool) {
    await globalThis.__pgPool.end();
  }
}
