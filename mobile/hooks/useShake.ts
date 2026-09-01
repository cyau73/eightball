import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';

interface UseShakeOptions {
  threshold?: number;
  cooldownMs?: number;
  enabled?: boolean;
}

export function useShake(onShake: () => void, options: UseShakeOptions = {}) {
  const { threshold = 2.4, cooldownMs = 1200, enabled = true } = options;
  const lastShakeTime = useRef<number>(0);
  const lastAcceleration = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!enabled) return;

    // WEB: Use Web DeviceMotionEvent if available
    if (Platform.OS === 'web') {
      const handleWebMotion = (event: DeviceMotionEvent) => {
        const acc = event.accelerationIncludingGravity || event.acceleration;
        if (!acc) return;

        const x = acc.x || 0;
        const y = acc.y || 0;
        const z = acc.z || 0;

        const last = lastAcceleration.current;
        const deltaX = Math.abs(x - last.x);
        const deltaY = Math.abs(y - last.y);
        const deltaZ = Math.abs(z - last.z);

        const totalDelta = deltaX + deltaY + deltaZ;
        const now = Date.now();

        if (totalDelta > threshold * 4 && now - lastShakeTime.current > cooldownMs) {
          lastShakeTime.current = now;
          onShake();
        }

        lastAcceleration.current = { x, y, z };
      };

      if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', handleWebMotion);
        return () => {
          window.removeEventListener('devicemotion', handleWebMotion);
        };
      }
      return;
    }

    // NATIVE (iOS & Android): Use expo-sensors Accelerometer
    let subscription: { remove: () => void } | null = null;
    try {
      Accelerometer.setUpdateInterval(80);
      subscription = Accelerometer.addListener((data) => {
        const { x, y, z } = data;
        const last = lastAcceleration.current;

        const deltaX = Math.abs(x - last.x);
        const deltaY = Math.abs(y - last.y);
        const deltaZ = Math.abs(z - last.z);

        const totalDelta = deltaX + deltaY + deltaZ;
        const now = Date.now();

        if (totalDelta > threshold && now - lastShakeTime.current > cooldownMs) {
          lastShakeTime.current = now;
          onShake();
        }

        lastAcceleration.current = { x, y, z };
      });
    } catch (e) {
      console.warn('Accelerometer listener unavailable:', e);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [onShake, threshold, cooldownMs, enabled]);
}
