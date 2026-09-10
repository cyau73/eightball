// mobile/app/faq.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebHeader } from '../components/WebHeader';
import { WebFooter } from '../components/WebFooter';
import { Link } from 'expo-router';

export default function FAQScreen() {
    const faqs = [
        {
            q: 'How does the Sassy Magic 8-Ball work?',
            a: 'The Sassy Magic 8-Ball combines a physics-inspired 3D digital die simulation with a deterministic pseudorandom entropy engine. When you shake your device or click the button, our Mulberry32 algorithm calculates a pseudo-random index based on your unique installation seed and draw count, delivering a sharp, witty fortune matching your chosen sass intensity.',
        },
        {
            q: 'What is the difference between Mild, Spicy, and Savage modes?',
            a: 'Mild mode is warm, validating, and encouraging (ideal when you need a gentle confidence boost). Spicy mode introduces sharp sarcasm, playful teasing, and realistic best-friend banter. Savage mode is completely unfiltered, featuring brutal roasts, wake-up calls, and hilarious reality checks.',
        },
        {
            q: 'How do I shake the 8-Ball on mobile vs desktop computers?',
            a: 'On mobile smartphones and tablets (iOS and Android), you can physically shake your device to trigger the accelerometer, or fling the 8-ball with your fingertip. On desktop web browsers, you can click and drag across the ball with your mouse or click the "Shake or Swipe 8-Ball" button.',
        },
        {
            q: 'Are the fortunes truly random?',
            a: 'Yes. Every device receives an individual 128-bit cryptographic seed upon initial install. Every time you ask a question, the draw count increments and generates a new deterministic hash. This ensures that answers are genuinely unpredictable while preventing duplicate repetitions.',
        },
        {
            q: 'Does the 8-Ball listen to or store my questions?',
            a: 'Never. You do not even need to type your question out loud if you prefer not to. The Sassy Magic 8-Ball has zero access to your microphone, camera, or personal messages. Your dilemmas remain 100% private to you.',
        },
        {
            q: 'Can I play when I am offline or on airplane mode?',
            a: 'Yes! While our serverless PostgreSQL API provides dynamic online fortunes, the app includes an embedded offline fallback engine with dozens of curated fortunes ready for immediate play without internet connectivity.',
        },
        {
            q: 'What if a Savage fortune roasts me too hard?',
            a: 'Remember that the Sassy 8-Ball is an inanimate piece of code designed for laughs! If Savage mode is hitting a little too close to home, switch down to Mild mode for some comforting affirmations, drink a glass of water, and remember you are doing great.',
        },
        {
            q: 'Why do you display advertisements on the website?',
            a: 'The Sassy Magic 8-Ball is free for everyone worldwide. Displaying advertisements through Google AdSense helps us offset our hosting, domain registration, serverless compute, and database costs without requiring paid subscriptions or paywalls.',
        },
        {
            q: 'Can I suggest new sassy fortunes or roasts?',
            a: 'Yes! We love community submissions. Reach out through our Contact Page with your wittiest one-liners. If your fortune is chosen, it will be added to our global database in future updates.',
        },
    ];

    return (
        <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollContent}>
            <WebHeader />

            <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.breadcrumb}>
                            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
                            <Text style={styles.breadcrumbSeparator}>/</Text>
                            <Text style={styles.breadcrumbCurrent}>FAQ</Text>
                        </View>

                        <Text style={styles.title}>Frequently Asked Questions</Text>
                        <Text style={styles.subtitle}>Everything You Wanted to Know About the Sassy Oracle</Text>

                        <Text style={styles.lead}>
                            Got questions about how the 8-Ball works, how our randomness algorithm functions, or why you just got roasted about your life choices? Find all the answers right here.
                        </Text>

                        <View style={styles.faqContainer}>
                            {faqs.map((item, idx) => (
                                <View key={idx} style={styles.faqCard}>
                                    <Text style={styles.faqQuestion}>{item.q}</Text>
                                    <Text style={styles.faqAnswer}>{item.a}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.bottomHelpBox}>
                            <Text style={styles.bottomHelpTitle}>Still have an unanswered question?</Text>
                            <Text style={styles.bottomHelpText}>
                                We are always happy to help. Send us a message through our Contact Page and our team will get back to you promptly.
                            </Text>
                            <Link href="/contact" style={styles.contactBtn}>
                                <Text style={styles.contactBtnText}>Get In Touch &rarr;</Text>
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
        marginBottom: 36,
    },
    faqContainer: {
        gap: 16,
        marginBottom: 40,
    },
    faqCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 14,
        padding: 22,
    },
    faqQuestion: {
        fontSize: 17,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 10,
        lineHeight: 24,
    },
    faqAnswer: {
        fontSize: 15,
        color: '#94a3b8',
        lineHeight: 24,
    },
    bottomHelpBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 28,
        alignItems: 'center',
        marginTop: 12,
    },
    bottomHelpTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 8,
    },
    bottomHelpText: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: 480,
        lineHeight: 22,
        marginBottom: 20,
    },
    contactBtn: {
        backgroundColor: '#ec4899',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 999,
        textDecorationLine: 'none',
    },
    contactBtnText: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 13,
    },
});
