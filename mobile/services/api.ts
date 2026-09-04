// mobile/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FortuneResult, SassIntensity } from '../types';

// Environment variable prioritized first for web deployments (Vercel)
const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_SECRET = process.env.EXPO_PUBLIC_MOBILE_API_SECRET || '';

const API_BASE_URL_KEY = '@sassy_8ball_api_url';

// Default Tailscale HTTPS local API target
export const DEFAULT_API_URL = 'https://mac-mini.tail0f16ec.ts.net:4000';

export interface FortuneParams {
  seed?: string;
  intensity?: string;
  category?: string;
  nonce?: number;
  random?: boolean;
}

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
  // Always use the EXPO_PUBLIC_API_URL build variable when deployed on Vercel
  if (ENV_API_URL) {
    return ENV_API_URL.replace(/\/$/, '');
  }

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
  console.log('Loaded Secret Key:', process.env.EXPO_PUBLIC_MOBILE_SECRET ? 'YES' : 'NO/EMPTY');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const url = `${baseUrl}/api/fortune?seed=${encodeURIComponent(seed)}&intensity=${intensity}&nonce=${nonce}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-client-secret': API_SECRET || '',
        'Content-Type': 'application/json',
        'x-user-seed': seed,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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

    throw new Error('Invalid response structure from API');
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function getOfflineFortune(intensity: SassIntensity): FortuneResult {
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