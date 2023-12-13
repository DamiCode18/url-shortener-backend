// src/prisma/prisma.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma as PrismaService };
