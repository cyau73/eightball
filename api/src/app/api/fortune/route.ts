import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import { SASSY_FORTUNES, SassyFortuneItem } from '../../../../prisma/seed-data';
import { pickSeededItem } from '@/lib/seed-rng';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seed = searchParams.get('seed') || request.headers.get('x-user-seed') || 'default-seed';
    const intensity = (searchParams.get('intensity') || 'ALL').toUpperCase();
    const category = (searchParams.get('category') || 'ALL').toUpperCase();
    const nonce = parseInt(searchParams.get('nonce') || `${Date.now()}`, 10);
    const useRandom = searchParams.get('random') === 'true';

    let fortunes: Array<{
      id?: string;
      text: string;
      intensity: string;
      category: string;
      sentiment: string;
    }> = [];

    let isFromDatabase = false;

    if (isDatabaseConfigured()) {
      try {
        const whereClause: any = { isApproved: true };
        if (intensity !== 'ALL') {
          whereClause.intensity = intensity;
        }
        if (category !== 'ALL') {
          whereClause.category = category;
        }

        const dbFortunes = await prisma.fortune.findMany({
          where: whereClause,
          select: {
            id: true,
            text: true,
            intensity: true,
            category: true,
            sentiment: true,
          },
        });

        if (dbFortunes && dbFortunes.length > 0) {
          fortunes = dbFortunes;
          isFromDatabase = true;
        }
      } catch (dbErr) {
        console.warn('Database query failed, falling back to in-memory fortunes:', dbErr);
      }
    }

    // In-memory fallback if DB not configured or returned empty
    if (fortunes.length === 0) {
      let filtered = [...SASSY_FORTUNES];
      if (intensity !== 'ALL') {
        filtered = filtered.filter((f) => f.intensity === intensity);
      }
      if (category !== 'ALL') {
        filtered = filtered.filter((f) => f.category === category);
      }
      if (filtered.length === 0) {
        filtered = [...SASSY_FORTUNES];
      }

      fortunes = filtered.map((f, index) => ({
        id: `mock-${index}`,
        ...f,
      }));
    }

    // Pick fortune
    let selectedFortune;
    let fortuneIndex = 0;

    if (useRandom) {
      fortuneIndex = Math.floor(Math.random() * fortunes.length);
      selectedFortune = fortunes[fortuneIndex];
    } else {
      const result = pickSeededItem(fortunes, seed, nonce);
      selectedFortune = result.item;
      fortuneIndex = result.index;
    }

    // Asynchronously log the draw if DB is configured
    if (isFromDatabase && selectedFortune.id && !selectedFortune.id.startsWith('mock-')) {
      (async () => {
        try {
          // Increment draw count
          await prisma.fortune.update({
            where: { id: selectedFortune.id },
            data: { timesDrawn: { increment: 1 } },
          });

          // Update user query count if seed registered
          if (seed && seed !== 'default-seed') {
            await prisma.userSeed.upsert({
              where: { seedKey: seed },
              update: {
                queryCount: { increment: 1 },
                lastSeenAt: new Date(),
              },
              create: {
                seedKey: seed,
                queryCount: 1,
              },
            });
          }
        } catch (logErr) {
          console.warn('Logging error (non-fatal):', logErr);
        }
      })();
    }

    return NextResponse.json({
      success: true,
      fortune: selectedFortune.text,
      metadata: {
        id: selectedFortune.id,
        intensity: selectedFortune.intensity,
        category: selectedFortune.category,
        sentiment: selectedFortune.sentiment,
        seedUsed: seed,
        nonceUsed: nonce,
        isFromDatabase,
        poolSize: fortunes.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('API Error in /api/fortune:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve sassy fortune',
        fallback: "Signs point to yes, but my server's on a coffee break.",
      },
      { status: 500 }
    );
  }
}
