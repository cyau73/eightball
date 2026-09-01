import { NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import { SASSY_FORTUNES } from '../../../../prisma/seed-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbStatus = 'disconnected';
  let totalFortunes = SASSY_FORTUNES.length;

  if (isDatabaseConfigured()) {
    try {
      const count = await prisma.fortune.count();
      dbStatus = 'connected';
      totalFortunes = count;
    } catch {
      dbStatus = 'error';
    }
  }

  return NextResponse.json({
    status: 'ok',
    app: 'Sassy Magic 8-Ball API',
    database: {
      status: dbStatus,
      isConfigured: isDatabaseConfigured(),
      fortuneCount: totalFortunes,
    },
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
