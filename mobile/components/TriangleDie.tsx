import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

interface TriangleDieProps {
  text: string;
  isRevealing: boolean;
  intensity: 'MILD' | 'SPICY' | 'SAVAGE';
}

const getGlowColor = (level: 'MILD' | 'SPICY' | 'SAVAGE') => {
  switch (level) {
    case 'SAVAGE':
      return '#f43f5e'; // Crimson Red
    case 'SPICY':
      return '#ec4899'; // Hot Pink
    case 'MILD':
    default:
      return '#38bdf8'; // Sky Blue
  }
};

export const TriangleDie: React.FC<TriangleDieProps> = ({ text, isRevealing, intensity }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const glowColor = getGlowColor(intensity);

  // Gentle floating animation
  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    return () => floatLoop.stop();
  }, [floatAnim]);

  // Reveal & Upright Floating Recovery
  useEffect(() => {
    if (isRevealing) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0.15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRevealing, opacityAnim, scaleAnim, rotateAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-4, 4],
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ translateY }, { scale: scaleAnim }, { rotate: rotation }],
        },
      ]}
    >
      <Svg height="260" width="260" viewBox="0 0 100 100" style={styles.svg}>
        <Defs>
          <LinearGradient id="dieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.95" />
            <Stop offset="50%" stopColor="#0f172a" stopOpacity="0.98" />
            <Stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </LinearGradient>
        </Defs>
        <Polygon
          points="50,90 6,10 94,10"
          fill="url(#dieGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </Svg>

      <View style={styles.textWrapper}>
        <Text
          style={[
            styles.fortuneText,
            {
              color: intensity === 'SAVAGE' ? '#ffe4e6' : '#e0f2fe',
              textShadowColor: glowColor,
            },
          ]}
        >
          {text.toUpperCase()}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingBottom: 40,
  },
  fortuneText: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
    lineHeight: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});