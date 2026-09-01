import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body allowed
    }

    // Generate seed if not provided
    const clientSeed = body.seedKey || `seed_usr_${crypto.randomBytes(8).toString('hex')}`;
    const devicePlatform = body.devicePlatform || 'unknown';

    let registeredInDb = false;

    if (isDatabaseConfigured()) {
      try {
        const user = await prisma.userSeed.upsert({
          where: { seedKey: clientSeed },
          update: {
            lastSeenAt: new Date(),
            devicePlatform,
          },
          create: {
            seedKey: clientSeed,
            devicePlatform,
            queryCount: 0,
          },
        });
        registeredInDb = true;
      } catch (dbErr) {
        console.warn('Could not register seed in DB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      seedKey: clientSeed,
      registeredInDb,
      message: 'User seed initialized successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/seed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process user seed',
      },
      { status: 500 }
    );
  }
}
