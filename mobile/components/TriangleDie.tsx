import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

interface TriangleDieProps {
  text: string;
  isRevealing: boolean;
  intensity: 'MILD' | 'SPICY' | 'SAVAGE';
}

export const TriangleDie: React.FC<TriangleDieProps> = ({ text, isRevealing, intensity }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Idle gentle floating animation
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

  useEffect(() => {
    if (isRevealing) {
      // Sinking & swirling under liquid
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
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Floating up through blue fluid with clarity
      rotateAnim.setValue(0);
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

  const getGlowColor = () => {
    switch (intensity) {
      case 'SAVAGE':
        return '#f43f5e';
      case 'SPICY':
        return '#ec4899';
      case 'MILD':
      default:
        return '#38bdf8';
    }
  };

  const glowColor = getGlowColor();

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
      <Svg height="170" width="170" viewBox="0 0 100 100" style={styles.svg}>
        <Defs>
          <LinearGradient id="dieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.95" />
            <Stop offset="50%" stopColor="#0f172a" stopOpacity="0.98" />
            <Stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </LinearGradient>
        </Defs>
        {/* Inverted Triangle Die Face */}
        <Polygon
          points="50,92 8,16 92,16"
          fill="url(#dieGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </Svg>

      {/* Sassy Fortune Text inside the Triangle */}
      <View style={styles.textWrapper}>
        <Text
          style={[
            styles.fortuneText,
            {
              color: intensity === 'SAVAGE' ? '#ffe4e6' : '#e0f2fe',
              textShadowColor: glowColor,
            },
          ]}
          numberOfLines={5}
          adjustsFontSizeToFit
        >
          {text.toUpperCase()}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  textWrapper: {
    width: 110,
    height: 80,
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  fortuneText: {
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    lineHeight: 14,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
