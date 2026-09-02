// EightBall.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Easing,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { TriangleDie } from './TriangleDie';
import { SassIntensity } from '../types';
import styles, { BALL_SIZE } from './styles';

interface EightBallProps {
  fortuneText: string;
  fortuneIntensity?: SassIntensity;
  isRevealing: boolean;
  intensity: SassIntensity;
  isShaking: boolean;
  onSpinTrigger: () => void;
}

export const EightBall: React.FC<EightBallProps> = ({
  fortuneText,
  fortuneIntensity,
  isRevealing,
  intensity,
  isShaking,
  onSpinTrigger,
}) => {
  const spinAngle = useRef(new Animated.Value(0)).current;
  const shakeOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const tiltX = useRef(new Animated.Value(0)).current;
  const tiltY = useRef(new Animated.Value(0)).current;

  const currentAngle = useRef<number>(0);

  useEffect(() => {
    const listenerId = spinAngle.addListener(({ value }) => {
      currentAngle.current = value;
    });
    return () => spinAngle.removeListener(listenerId);
  }, [spinAngle]);

  const resetPhysics = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: false }),
      Animated.spring(tiltX, { toValue: 0, friction: 6, useNativeDriver: false }),
      Animated.spring(tiltY, { toValue: 0, friction: 6, useNativeDriver: false }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        Animated.spring(scaleAnim, {
          toValue: 0.96,
          friction: 8,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        tiltX.setValue(gestureState.dy * 0.05);
        tiltY.setValue(gestureState.dx * 0.05);
      },
      onPanResponderTerminate: () => {
        resetPhysics();
      },
      onPanResponderRelease: (_, gestureState) => {
        const dragDistance = Math.hypot(gestureState.dx, gestureState.dy);
        const velocity = Math.hypot(gestureState.vx, gestureState.vy);

        resetPhysics();

        if (dragDistance > 30 || velocity > 0.4) {
          const direction = gestureState.dx > 0 ? 1 : -1;
          const spinAmount = direction * (velocity * 180 + 120);
          const targetAngle = currentAngle.current + spinAmount;

          Animated.timing(spinAngle, {
            toValue: targetAngle,
            duration: 600,
            useNativeDriver: false,
          }).start(() => {
            let normalizedAngle = targetAngle % 360;
            if (normalizedAngle > 180) normalizedAngle -= 360;
            if (normalizedAngle < -180) normalizedAngle += 360;

            spinAngle.setValue(normalizedAngle);

            Animated.timing(spinAngle, {
              toValue: 0,
              duration: 5000,
              easing: Easing.out(Easing.quad),
              useNativeDriver: false,
            }).start();
          });

          onSpinTrigger();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isShaking) {
      const shakeSequence = Animated.sequence([
        Animated.timing(shakeOffset, { toValue: { x: -14, y: -8 }, duration: 50, useNativeDriver: false }),
        Animated.timing(shakeOffset, { toValue: { x: 14, y: 8 }, duration: 50, useNativeDriver: false }),
        Animated.timing(shakeOffset, { toValue: { x: -10, y: 6 }, duration: 50, useNativeDriver: false }),
        Animated.timing(shakeOffset, { toValue: { x: 10, y: -6 }, duration: 50, useNativeDriver: false }),
        Animated.timing(shakeOffset, { toValue: { x: -6, y: 3 }, duration: 50, useNativeDriver: false }),
        Animated.timing(shakeOffset, { toValue: { x: 0, y: 0 }, duration: 50, useNativeDriver: false }),
      ]);

      Animated.loop(shakeSequence, { iterations: 3 }).start();
    }
  }, [isShaking, shakeOffset]);

  const spinRotation = spinAngle.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  const rotateX = tiltX.interpolate({
    inputRange: [-15, 15],
    outputRange: ['-15deg', '15deg'],
  });

  const rotateY = tiltY.interpolate({
    inputRange: [-15, 15],
    outputRange: ['-15deg', '15deg'],
  });

  return (
    <View style={styles.outerContainer}>
      <View style={styles.floorShadow} />

      {/* --- NATIVE GLOW HALO (Pure View with shadow/elevation) --- */}
      <View style={nativeStyles.haloLayer} pointerEvents="none" />

      {/* --- Main Outer 8-Ball Sphere --- */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.ballSphere,
          {
            transform: [
              { translateX: shakeOffset.x },
              { translateY: shakeOffset.y },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#2c3540', '#11161d', '#000000']}
          locations={[0.1, 0.5, 1]}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.9, y: 0.9 }}
          style={StyleSheet.absoluteFillObject}
        />

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.0)']}
          style={styles.glossOverlay}
          pointerEvents="none"
        />

        <View style={styles.liquidPortal}>
          <View style={styles.liquidFluidInner}>
            <View style={styles.bubbleOrb1} pointerEvents="none" />
            <View style={styles.bubbleOrb2} pointerEvents="none" />

            <Animated.View
              style={[
                styles.dieContainer,
                {
                  transform: [
                    { rotate: spinRotation },
                    { rotateX: rotateX },
                    { rotateY: rotateY },
                  ],
                },
              ]}
            >
              <TriangleDie
                text={fortuneText}
                isRevealing={isRevealing}
                intensity={fortuneIntensity || intensity}
              />
            </Animated.View>

            <View style={styles.portalGlassGloss} pointerEvents="none" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const HALO_SIZE = BALL_SIZE * 1.015;

const nativeStyles = StyleSheet.create({
  haloLayer: {
    position: 'absolute',
    width: HALO_SIZE,
    height: HALO_SIZE,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -HALO_SIZE / 2 },
      { translateY: -HALO_SIZE / 2 },
    ],
    borderRadius: HALO_SIZE / 2,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 20,
    zIndex: 1,
  },
});