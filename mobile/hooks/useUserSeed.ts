import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { syncSeedWithServer } from '../services/api';

const USER_SEED_KEY = '@sassy_8ball_user_seed';
const SEED_TIMESTAMP_KEY = '@sassy_8ball_seed_created_at';
const TOTAL_DRAWS_KEY = '@sassy_8ball_total_draws';

export function useUserSeed() {
  const [seed, setSeed] = useState<string>('');
  const [totalDraws, setTotalDraws] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadOrCreateSeed() {
      try {
        let existingSeed = await AsyncStorage.getItem(USER_SEED_KEY);
        let created = await AsyncStorage.getItem(SEED_TIMESTAMP_KEY);
        const drawsStr = await AsyncStorage.getItem(TOTAL_DRAWS_KEY);

        if (!existingSeed) {
          // Generate new unique seed for this install
          const randomBytes = await Crypto.getRandomBytesAsync(8);
          const hex = Array.from(randomBytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
          existingSeed = `seed_usr_${hex}`;
          created = new Date().toISOString();

          await AsyncStorage.setItem(USER_SEED_KEY, existingSeed);
          await AsyncStorage.setItem(SEED_TIMESTAMP_KEY, created);
          await AsyncStorage.setItem(TOTAL_DRAWS_KEY, '0');

          // Async sync to server
          syncSeedWithServer(existingSeed, Platform.OS);
        }

        setSeed(existingSeed);
        setCreatedAt(created || new Date().toISOString());
        setTotalDraws(drawsStr ? parseInt(drawsStr, 10) : 0);
      } catch (err) {
        console.error('Error initializing user seed:', err);
        setSeed(`seed_fallback_${Date.now()}`);
      } finally {
        setIsReady(true);
      }
    }

    loadOrCreateSeed();
  }, []);

  const incrementDraws = async () => {
    const next = totalDraws + 1;
    setTotalDraws(next);
    try {
      await AsyncStorage.setItem(TOTAL_DRAWS_KEY, next.toString());
    } catch {}
  };

  const regenerateSeed = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(8);
    const hex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const newSeed = `seed_usr_${hex}`;
    const now = new Date().toISOString();

    await AsyncStorage.setItem(USER_SEED_KEY, newSeed);
    await AsyncStorage.setItem(SEED_TIMESTAMP_KEY, now);
    setSeed(newSeed);
    setCreatedAt(now);

    syncSeedWithServer(newSeed, Platform.OS);
  };

  return {
    seed,
    createdAt,
    totalDraws,
    isReady,
    incrementDraws,
    regenerateSeed,
  };
}
