// mobile/app/privacy.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebHeader } from '../components/WebHeader';
import { WebFooter } from '../components/WebFooter';
import { Link } from 'expo-router';

export default function PrivacyPolicyScreen() {
    return (
        <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollContent}>
            <WebHeader />

            <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.breadcrumb}>
                            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
                            <Text style={styles.breadcrumbSeparator}>/</Text>
                            <Text style={styles.breadcrumbCurrent}>Privacy Policy</Text>
                        </View>

                        <Text style={styles.title}>Privacy Policy</Text>
                        <Text style={styles.lastUpdated}>Last Updated: September 10, 2026</Text>

                        <Text style={styles.lead}>
                            Your privacy is extremely important to us at Sassy Magic 8-Ball (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we handle information, our use of cookies, and your rights regarding personalized advertising and data protection when you use our website and mobile applications.
                        </Text>

                        {/* SECTION 1 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>1. Google AdSense &amp; Third-Party Advertising Cookies</Text>
                            <Text style={styles.paragraph}>
                                We use Google AdSense to serve advertisements when you visit our website. Google and other third-party vendors use cookies, web beacons, and similar tracking technologies to serve ads based on your prior visits to this website and other sites across the Internet.
                            </Text>
                            <View style={styles.highlightCard}>
                                <Text style={styles.cardHeading}>Key Disclosures for Google AdSense:</Text>
                                <Text style={styles.bulletItem}>
                                    &bull; <Text style={styles.bold}>Google&apos;s use of advertising cookies</Text> (such as the DoubleClick DART cookie) enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
                                </Text>
                                <Text style={styles.bulletItem}>
                                    &bull; Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#ec4899', fontWeight: 'bold' }}>Google Ads Settings</a>.
                                </Text>
                                <Text style={styles.bulletItem}>
                                    &bull; Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#ec4899', fontWeight: 'bold' }}>aboutads.info choices</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#ec4899', fontWeight: 'bold' }}>Your Online Choices</a>.
                                </Text>
                            </View>
                        </View>

                        {/* SECTION 2 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>2. Information We Collect</Text>
                            <Text style={styles.paragraph}>
                                The Sassy Magic 8-Ball is designed to be privacy-friendly by default. We do NOT require an account, sign-in, or registration to play:
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Your Questions:</Text> We do NOT record, intercept, or store the questions you ask the 8-Ball. Your questions exist solely in your thoughts or locally in your browser session.
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Local Storage Data:</Text> We store a non-identifying cryptographic installation seed (e.g. `seed_usr_xxxx`), your recent fortune history (capped at 50 draws), and your audio/intensity preferences directly on your device using `AsyncStorage` / browser `localStorage`.
                            </Text>
                            <Text style={styles.bulletItem}>
                                &bull; <Text style={styles.bold}>Anonymous Technical Logs:</Text> Standard web server logs (IP address, user agent, requested URL, timestamp) are temporarily recorded for security, fraud prevention, and performance monitoring.
                            </Text>
                        </View>

                        {/* SECTION 3 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>3. How We Use Information</Text>
                            <Text style={styles.paragraph}>
                                Any information processed is strictly utilized to:
                            </Text>
                            <Text style={styles.bulletItem}>&bull; Deliver reliable, deterministic pseudorandom fortunes.</Text>
                            <Text style={styles.bulletItem}>&bull; Maintain and optimize the technical performance of our serverless API.</Text>
                            <Text style={styles.bulletItem}>&bull; Prevent abuse, automated scraping, and DDoS attacks.</Text>
                            <Text style={styles.bulletItem}>&bull; Display non-intrusive advertisements to finance server and database infrastructure.</Text>
                        </View>

                        {/* SECTION 4 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>4. GDPR Compliance (European Economic Area)</Text>
                            <Text style={styles.paragraph}>
                                If you are a resident of the European Economic Area (EEA), you have the right under the General Data Protection Regulation (GDPR) to access, rectify, or request deletion of any personal data. Because we do not collect personal identities or email addresses during standard gameplay, your local game data can be purged instantly at any time by clearing your browser cache or resetting your seed in the Settings modal.
                            </Text>
                        </View>

                        {/* SECTION 5 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>5. California Consumer Privacy Act (CCPA)</Text>
                            <Text style={styles.paragraph}>
                                Under the CCPA, California residents have the right to know what personal data is collected and request that personal information not be sold. We do NOT sell your personal information. Third-party advertising partners may collect online identifiers as outlined in Section 1.
                            </Text>
                        </View>

                        {/* SECTION 6 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>6. Children&apos;s Privacy (COPPA)</Text>
                            <Text style={styles.paragraph}>
                                Our service is directed toward general audiences aged 13 and older. We do not knowingly solicit or collect personal identifiable information from children under 13.
                            </Text>
                        </View>

                        {/* SECTION 7 */}
                        <View style={styles.section}>
                            <Text style={styles.h2}>7. Contact Us</Text>
                            <Text style={styles.paragraph}>
                                If you have any inquiries, concerns, or privacy requests regarding this policy, please reach out through our <Link href="/contact" style={{ color: '#ec4899', textDecorationLine: 'underline' }}>Contact Page</Link> or email us directly at:
                            </Text>
                            <View style={styles.emailBox}>
                                <Text style={styles.emailText}>privacy@sassy-8ball.vercel.app</Text>
                            </View>
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
    lastUpdated: {
        fontSize: 13,
        color: '#64748b',
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
        marginBottom: 12,
    },
    bold: {
        fontWeight: '700',
        color: '#f8fafc',
    },
    highlightCard: {
        backgroundColor: 'rgba(236, 72, 153, 0.06)',
        borderWidth: 1,
        borderColor: 'rgba(236, 72, 153, 0.25)',
        borderRadius: 12,
        padding: 18,
        marginTop: 12,
    },
    cardHeading: {
        fontSize: 14,
        fontWeight: '800',
        color: '#f472b6',
        marginBottom: 10,
    },
    bulletItem: {
        fontSize: 14,
        color: '#cbd5e1',
        lineHeight: 22,
        marginBottom: 8,
    },
    emailBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    emailText: {
        color: '#38bdf8',
        fontFamily: 'monospace',
        fontSize: 14,
    },
});
