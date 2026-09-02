// components/AdBanner.web.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export const AdBanner: React.FC = () => {
    const [isLocalhost, setIsLocalhost] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('100.')) {
                setIsLocalhost(true);
                return;
            }
        }

        if (typeof window !== 'undefined' && !document.getElementById('adsense-script')) {
            const script = document.createElement('script');
            script.id = 'adsense-script';
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1519113587025254';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }

        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.warn('AdSense injection error:', err);
        }
    }, []);

    // Hides the container during local or Tailscale testing to prevent huge empty spaces
    if (isLocalhost) {
        return null;
    }

    return (
        <View style={styles.adContainer}>
            {React.createElement('ins', {
                className: 'adsbygoogle',
                style: { display: 'inline-block', width: '320px', height: '50px' },
                'data-ad-client': 'ca-pub-1519113587025254',
                'data-ad-slot': 'auto',
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    adContainer: {
        width: '100%',
        height: 20, // Fixed compact height matching mobile banners
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginVertical: 2,
    },
});