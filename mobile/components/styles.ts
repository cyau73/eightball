// styles.ts
import { StyleSheet, Dimensions } from 'react-native';

export const BALL_SIZE = Math.min(Dimensions.get('window').width * 0.92, 440);
const PORTAL_SIZE = BALL_SIZE * 0.68;

export default StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: BALL_SIZE * 1.6,
        height: BALL_SIZE * 1.6,
        alignSelf: 'center',
    },

    // --- THE NEW Dedicated Glow Layer ---
    haloLayer: {
        position: 'absolute',
        width: BALL_SIZE * 1.6,
        height: BALL_SIZE * 1.6,
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -(BALL_SIZE * 1.6) / 2 },
            { translateY: -(BALL_SIZE * 1.6) / 2 }
        ],
        zIndex: 1,
    },

    ballSphere: {
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        overflow: 'hidden',
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: 'transparent',
        zIndex: 10,
    },

    // ... (Keep existing glossOverlay, liquidPortal, innerFluid styles the same)
    baseGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    glossOverlay: {
        position: 'absolute',
        top: BALL_SIZE * 0.05,
        left: BALL_SIZE * 0.1,
        width: BALL_SIZE * 0.5,
        height: BALL_SIZE * 0.25,
        borderRadius: BALL_SIZE * 0.25,
        transform: [{ rotate: '-25deg' }],
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
        zIndex: 10,
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
    floorShadow: {
        position: 'absolute',
        bottom: -20,
        width: '75%',
        height: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: 12,
        transform: [{ scaleX: 1.1 }],
    },
});