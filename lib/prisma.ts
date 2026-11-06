import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const dbUrl = new URL(process.env.DATABASE_URL || '');

  const pool = mariadb.createPool({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    connectionLimit: 10,
    connectTimeout: 30000,
  });

  // Gunakan type casting (as any) agar TypeScript tidak mengeluhkan bentrok tipe pool
  const adapter = new PrismaMariaDb(pool as any);

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;