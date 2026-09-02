import React from 'react';
import { StyleSheet, View, Platform, NativeModules, Text } from 'react-native';

let BannerAd: any = null;
let BannerAdSize: any = null;
let TestIds: any = null;

// Only load the module if the native binary is compiled into the app
const isAdMobAvailable = Platform.OS !== 'web' && !!NativeModules.RNGoogleMobileAdsModule;

if (isAdMobAvailable) {
  try {
    const mobileAds = require('react-native-google-mobile-ads');
    BannerAd = mobileAds.BannerAd;
    BannerAdSize = mobileAds.BannerAdSize;
    TestIds = mobileAds.TestIds;
  } catch (e) {
    console.warn('Google Mobile Ads native module failed to load:', e);
  }
}

const adUnitId = __DEV__
  ? TestIds?.ADAPTIVE_BANNER
  : Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
    default: TestIds?.ADAPTIVE_BANNER,
  });

export const AdBanner: React.FC = () => {
  if (!isAdMobAvailable || !BannerAd) {
    return (
      <View style={styles.webAdPlaceholder}>
        <Text style={styles.adText}>[Ad Banner Placeholder - Web]</Text>
      </View>
    );
  }

  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error: any) => {
          console.warn('Ad failed to load: ', error);
        }}
      />
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
  },
  webAdPlaceholder: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  adText: {
    color: '#9ca3af',
    fontSize: 12,
  },
});