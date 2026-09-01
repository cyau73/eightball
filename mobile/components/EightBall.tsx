import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { TriangleDie } from './TriangleDie';
import { SassIntensity } from '../types';

interface EightBallProps {
  fortuneText: string;
  isRevealing: boolean;
  intensity: SassIntensity;
  isShaking: boolean;
  onSpinTrigger: () => void;
}

const BALL_SIZE = Math.min(Dimensions.get('window').width * 0.85, 340);
const PORTAL_SIZE = BALL_SIZE * 0.58;

export const EightBall: React.FC<EightBallProps> = ({
  fortuneText,
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
  spinAngle.addListener(({ value }) => {
    currentAngle.current = value;
  });

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
      onPanResponderRelease: (_, gestureState) => {
        const dragDistance = Math.hypot(gestureState.dx, gestureState.dy);
        const velocity = Math.hypot(gestureState.vx, gestureState.vy);

        // Reset scale & tilt
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: false,
          }),
          Animated.spring(tiltX, { toValue: 0, friction: 6, useNativeDriver: false }),
          Animated.spring(tiltY, { toValue: 0, friction: 6, useNativeDriver: false }),
        ]).start();

        // If spun or dragged with enough energy
        if (dragDistance > 30 || velocity > 0.4) {
          const spinDelta = (gestureState.dx > 0 ? 1 : -1) * (velocity * 360 + 180);
          
          Animated.timing(spinAngle, {
            toValue: currentAngle.current + spinDelta,
            duration: 1000,
            useNativeDriver: false,
          }).start();

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
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.outerContainer}>
      {/* Dynamic 3D Spherical Floor Shadow */}
      <View style={styles.floorShadow} />

      {/* Main 8-Ball Sphere */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.ballSphere,
          {
            transform: [
              { translateX: shakeOffset.x },
              { translateY: shakeOffset.y },
              { scale: scaleAnim },
              { rotate: spinRotation },
            ],
          },
        ]}
      >
        {/* Curved Specular Gloss Highlight */}
        <View style={styles.specularHighlight} />
        <View style={styles.specularSecondary} />

        {/* Center Portal: Mystical Liquid Window */}
        <View style={styles.liquidPortal}>
          {/* Deep Liquid Murk & Fluid Bubble Rings */}
          <View style={styles.liquidFluidInner}>
            <View style={styles.bubbleOrb1} />
            <View style={styles.bubbleOrb2} />
            
            {/* The Floating Sassy Triangle Die */}
            <TriangleDie
              text={fortuneText}
              isRevealing={isRevealing}
              intensity={intensity}
            />

            {/* Gloss Reflection overlay on glass window */}
            <View style={styles.portalGlassGloss} />
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
  specularHighlight: {
    position: 'absolute',
    top: 16,
    left: 36,
    width: BALL_SIZE * 0.45,
    height: BALL_SIZE * 0.22,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    transform: [{ rotate: '-35deg' }],
  },
  specularSecondary: {
    position: 'absolute',
    top: 26,
    left: 48,
    width: BALL_SIZE * 0.22,
    height: BALL_SIZE * 0.1,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    transform: [{ rotate: '-35deg' }],
  },
  liquidPortal: {
    width: PORTAL_SIZE,
    height: PORTAL_SIZE,
    borderRadius: PORTAL_SIZE / 2,
    backgroundColor: '#030712',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
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
  bubbleOrb1: {
    position: 'absolute',
    top: 15,
    right: 25,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  bubbleOrb2: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    width: 14,
    height: 14,
    borderRadius: 7,
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
  },
});
