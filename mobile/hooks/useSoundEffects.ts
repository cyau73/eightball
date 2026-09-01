import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function useSoundEffects(soundEnabled: boolean = true, hapticsEnabled: boolean = true) {
  // Web Audio Context for synthesized sound cues on Web
  const playWebTone = (freq: number, type: OscillatorType, duration: number, gainVal: number = 0.1) => {
    if (!soundEnabled || Platform.OS !== 'web') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context autoplay restrictions
    }
  };

  const triggerShakeFeedback = () => {
    if (hapticsEnabled && Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } catch {}
    }
    // Deep swirling rattle sound
    playWebTone(140, 'triangle', 0.25, 0.15);
  };

  const triggerSpinFeedback = () => {
    if (hapticsEnabled && Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    }
    // High-pitched whoosh
    playWebTone(320, 'sine', 0.18, 0.08);
  };

  const triggerRevealFeedback = () => {
    if (hapticsEnabled && Platform.OS !== 'web') {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}
    }
    // Mystical chime
    setTimeout(() => playWebTone(440, 'sine', 0.3, 0.12), 0);
    setTimeout(() => playWebTone(660, 'sine', 0.4, 0.12), 80);
    setTimeout(() => playWebTone(880, 'sine', 0.5, 0.1), 160);
  };

  return {
    triggerShakeFeedback,
    triggerSpinFeedback,
    triggerRevealFeedback,
  };
}
