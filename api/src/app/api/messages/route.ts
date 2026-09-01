import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import { SASSY_FORTUNES } from '../../../../prisma/seed-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const intensity = searchParams.get('intensity')?.toUpperCase() || 'ALL';

  if (isDatabaseConfigured()) {
    try {
      const where: any = {};
      if (intensity !== 'ALL') where.intensity = intensity;
      if (search) {
        where.text = { contains: search, mode: 'insensitive' };
      }

      const dbFortunes = await prisma.fortune.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        success: true,
        source: 'PostgreSQL Database',
        total: dbFortunes.length,
        messages: dbFortunes,
      });
    } catch (e: any) {
      console.warn('Database fetch failed, falling back:', e);
    }
  }

  // In-memory list
  let list = SASSY_FORTUNES.map((item, idx) => ({
    id: `seed-${idx + 1}`,
    ...item,
    timesDrawn: 0,
    isApproved: true,
    createdAt: new Date().toISOString(),
  }));

  if (intensity !== 'ALL') {
    list = list.filter((item) => item.intensity === intensity);
  }
  if (search) {
    list = list.filter((item) => item.text.toLowerCase().includes(search));
  }

  return NextResponse.json({
    success: true,
    source: 'In-Memory / Prisma Seed Catalog',
    total: list.length,
    messages: list,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, intensity = 'SPICY', category = 'GENERAL', sentiment = 'ROAST' } = body;

    if (!text || text.trim().length < 3) {
      return NextResponse.json({ success: false, error: 'Message text is required (min 3 chars)' }, { status: 400 });
    }

    if (isDatabaseConfigured()) {
      const created = await prisma.fortune.create({
        data: {
          text: text.trim(),
          intensity,
          category,
          sentiment,
          isApproved: true,
        },
      });
      return NextResponse.json({ success: true, message: created });
    }

    return NextResponse.json({
      success: true,
      message: {
        id: `custom-${Date.now()}`,
        text: text.trim(),
        intensity,
        category,
        sentiment,
        timesDrawn: 0,
        createdAt: new Date().toISOString(),
      },
      note: 'Database not connected; saved in session catalog.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
