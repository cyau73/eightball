// app/api/fortune/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import { SASSY_FORTUNES } from '../../../../prisma/seed-data';
import { pickSeededItem } from '@/lib/seed-rng';

export const dynamic = 'force-dynamic';

// Mapping for intensity tier inheritance
const INTENSITY_TIERS: Record<string, string[]> = {
  MILD: ['MILD'],
  SPICY: ['MILD', 'SPICY'],
  SAVAGE: ['MILD', 'SPICY', 'SAVAGE'],
};

// Target tier selection weights adjusted to your exact requirement:
// - MILD: Only MILD
// - SPICY: Even 50/50 split between MILD and SPICY
// - SAVAGE: Even chances for MILD/SPICY, but heavily weighted towards SAVAGE (e.g., 10% MILD, 10% SPICY, 80% SAVAGE)
const TIER_WEIGHTS: Record<string, Record<string, number>> = {
  MILD: { MILD: 1.0 },
  SPICY: { MILD: 0.5, SPICY: 0.5 },
  SAVAGE: { MILD: 0.4, SPICY: 0.4, SAVAGE: 0.2 },
};

function getDeterministicRoll(seed: string, nonce: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const combined = Math.abs(hash ^ (nonce * 2654435761));
  return (combined % 10000) / 10000;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seed = searchParams.get('seed') || request.headers.get('x-user-seed') || 'default-seed';
    const intensity = (searchParams.get('intensity') || 'ALL').toUpperCase();
    const category = (searchParams.get('category') || 'ALL').toUpperCase();

    const parsedNonce = parseInt(searchParams.get('nonce') || '', 10);
    const nonce = Number.isNaN(parsedNonce) ? Date.now() : parsedNonce;
    const useRandom = searchParams.get('random') === 'true';

    const allowedIntensities = INTENSITY_TIERS[intensity] || ['MILD'];
    const rawWeights = TIER_WEIGHTS[intensity] || { MILD: 0.33, SPICY: 0.33, SAVAGE: 0.34 };

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
        const whereClause: Record<string, any> = { isApproved: true };
        if (intensity !== 'ALL') {
          whereClause.intensity = { in: allowedIntensities };
        }

        if (category !== 'ALL') {
          whereClause.category = { equals: category, mode: 'insensitive' };
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

        if (dbFortunes.length > 0) {
          fortunes = dbFortunes;
          isFromDatabase = true;
        }
      } catch (dbErr) {
        console.warn('Database query failed:', dbErr);
      }
    }

    // In-memory fallback
    if (fortunes.length === 0) {
      let filtered = SASSY_FORTUNES.map((f) => ({
        ...f,
        intensity: f.intensity.toUpperCase(),
        category: f.category.toUpperCase(),
      }));

      if (intensity !== 'ALL') {
        filtered = filtered.filter((f) => allowedIntensities.includes(f.intensity));
      }
      if (category !== 'ALL') {
        filtered = filtered.filter((f) => f.category === category);
      }

      if (filtered.length === 0) {
        filtered = SASSY_FORTUNES.map((f) => ({
          ...f,
          intensity: f.intensity.toUpperCase(),
          category: f.category.toUpperCase(),
        }));
      }

      fortunes = filtered.map((f, index) => ({
        id: `mock-${index}`,
        ...f,
      }));
    }

    // Group retrieved fortunes by tier for debugging and balanced selection
    const fortunesByTier: Record<string, typeof fortunes> = {};
    for (const f of fortunes) {
      const tierKey = f.intensity.toUpperCase();
      if (!fortunesByTier[tierKey]) fortunesByTier[tierKey] = [];
      fortunesByTier[tierKey].push(f);
    }

    const tierCounts = Object.fromEntries(
      Object.entries(fortunesByTier).map(([tier, items]) => [tier, items.length])
    );

    let targetPool = fortunes;
    let selectedTier = 'ALL';
    let rollValue = 0;

    // Apply weighted tier selection only when a specific intensity filter is chosen
    if (intensity !== 'ALL') {
      const tierOrder = ['MILD', 'SPICY', 'SAVAGE'];
      const availableTiers = tierOrder.filter(
        (tier) => fortunesByTier[tier]?.length > 0
      );

      if (availableTiers.length > 0) {
        // Dynamically scale weights if any tier is missing from the database pool
        const totalRawWeight = availableTiers.reduce((acc, tier) => acc + (rawWeights[tier] || 0), 0);

        const rawRoll = useRandom ? Math.random() : getDeterministicRoll(seed, nonce);
        rollValue = rawRoll * totalRawWeight; // Scale directly against the available weight spectrum

        let cumulative = 0;
        selectedTier = availableTiers[0];

        for (const tier of availableTiers) {
          const normalizedWeight = (rawWeights[tier] || 0);
          cumulative += normalizedWeight;
          if (rollValue <= cumulative) {
            selectedTier = tier;
            break;
          }
        }

        targetPool = fortunesByTier[selectedTier] || fortunes;
      }
    } else {
      rollValue = useRandom ? Math.random() : getDeterministicRoll(seed, nonce);
    }

    // Pick item from target pool
    let selectedFortune;
    if (useRandom) {
      selectedFortune = targetPool[Math.floor(Math.random() * targetPool.length)];
    } else {
      const result = pickSeededItem(targetPool, seed, nonce);
      selectedFortune = result.item;
    }

    // Defensive fallback guard
    if (!selectedFortune) {
      selectedFortune = fortunes[0] || {
        id: 'mock-0',
        text: 'Signs point to yes.',
        intensity: 'MILD',
        category: 'GENERAL',
        sentiment: 'POSITIVE',
      };
    }

    // Enhanced Debug Logging
    console.log('\n---------------- 🔮 FORTUNE DEBUG ----------------');
    console.log(`[REQ] Seed: "${seed}" | Intensity Filter: "${intensity}" | Nonce: "${nonce}" | Random: ${useRandom}`);
    console.log(`[DB/Source] Retrieved total ${fortunes.length} message(s). Breakdown by tier:`, JSON.stringify(tierCounts));
    console.log(`[SELECTION] Roll value generated: ${rollValue.toFixed(4)}`);
    console.log(`[SELECTION] Chosen Tier pool: "${selectedTier}" (Pool size: ${targetPool.length})`);
    console.log(`[RESULT] Selected Fortune: "${selectedFortune.text}" (Intensity: ${selectedFortune.intensity})`);
    console.log('--------------------------------------------------\n');

    // Async metrics logging
    if (isFromDatabase && selectedFortune.id && !selectedFortune.id.startsWith('mock-')) {
      try {
        await Promise.allSettled([
          prisma.fortune.update({
            where: { id: selectedFortune.id },
            data: { timesDrawn: { increment: 1 } },
          }),
          seed && seed !== 'default-seed'
            ? prisma.userSeed.upsert({
              where: { seedKey: seed },
              update: {
                queryCount: { increment: 1 },
                lastSeenAt: new Date(),
              },
              create: {
                seedKey: seed,
                queryCount: 1,
              },
            })
            : Promise.resolve(),
        ]);
      } catch (logErr) {
        console.warn('Metrics logging error (non-fatal):', logErr);
      }
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
        tierBreakdown: tierCounts,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
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