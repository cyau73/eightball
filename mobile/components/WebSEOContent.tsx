// mobile/components/WebSEOContent.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';

export const WebSEOContent: React.FC = () => {
    if (Platform.OS !== 'web') {
        return null;
    }

    return (
        <section style={{ width: '100%', maxWidth: '100%' }}>
            <View style={styles.container}>
                <View style={styles.contentWrapper}>

                    {/* HERO EDITORIAL INTRO */}
                    <View style={styles.heroSection}>
                        <View style={styles.tagBadge}>
                            <Text style={styles.tagBadgeText}>THE DIGITAL ORACLE FOR MODERN DILEMMAS</Text>
                        </View>
                        <Text style={styles.mainHeading}>
                            Sassy Magic 8-Ball: Honest, Witty, &amp; Unfiltered Fortunes
                        </Text>
                        <Text style={styles.leadParagraph}>
                            Welcome to the web&apos;s favorite sarcastic oracle. Whether you are agonizing over whether to text your ex at 2:00 AM, wondering if you should buy that overpriced iced latte, or contemplating quitting your job to become an artisanal mushroom forager, the Sassy Magic 8-Ball delivers the reality check you desperately need.
                        </Text>
                    </View>

                    {/* 3 VALUE PILLARS / HIGHLIGHT CARDS */}
                    <View style={styles.cardGrid}>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>⚡</Text>
                            <Text style={styles.cardTitle}>Instant Clarity</Text>
                            <Text style={styles.cardBody}>
                                No ambiguity, no polite corporate fluff. Get straight-to-the-point answers packed with quick wit, sharp satire, and uncanny precision.
                            </Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>🌶️</Text>
                            <Text style={styles.cardTitle}>3 Mood Intensities</Text>
                            <Text style={styles.cardBody}>
                                Tailor the attitude to your emotional resilience. Choose Mild for gentle encouragement, Spicy for playful teasing, or Savage for ruthless reality checks.
                            </Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardIcon}>🔐</Text>
                            <Text style={styles.cardTitle}>Cryptographic Entropy</Text>
                            <Text style={styles.cardBody}>
                                Powered by a deterministic Mulberry32 pseudorandom engine and unique installation seeding, your fortunes are authentically unpredictable.
                            </Text>
                        </View>
                    </View>

                    {/* SECTION 1: HOW TO CONSULT THE ORACLE */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>How to Ask the Sassy Magic 8-Ball</Text>
                        <Text style={styles.paragraph}>
                            Consulting the oracle is simple, but achieving maximum comedic truth requires following a few sacred principles:
                        </Text>

                        <View style={styles.stepList}>
                            <View style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>1</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>Formulate a Closed (Yes/No) Question</Text>
                                    <Text style={styles.stepDesc}>
                                        The Magic 8-Ball thrives on polarity. Ask questions like &quot;Will my presentation go well?&quot; or &quot;Should I eat this leftover pizza?&quot; rather than open-ended queries like &quot;What is the meaning of life?&quot;
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>2</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>Select Your Sass Intensity</Text>
                                    <Text style={styles.stepDesc}>
                                        Are you in a fragile mood or ready for an unfiltered roast? Toggle between <Text style={styles.boldText}>Mild</Text>, <Text style={styles.boldText}>Spicy</Text>, and <Text style={styles.boldText}>Savage</Text> using the intensity selector above.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>3</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>Shake or Swipe the 8-Ball</Text>
                                    <Text style={styles.stepDesc}>
                                        On mobile web and smartphones, shake your device or fling the ball with your finger. On desktop computers, click and drag across the ball or click the &quot;Shake or Swipe&quot; button.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>4</Text>
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>Reflect Upon Your Fate</Text>
                                    <Text style={styles.stepDesc}>
                                        Watch the floating triangular die surface through the mystical indigo ether. Read your fortune, take a deep breath, and act accordingly.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* SECTION 2: THE THREE TIERS OF SASS */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>Explore the Three Levels of Attitude</Text>
                        <Text style={styles.paragraph}>
                            Not everyone can handle a full roast before their morning espresso. That is why the Sassy Magic 8-Ball provides three distinct comedic registers:
                        </Text>

                        <View style={styles.tierContainer}>
                            <View style={[styles.tierCard, { borderColor: 'rgba(56, 189, 248, 0.4)' }]}>
                                <View style={styles.tierHeader}>
                                    <Text style={styles.tierBadgeMild}>✨ MILD &bull; Supportive &amp; Kind</Text>
                                </View>
                                <Text style={styles.tierDescription}>
                                    Designed for when life has been a little too heavy and you need a supportive digital companion. Mild mode provides optimistic, warm affirmations with just a tiny pinch of playful levity.
                                </Text>
                                <View style={styles.quoteBox}>
                                    <Text style={styles.quoteText}>&ldquo;Signs point to yes! Look at you winning today.&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;Yes, definitely. Treat yourself to a snack.&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;Reply hazy, try asking after a little power nap.&rdquo;</Text>
                                </View>
                            </View>

                            <View style={[styles.tierCard, { borderColor: 'rgba(251, 146, 60, 0.4)' }]}>
                                <View style={styles.tierHeader}>
                                    <Text style={styles.tierBadgeSpicy}>🌶️ SPICY &bull; Witty &amp; Sarcastic</Text>
                                </View>
                                <Text style={styles.tierDescription}>
                                    The sweet spot for everyday decision-making. Spicy mode channels the energy of that brutally perceptive best friend who loves you, but will never let you get away with questionable life choices.
                                </Text>
                                <View style={styles.quoteBox}>
                                    <Text style={styles.quoteText}>&ldquo;Yes, but you&apos;re definitely going to complain about it later.&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;Cannot predict now... suffering from second-hand embarrassment.&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;Yes, queen/king. Go make questionable choices.&rdquo;</Text>
                                </View>
                            </View>

                            <View style={[styles.tierCard, { borderColor: 'rgba(244, 114, 182, 0.5)' }]}>
                                <View style={styles.tierHeader}>
                                    <Text style={styles.tierBadgeSavage}>⚡ SAVAGE &bull; Unfiltered &amp; Ruthless</Text>
                                </View>
                                <Text style={styles.tierDescription}>
                                    Enter at your own peril. Savage mode turns off all social filters. It offers blunt roasts, humbling observations, and devastatingly accurate wake-up calls.
                                </Text>
                                <View style={styles.quoteBox}>
                                    <Text style={styles.quoteText}>&ldquo;Even Google doesn&apos;t have an answer for that level of delusion.&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;Have you considered that maybe YOU are the problem?&rdquo;</Text>
                                    <Text style={styles.quoteText}>&ldquo;They left you on read for a reason. Take the hint.&rdquo;</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* SECTION 3: THE HISTORY & SCIENCE */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>The History of the Magic 8-Ball: From 1944 to Now</Text>
                        <Text style={styles.paragraph}>
                            The iconic Magic 8-Ball has a rich, eccentric heritage stretching back over eighty years. The story began in 1944 when inventor Albert C. Carter, inspired by a spirit writing slate used by his clairvoyant mother Mary, patented a cylindrical fortune-telling device known as the &quot;Syco-Seer.&quot;
                        </Text>
                        <Text style={styles.paragraph}>
                            Following Carter&apos;s passing, Chicago craftsman Abe Bookman teamed up with Carter&apos;s brother-in-law to refine the design. Initially packaged inside an ornate crystal-ball housing, the device was later repurposed in 1950 when Brunswick Billiards commissioned a promotional version shaped like an oversized black billiard eight ball.
                        </Text>
                        <Text style={styles.paragraph}>
                            Inside the original physical toy, a hollow plastic icosahedron (a 20-sided die) floats freely in dark blue liquid (composed of water, blue dye, and anhydrous alcohol) within a cylindrical reservoir. When shaken, the die settles against a clear glass window on the bottom of the ball, revealing one of twenty standard responses.
                        </Text>
                        <Text style={styles.paragraph}>
                            Our digital Sassy Magic 8-Ball preserves the satisfying physics and floating die geometry of the vintage classic, while replacing the 1950s polite corporate vocabulary with sharp, modern humor and deterministic cryptographic randomness.
                        </Text>
                    </View>

                    {/* SECTION 4: PSYCHOLOGY OF DECISION MAKING */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>The Coin-Toss Epiphany: Why Sarcasm Helps You Decide</Text>
                        <Text style={styles.paragraph}>
                            Psychologists have long recognized the power of externalizing tough decisions. When individuals are trapped in analysis paralysis, flipping a coin or consulting an oracle creates an instantaneous psychological breakthrough.
                        </Text>
                        <Text style={styles.paragraph}>
                            Renowned psychoanalysts have noted that when a random device tells you &quot;No&quot;, your subconscious mind immediately evaluates that answer:
                        </Text>
                        <View style={styles.calloutBox}>
                            <Text style={styles.calloutTitle}>💡 The Visceral Truth Test</Text>
                            <Text style={styles.calloutBody}>
                                If the Sassy 8-Ball tells you &quot;Not in a million years, bestie,&quot; and you feel a wave of disappointment, you instantly know that your heart truly wanted a &quot;Yes.&quot; If you feel a wave of relief, your intuition was warning you to walk away. The sassy oracle doesn&apos;t just predict your future—it reflects your hidden desires.
                            </Text>
                        </View>
                    </View>

                    {/* SECTION 5: CLASSIC VS SASSY COMPARISON */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>Classic 8-Ball vs. Sassy 8-Ball: Side-by-Side</Text>
                        <View style={styles.tableWrapper}>
                            <View style={styles.tableRowHeader}>
                                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1.2 }]}>Scenario / Sentiment</Text>
                                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1.5 }]}>Boring Classic Answer</Text>
                                <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 2 }]}>Sassy 8-Ball Upgrade</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableSentiment, { flex: 1.2 }]}>Strong Affirmation</Text>
                                <Text style={[styles.tableCell, styles.tableClassic, { flex: 1.5 }]}>&quot;It is decidedly so&quot;</Text>
                                <Text style={[styles.tableCell, styles.tableSassy, { flex: 2 }]}>&quot;100% yes! Take this as your official sign.&quot;</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableSentiment, { flex: 1.2 }]}>Doubtful Hesitation</Text>
                                <Text style={[styles.tableCell, styles.tableClassic, { flex: 1.5 }]}>&quot;Reply hazy, try again&quot;</Text>
                                <Text style={[styles.tableCell, styles.tableSassy, { flex: 2 }]}>&quot;Cannot predict now... suffering from second-hand embarrassment.&quot;</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableSentiment, { flex: 1.2 }]}>Firm Rejection</Text>
                                <Text style={[styles.tableCell, styles.tableClassic, { flex: 1.5 }]}>&quot;Don&apos;t count on it&quot;</Text>
                                <Text style={[styles.tableCell, styles.tableSassy, { flex: 2 }]}>&quot;Even Google doesn&apos;t have an answer for that level of delusion.&quot;</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableSentiment, { flex: 1.2 }]}>Chaotic Approval</Text>
                                <Text style={[styles.tableCell, styles.tableClassic, { flex: 1.5 }]}>&quot;Outlook good&quot;</Text>
                                <Text style={[styles.tableCell, styles.tableSassy, { flex: 2 }]}>&quot;Yes, queen/king. Go make questionable choices.&quot;</Text>
                            </View>
                        </View>
                    </View>

                    {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
                    <View style={styles.articleSection}>
                        <Text style={styles.sectionHeading}>Frequently Asked Questions (FAQ)</Text>

                        <View style={styles.faqList}>
                            <View style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>Q: How does the Sassy Magic 8-Ball work?</Text>
                                <Text style={styles.faqAnswer}>
                                    The 8-Ball uses a client-side and serverless hybrid architecture. On every draw, your unique installation seed is hashed together with an incremental nonce using the Mulberry32 deterministic random number generator. This pulls from an extensive database of witty fortunes while ensuring that you never get the exact same sequence twice in a row.
                                </Text>
                            </View>

                            <View style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>Q: Can I use this on both mobile devices and desktop computers?</Text>
                                <Text style={styles.faqAnswer}>
                                    Yes! On mobile devices (iOS, Android, mobile web), the app utilizes your device&apos;s physical accelerometer so you can shake your phone in real life to unveil your fortune. On desktop browsers, you can spin the ball with a mouse swipe or click the Shake button.
                                </Text>
                            </View>

                            <View style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>Q: Is the Sassy Magic 8-Ball free to play?</Text>
                                <Text style={styles.faqAnswer}>
                                    100% free forever. There are no subscriptions, microtransactions, or paywalled fortunes. We support server and maintenance costs through non-intrusive banner and auto advertisements via Google AdSense.
                                </Text>
                            </View>

                            <View style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>Q: Do you collect my questions or personal information?</Text>
                                <Text style={styles.faqAnswer}>
                                    No. Your questions are kept entirely in your mind—or typed into your own browser. We do not store or transmit your private questions to our servers. Only pseudorandom entropy parameters and anonymous analytics are processed. Please see our <Link href="/privacy" style={{ color: '#ec4899', textDecorationLine: 'underline' }}>Privacy Policy</Link> for complete details.
                                </Text>
                            </View>

                            <View style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>Q: Can I share my fortunes with friends?</Text>
                                <Text style={styles.faqAnswer}>
                                    Absolutely. You can screenshot any fortune or open the History drawer to review and copy your recent fortunes to share on Twitter/X, Instagram, TikTok, or WhatsApp.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* SECTION 7: CALL TO ACTION */}
                    <View style={styles.ctaBox}>
                        <Text style={styles.ctaHeading}>Ready for Your Sassy Revelation?</Text>
                        <Text style={styles.ctaBody}>
                            Scroll back up to the top, focus on your dilemma, and spin the 8-Ball. Don&apos;t say we didn&apos;t warn you!
                        </Text>
                        <View style={styles.ctaLinks}>
                            <Link href="/about" style={styles.ctaBtn}>
                                <Text style={styles.ctaBtnText}>Read More About Us &rarr;</Text>
                            </Link>
                            <Link href="/faq" style={styles.ctaBtnSecondary}>
                                <Text style={styles.ctaBtnSecondaryText}>View All FAQs</Text>
                            </Link>
                        </View>
                    </View>

                </View>
            </View>
        </section>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0a0b10',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 48,
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 960,
    },
    heroSection: {
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 48,
    },
    tagBadge: {
        backgroundColor: 'rgba(236, 72, 153, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.3)',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 999,
        marginBottom: 16,
    },
    tagBadgeText: {
        color: '#f472b6',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
    mainHeading: {
        fontSize: 32,
        fontWeight: '900',
        color: '#f8fafc',
        textAlign: 'center',
        letterSpacing: -0.5,
        marginBottom: 16,
        lineHeight: 40,
    },
    leadParagraph: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 26,
        maxWidth: 760,
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 56,
    },
    card: {
        flex: 1,
        minWidth: 260,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 24,
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 8,
    },
    cardBody: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 22,
    },
    articleSection: {
        marginBottom: 56,
    },
    sectionHeading: {
        fontSize: 24,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 16,
        letterSpacing: -0.3,
    },
    paragraph: {
        fontSize: 15,
        color: '#cbd5e1',
        lineHeight: 25,
        marginBottom: 16,
    },
    boldText: {
        fontWeight: '700',
        color: '#f8fafc',
    },
    stepList: {
        gap: 16,
        marginTop: 16,
    },
    stepItem: {
        flexDirection: 'row',
        gap: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        padding: 18,
    },
    stepNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    stepNumberText: {
        color: '#f472b6',
        fontWeight: '900',
        fontSize: 16,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 4,
    },
    stepDesc: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 21,
    },
    tierContainer: {
        gap: 20,
        marginTop: 16,
    },
    tierCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderRadius: 16,
        padding: 22,
    },
    tierHeader: {
        marginBottom: 10,
    },
    tierBadgeMild: {
        fontSize: 14,
        fontWeight: '800',
        color: '#38bdf8',
        letterSpacing: 0.5,
    },
    tierBadgeSpicy: {
        fontSize: 14,
        fontWeight: '800',
        color: '#fb923c',
        letterSpacing: 0.5,
    },
    tierBadgeSavage: {
        fontSize: 14,
        fontWeight: '800',
        color: '#f472b6',
        letterSpacing: 0.5,
    },
    tierDescription: {
        fontSize: 14,
        color: '#cbd5e1',
        lineHeight: 22,
        marginBottom: 14,
    },
    quoteBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        padding: 14,
        gap: 8,
    },
    quoteText: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#94a3b8',
    },
    calloutBox: {
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
        borderLeftWidth: 4,
        borderLeftColor: '#a855f7',
        borderRadius: 8,
        padding: 20,
        marginVertical: 16,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#d8b4fe',
        marginBottom: 8,
    },
    calloutBody: {
        fontSize: 14,
        color: '#cbd5e1',
        lineHeight: 22,
    },
    tableWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 12,
    },
    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.04)',
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
    },
    tableCell: {
        paddingHorizontal: 6,
    },
    tableHeaderCell: {
        fontSize: 12,
        fontWeight: '800',
        color: '#f8fafc',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tableSentiment: {
        fontSize: 13,
        fontWeight: '700',
        color: '#a855f7',
    },
    tableClassic: {
        fontSize: 13,
        color: '#64748b',
        fontStyle: 'italic',
    },
    tableSassy: {
        fontSize: 13,
        color: '#f472b6',
        fontWeight: '600',
    },
    faqList: {
        gap: 16,
        marginTop: 12,
    },
    faqItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        padding: 20,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 8,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 22,
    },
    ctaBox: {
        backgroundColor: 'rgba(236, 72, 153, 0.08)',
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.25)',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        textAlign: 'center',
    },
    ctaHeading: {
        fontSize: 22,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 8,
    },
    ctaBody: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 20,
        textAlign: 'center',
        maxWidth: 500,
        lineHeight: 22,
    },
    ctaLinks: {
        flexDirection: 'row',
        gap: 14,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    ctaBtn: {
        backgroundColor: '#ec4899',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
        textDecorationLine: 'none',
    },
    ctaBtnText: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 13,
    },
    ctaBtnSecondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
        textDecorationLine: 'none',
    },
    ctaBtnSecondaryText: {
        color: '#f8fafc',
        fontWeight: '700',
        fontSize: 13,
    },
});
