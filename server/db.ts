import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Persist PrismaClient in development
 * - Storing db in globalThis prevents additional
 *   PrismaClients from being initialized during hot reload
 * - https://youtu.be/1MTyCvS05V4?si=O_ZAhOgDxlYyZ0xy&t=6142
 */

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
