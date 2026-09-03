// components/ConnectionLight.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ConnectionLightProps {
    isOnline: boolean;
}

export const ConnectionLight: React.FC<ConnectionLightProps> = ({ isOnline }) => {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.light,
                    { backgroundColor: isOnline ? '#22c55e' : '#f97316' }, // Green vs Orange
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 8,
        zIndex: 50,
    },
    light: {
        width: 8,
        height: 8,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
});