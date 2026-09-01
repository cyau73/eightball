import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
} from 'react-native';
import { TriangleDie } from './TriangleDie';
import { SassIntensity } from '../types';

interface EightBallProps {
  fortuneText: string;
  fortuneIntensity?: SassIntensity; // Actual drawn fortune's intensity
  isRevealing: boolean;
  intensity: SassIntensity;        // User's selected filter setting
  isShaking: boolean;
  onSpinTrigger: () => void;
}

const BALL_SIZE = Math.min(Dimensions.get('window').width * 0.92, 440);
const PORTAL_SIZE = BALL_SIZE * 0.68;

export const EightBall: React.FC<EightBallProps> = ({
  fortuneText,
  fortuneIntensity,
  isRevealing,
  intensity,
  isShaking,
  onSpinTrigger,
}) => {
  // Animation Values
  const spinAngle = useRef(new Animated.Value(0)).current;
  const shakeOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const tiltX = useRef(new Animated.Value(0)).current;
  const tiltY = useRef(new Animated.Value(0)).current;

  // Touch spin tracking
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
          // 1. Calculate new target angle from the swipe direction
          const direction = gestureState.dx > 0 ? 1 : -1;
          const spinAmount = direction * (velocity * 180 + 120);
          const targetAngle = currentAngle.current + spinAmount;

          // 2. Perform initial active spin
          Animated.timing(spinAngle, {
            toValue: targetAngle,
            duration: 600,
            useNativeDriver: false,
          }).start(() => {
            // 3. Normalize angle to [-180, 180] so it takes the shortest route home
            let normalizedAngle = targetAngle % 360;
            if (normalizedAngle > 180) normalizedAngle -= 360;
            if (normalizedAngle < -180) normalizedAngle += 360;

            // Instantly set value to normalized range without visual jump
            spinAngle.setValue(normalizedAngle);

            // 4. Smoothly float back upright (0deg) over 5 seconds via the shortest path with easing
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

  // Trigger wobble animation when shaken
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
      {/* Dynamic 3D Spherical Floor Shadow */}
      <View style={styles.floorShadow} />

      {/* Main Outer 8-Ball Sphere */}
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
        {/* Center Portal: Mystical Liquid Window */}
        <View style={styles.liquidPortal}>
          {/* Deep Liquid Murk */}
          <View style={styles.liquidFluidInner}>
            <View style={styles.bubbleOrb1} pointerEvents="none" />
            <View style={styles.bubbleOrb2} pointerEvents="none" />

            {/* Inner Floating Die Container that reacts to spin & 3D tilt */}
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
                intensity={fortuneIntensity || intensity} // Prefers fortune's true level
              />
            </Animated.View>

            {/* Glass Reflection overlay on glass window */}
            <View style={styles.portalGlassGloss} pointerEvents="none" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  floorShadow: {
    position: 'absolute',
    bottom: 0,
    width: BALL_SIZE * 0.75,
    height: 35,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transform: [{ scaleY: 0.4 }],
  },
  ballSphere: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#0a0b12',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  liquidPortal: {
    width: PORTAL_SIZE,
    height: PORTAL_SIZE,
    borderRadius: PORTAL_SIZE / 2,
    backgroundColor: '#030712',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
  },
  liquidFluidInner: {
    width: '100%',
    height: '100%',
    borderRadius: PORTAL_SIZE / 2,
    backgroundColor: '#050c26',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  dieContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleOrb1: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  bubbleOrb2: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  portalGlassGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: PORTAL_SIZE / 2,
    borderTopRightRadius: PORTAL_SIZE / 2,
    zIndex: 5,
  },
});