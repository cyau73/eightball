// mobile/app/about.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebHeader } from '../components/WebHeader';
import { WebFooter } from '../components/WebFooter';
import { Link } from 'expo-router';

export default function AboutScreen() {
    return (
        <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollContent}>
            <WebHeader />

            <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.breadcrumb}>
                            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
                            <Text style={styles.breadcrumbSeparator}>/</Text>
                            <Text style={styles.breadcrumbCurrent}>About</Text>
                        </View>

                        <Text style={styles.title}>About Sassy Magic Eightball</Text>
                        <Text style={styles.subtitle}>Where Vintage Divination Meets Unfiltered Comedy</Text>

                        <Text style={styles.lead}>
                            The Sassy Magic Eightball was created with one simple conviction: polite, non-committal answers like &quot;Reply hazy, try again&quot; are completely useless in the 21st century. When you face an everyday dilemma, you deserve a witty, sarcastic, and brutally honest answer.
                        </Text>

                        {/* SECTION: OUR MISSION */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>Our Mission: Humor as a Decision-Making Tool</Text>
                            <Text style={styles.paragraph}>
                                Modern life bombards us with thousands of choices every day. From minor dilemmas (&quot;Should I buy another pair of identical black sneakers?&quot;) to dramatic existential questions (&quot;Should I text someone who has clearly ghosted me?&quot;), overthinking causes paralyzing indecision.
                            </Text>
                            <Text style={styles.paragraph}>
                                We built the Sassy Magic Eightball to shatter that paralysis through comedic shock value. When the oracle delivers a savage roast, it triggers what psychologists refer to as the &quot;visceral reality test.&quot; You instantly realize whether you agree with the prediction or wish to defy it. Either way, you get immediate clarity—and a good laugh.
                            </Text>
                        </View>

                        {/* SECTION: 3 INTENSITIES */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>Three Carefully Calibrated Tones</Text>
                            <Text style={styles.paragraph}>
                                We understand that your emotional resilience changes throughout the day. That is why our oracle lets you dial the sass up or down:
                            </Text>

                            <View style={styles.moodGrid}>
                                <View style={styles.moodCard}>
                                    <Text style={styles.moodEmoji}>✨</Text>
                                    <Text style={[styles.moodTitle, { color: '#38bdf8' }]}>Mild (Supportive Bestie)</Text>
                                    <Text style={styles.moodText}>
                                        Gentle optimism, validating affirmations, and wholesome encouragement to help you conquer your day.
                                    </Text>
                                </View>

                                <View style={styles.moodCard}>
                                    <Text style={styles.moodEmoji}>🌶️</Text>
                                    <Text style={[styles.moodTitle, { color: '#fb923c' }]}>Spicy (Witty Frenemy)</Text>
                                    <Text style={styles.moodText}>
                                        Playful sarcasm, sharp observations, and realistic banter that refuses to sugarcoat reality.
                                    </Text>
                                </View>

                                <View style={styles.moodCard}>
                                    <Text style={styles.moodEmoji}>⚡</Text>
                                    <Text style={[styles.moodTitle, { color: '#f472b6' }]}>Savage (The Roastmaster)</Text>
                                    <Text style={styles.moodText}>
                                        Unfiltered, ego-destroying burns and harsh truths designed for the bravest seekers of fate.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* SECTION: TECHNOLOGY */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>The Technology Under the Hood</Text>
                            <Text style={styles.paragraph}>
                                While the interface looks deceptively playful, the technology backing the Sassy Magic Eightball was engineered with state-of-the-art web and mobile architectures:
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Universal Cross-Platform Codebase:</Text> Built with React Native and Expo SDK 54, rendering pixel-perfect experiences across iOS, Android, mobile web, and desktop browsers.
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Hardware Accelerometer Shake Detection:</Text> On mobile devices, real-time accelerometer readings detect physical shakes with customized low-pass filtering and debounce thresholds.
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Mulberry32 PRNG &amp; Unique Cryptographic Seeding:</Text> Every installation receives an individual, persistent seed (`seed_usr_xxxx`) that feeds a 32-bit deterministic state machine, ensuring rich variation without repetitive streaks.
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Serverless Vercel &amp; PostgreSQL Backend:</Text> Powered by a serverless Next.js API backed by a PostgreSQL database with fallback offline resilience.
                            </Text>
                        </View>

                        {/* SECTION: PRIVACY & TRANSPARENCY */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>Openness &amp; Privacy</Text>
                            <Text style={styles.paragraph}>
                                We are staunch believers in user privacy. We do not require accounts, we do not record your personal questions, and we do not sell your personal data. The app is supported through Google AdSense advertising so that it remains completely free for millions of users worldwide.
                            </Text>
                        </View>

                        {/* CTA */}
                        <View style={styles.ctaBox}>
                            <Text style={styles.ctaTitle}>Ready to Test the Oracle?</Text>
                            <Text style={styles.ctaText}>Head over to the interactive eightball and ask your first question.</Text>
                            <Link href="/" style={styles.ctaButton}>
                                <Text style={styles.ctaButtonText}>Consult the Sassy Eightball &rarr;</Text>
                            </Link>
                        </View>

                    </View>
                </View>
            </main>

            <WebFooter />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollScreen: {
        flex: 1,
        backgroundColor: '#0a0b10',
    },
    scrollContent: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    container: {
        width: '100%',
        maxWidth: 860,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    content: {
        width: '100%',
    },
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    breadcrumbLink: {
        color: '#94a3b8',
        fontSize: 13,
        textDecorationLine: 'none',
    },
    breadcrumbSeparator: {
        color: '#64748b',
        fontSize: 13,
    },
    breadcrumbCurrent: {
        color: '#f472b6',
        fontSize: 13,
        fontWeight: '600',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#f8fafc',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#f472b6',
        fontWeight: '700',
        marginBottom: 24,
    },
    lead: {
        fontSize: 16,
        color: '#cbd5e1',
        lineHeight: 26,
        marginBottom: 32,
    },
    section: {
        marginBottom: 36,
    },
    h2: {
        fontSize: 20,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 12,
        letterSpacing: -0.2,
    },
    paragraph: {
        fontSize: 15,
        color: '#94a3b8',
        lineHeight: 25,
        marginBottom: 14,
    },
    bold: {
        fontWeight: '700',
        color: '#f8fafc',
    },
    bulletItem: {
        fontSize: 14,
        color: '#cbd5e1',
        lineHeight: 22,
        marginBottom: 10,
    },
    moodGrid: {
        gap: 16,
        marginTop: 16,
    },
    moodCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 14,
        padding: 20,
    },
    moodEmoji: {
        fontSize: 26,
        marginBottom: 8,
    },
    moodTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 6,
    },
    moodText: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 22,
    },
    ctaBox: {
        backgroundColor: 'rgba(236, 72, 153, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.25)',
        borderRadius: 16,
        padding: 28,
        alignItems: 'center',
        marginTop: 16,
    },
    ctaTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 8,
    },
    ctaText: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 18,
        textAlign: 'center',
    },
    ctaButton: {
        backgroundColor: '#ec4899',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 999,
        textDecorationLine: 'none',
    },
    ctaButtonText: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 14,
    },
});
