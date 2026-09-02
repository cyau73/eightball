// app/index.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import { EightBall } from '../components/EightBall';
import { Controls } from '../components/Controls';
import { HistoryDrawer } from '../components/HistoryDrawer';
import { SettingsModal } from '../components/SettingsModal';
import { useUserSeed } from '../hooks/useUserSeed';
import { useShake } from '../hooks/useShake';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { fetchSassyFortune } from '../services/api';
import { SassIntensity, FortuneHistoryItem } from '../types';
import { AdBanner } from '../components/AdBanner';
import { useGoogleMobileAdsInit } from '../components/AdManager';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainEightBallScreen() {
  const { seed, totalDraws, incrementDraws, regenerateSeed } = useUserSeed();
  const [intensity, setIntensity] = useState<SassIntensity>('SAVAGE');
  const [displayedIntensity, setDisplayedIntensity] = useState<SassIntensity>('SAVAGE');

  const intensityRef = useRef<SassIntensity>(intensity);
  intensityRef.current = intensity;

  const [currentFortune, setCurrentFortune] = useState<string>('SHAKE OR SWIPE ME FOR SASS');
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [history, setHistory] = useState<FortuneHistoryItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  const { triggerShakeFeedback, triggerSpinFeedback, triggerRevealFeedback } = useSoundEffects(soundEnabled);

  // Initialize ads safely without crashing web bundler
  useGoogleMobileAdsInit();

  const drawNonceRef = useRef<number>(0);
  const isDrawingRef = useRef<boolean>(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const seedRef = useRef(seed);
  seedRef.current = seed;

  const handleDrawFortune = useCallback(
    async (triggerType: 'shake' | 'spin' | 'button') => {
      if (isDrawingRef.current) return;
      isDrawingRef.current = true;
      setIsRevealing(true);

      if (triggerType === 'shake') {
        setIsShaking(true);
        triggerShakeFeedback();
      } else {
        triggerSpinFeedback();
      }

      drawNonceRef.current += 1;
      const nonce = drawNonceRef.current;

      try {
        const currentIntensity = intensityRef.current;
        const currentSeed = seedRef.current;
        const result = await fetchSassyFortune(currentSeed, currentIntensity, nonce);

        setTimeout(() => {
          if (isMountedRef.current) setIsShaking(false);
        }, 600);

        setTimeout(() => {
          if (!isMountedRef.current) return;
          setCurrentFortune(result.fortune);
          if (result.intensity) {
            setDisplayedIntensity(result.intensity as SassIntensity);
          }
          setIsRevealing(false);
          triggerRevealFeedback();
          incrementDraws();

          setHistory((prev) => [
            {
              id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              fortune: result.fortune,
              intensity: result.intensity,
              category: result.category,
              sentiment: result.sentiment,
              isFromDatabase: result.isFromDatabase,
              timestamp: result.timestamp,
            },
            ...prev.slice(0, 49),
          ]);

          isDrawingRef.current = false;
        }, 900);
      } catch (err) {
        if (isMountedRef.current) {
          setIsShaking(false);
          setIsRevealing(false);
        }
        isDrawingRef.current = false;
      }
    },
    [triggerShakeFeedback, triggerSpinFeedback, triggerRevealFeedback, incrementDraws]
  );

  useShake(() => handleDrawFortune('shake'), {
    threshold: 2.2,
    cooldownMs: 1500,
    enabled: true,
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.ambientGlowTop} />
      <View style={styles.ambientGlowBottom} />

      <View style={styles.header}>
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>🔮 POWERED BY SASS</Text>
        </View>
        <Text style={styles.title}>MAGIC EIGHT-BALL 🎱</Text>
        {/* <Text style={styles.subtitle}>
          {Platform.OS === 'web'
            ? 'Swipe the ball or click below for your sassy fortune'
            : 'Shake your phone or swipe'}
        </Text> */}
      </View>

      <View style={styles.stage}>
        <EightBall
          fortuneText={currentFortune}
          isRevealing={isRevealing}
          intensity={displayedIntensity}
          isShaking={isShaking}
          onSpinTrigger={() => handleDrawFortune('spin')}
        />
      </View>

      <View style={styles.controlsArea}>
        <Controls
          intensity={intensity}
          onSelectIntensity={setIntensity}
          onSimulateShake={() => handleDrawFortune('button')}
          onOpenHistory={() => setHistoryVisible(true)}
          onOpenSettings={() => setSettingsVisible(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          isLoading={isRevealing}
        />
      </View>

      <AdBanner />

      <HistoryDrawer
        visible={historyVisible}
        history={history}
        onClose={() => setHistoryVisible(false)}
        onClearHistory={() => setHistory([])}
      />

      <SettingsModal
        visible={settingsVisible}
        seed={seed}
        totalDraws={totalDraws}
        onClose={() => setSettingsVisible(false)}
        onRegenerateSeed={regenerateSeed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0b10',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 10 : 24,
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlowTop: {
    position: 'absolute',
    top: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(113, 72, 236, 0.12)',
  },
  ambientGlowBottom: {
    position: 'absolute',
    bottom: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(139, 92, 246, 0.14)',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  badgePill: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 2,
  },
  badgePillText: {
    color: '#f472b6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#f8fafc',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 18,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 12 : 20,
  },
});