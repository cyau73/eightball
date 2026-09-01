import AsyncStorage from '@react-native-async-storage/async-storage';
import { FortuneResult, SassIntensity } from '../types';

const API_BASE_URL_KEY = '@sassy_8ball_api_url';
export const DEFAULT_API_URL = 'http://mac-mini.tail0f16ec.ts.net:3002';

// Offline fallback fortunes
const OFFLINE_FORTUNES: Record<SassIntensity, string[]> = {
  SAVAGE: [
    "Even Google doesn't have an answer for that level of delusion.",
    "My crystal ball says you should delete their number and touch grass.",
    "Outlook not so good. Actually, looks like a dumpster fire.",
    "Have you considered that maybe YOU are the problem?",
    "I'm a plastic ball full of blue liquid and even I know that's a terrible idea.",
    "They left you on read for a reason. Take the hint.",
    "Signs point to yes, but your bank account screams absolutely not.",
    "Ask again later. Or better yet, ask a therapist.",
    "Not in a million years, bestie.",
    "404: Common Sense Not Found.",
  ],
  SPICY: [
    "Yes, but you're definitely going to complain about it later.",
    "Without a doubt. But prepare for chaotic consequences.",
    "Cannot predict now... suffering from second-hand embarrassment.",
    "Most likely, if you manage not to sabotage yourself first.",
    "Outlook good. But knowing you, you'll still overthink it.",
    "Better not tell you now. You couldn't handle the truth.",
    "Yes! (Assuming Mercury isn't doing whatever nonsense it does).",
    "Yes, queen/king. Go make questionable choices.",
    "My internal sensors detect a 99% chance of regret.",
    "It is decidedly so. Don't ruin it.",
  ],
  MILD: [
    "Signs point to yes! Look at you winning.",
    "As I see it, yes. You're unstoppable today.",
    "It is decidedly so! Shine bright.",
    "Without a doubt! Go get 'em.",
    "Yes, definitely. Treat yourself to a snack.",
    "Reply hazy, try asking after a little power nap.",
    "Don't count on it today, but tomorrow is a new adventure.",
    "My reply is no, but I still believe in you.",
    "100% yes! Take this as your official sign.",
    "The odds are in your favor today!",
  ],
};

export async function getApiBaseUrl(): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem(API_BASE_URL_KEY);
    return saved || DEFAULT_API_URL;
  } catch {
    return DEFAULT_API_URL;
  }
}

export async function setApiBaseUrl(url: string): Promise<void> {
  try {
    await AsyncStorage.setItem(API_BASE_URL_KEY, url.trim().replace(/\/$/, ''));
  } catch (e) {
    console.error('Failed to save API URL:', e);
  }
}

export async function fetchSassyFortune(
  seed: string,
  intensity: SassIntensity,
  nonce: number = Date.now()
): Promise<FortuneResult> {
  const baseUrl = await getApiBaseUrl();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout for snappy UI

    const url = `${baseUrl}/api/fortune?seed=${encodeURIComponent(seed)}&intensity=${intensity}&nonce=${nonce}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Seed': seed,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.fortune) {
        return {
          fortune: data.fortune,
          intensity: (data.metadata?.intensity as SassIntensity) || intensity,
          category: data.metadata?.category || 'GENERAL',
          sentiment: data.metadata?.sentiment || 'ROAST',
          isFromDatabase: Boolean(data.metadata?.isFromDatabase),
          timestamp: new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.warn('API fetch failed or timed out, using offline fallback:', error);
  }

  // Graceful offline fallback
  const pool = OFFLINE_FORTUNES[intensity] || OFFLINE_FORTUNES.SPICY;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return {
    fortune: pool[randomIndex],
    intensity,
    category: 'GENERAL',
    sentiment: 'ROAST',
    isFromDatabase: false,
    timestamp: new Date().toISOString(),
  };
}

export async function syncSeedWithServer(seedKey: string, platform: string): Promise<boolean> {
  const baseUrl = await getApiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seedKey, devicePlatform: platform }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
