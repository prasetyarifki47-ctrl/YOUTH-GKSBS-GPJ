import { PrismaClient } from '@prisma/client/extension'; // atau import langsung dari client yang di-generate

// Solusi standar Prisma v7 Client Instance
const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new (require('@prisma/client').PrismaClient)();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;