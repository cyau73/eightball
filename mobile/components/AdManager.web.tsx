// components/AdBanner.web.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export const useGoogleMobileAdsInit = () => {
    // Do nothing on web
};

export const AdBanner: React.FC = () => {
    useEffect(() => {
        // Dynamically inject the AdSense script into the web head if it doesn't already exist
        if (typeof window !== 'undefined' && !document.getElementById('adsense-script')) {
            const script = document.createElement('script');
            script.id = 'adsense-script';
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
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

    return (
        <View style={styles.adContainer}>
            {React.createElement('ins', {
                className: 'adsbygoogle',
                style: { display: 'block', width: '100%', textAlign: 'center' },
                'data-ad-client': 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense ID
                'data-ad-slot': '1234567890',               // Replace with your Ad Slot ID
                'data-ad-format': 'auto',
                'data-full-width-responsive': 'true',
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    adContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 4,
        overflow: 'hidden',
        minHeight: 50,
    },
});