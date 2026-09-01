/**
 * Generates a 32-bit hash integer from a string seed
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Mulberry32 pseudo-random number generator
 * Returns a deterministic float between [0, 1) given an initial integer seed.
 */
export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Picks an item from an array using a user seed and optional nonce/timestamp
 */
export function pickSeededItem<T>(items: T[], seedStr: string, nonce: number = 0): { item: T; index: number } {
  if (!items.length) {
    throw new Error('Cannot pick from empty array');
  }

  const baseHash = hashString(seedStr);
  const combinedSeed = (baseHash ^ (nonce * 2654435761)) >>> 0;
  const rng = mulberry32(combinedSeed);
  const randomIndex = Math.floor(rng() * items.length);

  return {
    item: items[randomIndex],
    index: randomIndex,
  };
}
