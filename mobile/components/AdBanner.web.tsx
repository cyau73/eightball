import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AdBanner = () => {
    return (
        <View style={styles.webAdPlaceholder}>
            <Text style={styles.adText}>[Ad Banner Placeholder - Web]</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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