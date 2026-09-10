// mobile/components/WebHeader.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';

export const WebHeader: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (Platform.OS !== 'web') {
        return null;
    }

    return (
        <header style={{ width: '100%', zIndex: 100, position: 'relative' }}>
            <div style={inlineStyles.navContainer}>
                <div style={inlineStyles.navInner}>
                    {/* Top Logo - clicking takes user back to EightBall root */}
                    <Link href="/" style={styles.logoLink} onPress={() => setMobileMenuOpen(false)}>
                        <View style={styles.logoGroup}>
                            <Text style={styles.logoEmoji}>🔮</Text>
                            <View>
                                <Text style={styles.logoTitle}>SASSY 8-BALL</Text>
                                <Text style={styles.logoSubtitle}>Digital Oracle &amp; Fortune Teller</Text>
                            </View>
                        </View>
                    </Link>

                    {/* Desktop Navigation Links: ONLY visible on desktop viewports via CSS */}
                    <nav className="web-desktop-nav">
                        <Link href="/about" style={styles.navItem}>
                            <Text style={styles.navItemText}>About</Text>
                        </Link>
                        <Link href="/faq" style={styles.navItem}>
                            <Text style={styles.navItemText}>FAQ</Text>
                        </Link>
                        <Link href="/privacy" style={styles.navItem}>
                            <Text style={styles.navItemText}>Privacy</Text>
                        </Link>
                        <Link href="/terms" style={styles.navItem}>
                            <Text style={styles.navItemText}>Terms</Text>
                        </Link>
                        <Link href="/contact" style={styles.navItem}>
                            <Text style={styles.navItemText}>Contact</Text>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle: ONLY visible on mobile viewports via CSS */}
                    <button
                        type="button"
                        className="web-mobile-toggle"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Dropdown Menu: shown only when menu is toggled on mobile */}
                {mobileMenuOpen && (
                    <nav className="web-mobile-dropdown">
                        <Link href="/" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={[styles.mobileNavItemText, { color: '#ec4899' }]}>🎱 Eight-Ball</Text>
                        </Link>
                        <Link href="/about" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={styles.mobileNavItemText}>📖 About</Text>
                        </Link>
                        <Link href="/faq" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={styles.mobileNavItemText}>❓ FAQ</Text>
                        </Link>
                        <Link href="/privacy" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={styles.mobileNavItemText}>🔒 Privacy Policy</Text>
                        </Link>
                        <Link href="/terms" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={styles.mobileNavItemText}>📄 Terms of Service</Text>
                        </Link>
                        <Link href="/contact" style={styles.mobileNavItem} onPress={() => setMobileMenuOpen(false)}>
                            <Text style={styles.mobileNavItemText}>✉️ Contact &amp; Support</Text>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

const inlineStyles: Record<string, React.CSSProperties> = {
    navContainer: {
        width: '100%',
        backgroundColor: 'rgba(10, 11, 16, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 16px',
        boxSizing: 'border-box',
    },
    navInner: {
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
    },
};

const styles = StyleSheet.create({
    logoLink: {
        textDecorationLine: 'none',
    },
    logoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoEmoji: {
        fontSize: 22,
    },
    logoTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: '#f8fafc',
        letterSpacing: 0.6,
    },
    logoSubtitle: {
        fontSize: 9,
        color: '#94a3b8',
        fontWeight: '500',
        letterSpacing: 0.4,
    },
    navItem: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        textDecorationLine: 'none',
    },
    navItemText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#cbd5e1',
        letterSpacing: 0.2,
    },
    mobileNavItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        textDecorationLine: 'none',
    },
    mobileNavItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#cbd5e1',
    },
});
