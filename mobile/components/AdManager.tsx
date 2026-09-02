import { useEffect } from 'react';
import { Platform, NativeModules } from 'react-native';

export const useGoogleMobileAdsInit = () => {
    useEffect(() => {
        if (Platform.OS === 'web' || !NativeModules.RNGoogleMobileAdsModule) {
            return;
        }

        const initializeMobileAds = async () => {
            try {
                const mobileAdsModule = require('react-native-google-mobile-ads');
                const MobileAds = mobileAdsModule.default;
                const MaxAdContentRating = mobileAdsModule.MaxAdContentRating;

                await MobileAds().setRequestConfiguration({
                    testDeviceIdentifiers: [
                        'E5011E3108154CB090745BFEA0038549',
                        '1fada78d363247028174cad59d1041b8',
                        'EMULATOR',
                    ],
                    maxAdContentRating: MaxAdContentRating.G,
                    tagForChildDirectedTreatment: false,
                    tagForUnderAgeOfConsent: false,
                });

                await MobileAds().initialize();
            } catch (err) {
                console.warn('Failed to initialize MobileAds:', err);
            }
        };

        initializeMobileAds();
    }, []);
};