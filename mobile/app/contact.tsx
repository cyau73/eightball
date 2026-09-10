// mobile/app/contact.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { WebHeader } from '../components/WebHeader';
import { WebFooter } from '../components/WebFooter';
import { Link } from 'expo-router';

export default function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!message.trim()) return;
        setSubmitted(true);
    };

    return (
        <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollContent}>
            <WebHeader />

            <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.breadcrumb}>
                            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
                            <Text style={styles.breadcrumbSeparator}>/</Text>
                            <Text style={styles.breadcrumbCurrent}>Contact</Text>
                        </View>

                        <Text style={styles.title}>Contact &amp; Support</Text>
                        <Text style={styles.subtitle}>We Would Love to Hear From You</Text>

                        <Text style={styles.lead}>
                            Have a brilliant sassy fortune to suggest? Encountered a technical glitch? Or have an inquiry regarding advertising partnerships or privacy? Reach out through any of our channels below.
                        </Text>

                        <View style={styles.channelsGrid}>
                            <View style={styles.channelCard}>
                                <Text style={styles.channelIcon}>💬</Text>
                                <Text style={styles.channelTitle}>General Inquiries &amp; Support</Text>
                                <Text style={styles.channelDesc}>
                                    For technical assistance, bug reports, and general feedback.
                                </Text>
                                <Text style={styles.channelEmail}>support@sassy-eightball.vercel.app</Text>
                            </View>

                            <View style={styles.channelCard}>
                                <Text style={styles.channelIcon}>✨</Text>
                                <Text style={styles.channelTitle}>Fortune Submissions</Text>
                                <Text style={styles.channelDesc}>
                                    Got a savage one-liner or witty reply? Pitch it to our editorial team!
                                </Text>
                                <Text style={styles.channelEmail}>fortunes@sassy-eightball.vercel.app</Text>
                            </View>

                            <View style={styles.channelCard}>
                                <Text style={styles.channelIcon}>📢</Text>
                                <Text style={styles.channelTitle}>Advertising &amp; AdSense</Text>
                                <Text style={styles.channelDesc}>
                                    For publisher inquiries, ad policy questions, and commercial partnerships.
                                </Text>
                                <Text style={styles.channelEmail}>advertising@sassy-eightball.vercel.app</Text>
                            </View>
                        </View>

                        {/* Interactive Message Form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.formHeading}>Send Us a Message</Text>

                            {submitted ? (
                                <View style={styles.successBox}>
                                    <Text style={styles.successEmoji}>🎉</Text>
                                    <Text style={styles.successTitle}>Thank You for Reaching Out!</Text>
                                    <Text style={styles.successText}>
                                        Your message has been received. Our team will review your submission and reply shortly.
                                    </Text>
                                    <TouchableOpacity style={styles.sendAnotherBtn} onPress={() => setSubmitted(false)}>
                                        <Text style={styles.sendAnotherBtnText}>Send Another Message</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.formFields}>
                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.label}>Your Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your name"
                                            placeholderTextColor="#64748b"
                                            value={name}
                                            onChangeText={setName}
                                        />
                                    </View>

                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.label}>Your Email Address</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="you@example.com"
                                            placeholderTextColor="#64748b"
                                            keyboardType="email-address"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>

                                    <View style={styles.fieldGroup}>
                                        <Text style={styles.label}>Your Message or Sassy Fortune Pitch</Text>
                                        <TextInput
                                            style={[styles.input, styles.textArea]}
                                            placeholder="Write your thoughts, bug report, or hilarious fortune suggestion..."
                                            placeholderTextColor="#64748b"
                                            multiline
                                            numberOfLines={5}
                                            value={message}
                                            onChangeText={setMessage}
                                        />
                                    </View>

                                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                                        <Text style={styles.submitBtnText}>Submit Message &rarr;</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
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
    channelsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 48,
    },
    channelCard: {
        flex: 1,
        minWidth: 240,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 14,
        padding: 22,
    },
    channelIcon: {
        fontSize: 26,
        marginBottom: 10,
    },
    channelTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 6,
    },
    channelDesc: {
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 20,
        marginBottom: 14,
    },
    channelEmail: {
        fontSize: 13,
        color: '#38bdf8',
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 28,
    },
    formHeading: {
        fontSize: 20,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 20,
    },
    formFields: {
        gap: 18,
    },
    fieldGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#cbd5e1',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#f8fafc',
        fontSize: 14,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitBtn: {
        backgroundColor: '#ec4899',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 6,
    },
    submitBtnText: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 14,
    },
    successBox: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    successEmoji: {
        fontSize: 36,
        marginBottom: 12,
    },
    successTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 8,
    },
    successText: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: 420,
        lineHeight: 22,
        marginBottom: 20,
    },
    sendAnotherBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 999,
    },
    sendAnotherBtnText: {
        color: '#f8fafc',
        fontWeight: '700',
        fontSize: 13,
    },
});
