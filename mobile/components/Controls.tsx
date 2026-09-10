import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SassIntensity } from '../types';

interface ControlsProps {
  intensity: SassIntensity;
  onSelectIntensity: (level: SassIntensity) => void;
  onSimulateShake: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  intensity,
  onSelectIntensity,
  onSimulateShake,
  onOpenHistory,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      {/* Compact Shake / Swipe Trigger Button */}
      <TouchableOpacity
        style={[styles.shakeButton, isLoading && styles.disabledButton]}
        onPress={onSimulateShake}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.shakeButtonText}>✨ SHAKE OR SWIPE EIGHTBALL</Text>
        )}
      </TouchableOpacity>

      {/* Compact Inline Sass Selector */}
      <View style={styles.sassRow}>
        {(['MILD', 'SPICY', 'SAVAGE'] as SassIntensity[]).map((level) => {
          const isActive = intensity === level;
          return (
            <TouchableOpacity
              key={level}
              style={[styles.sassChip, isActive && styles.sassChipActive]}
              onPress={() => onSelectIntensity(level)}
            >
              <Text style={[styles.sassChipText, isActive && styles.sassChipTextActive]}>
                {level === 'MILD' ? '✨ Mild' : level === 'SPICY' ? '🌶️ Spicy' : '⚡ Savage'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Compact Secondary Controls Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={onOpenHistory}>
          <Ionicons name="time-outline" size={16} color="#cbd5e1" />
          <Text style={styles.iconBtnText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onToggleSound}>
          <Ionicons name={soundEnabled ? 'volume-high-outline' : 'volume-mute-outline'} size={16} color="#cbd5e1" />
          <Text style={styles.iconBtnText}>{soundEnabled ? 'Sound ON' : 'Muted'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onOpenSettings}>
          <Ionicons name="settings-outline" size={16} color="#cbd5e1" />
          <Text style={styles.iconBtnText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8, // Reduced spacing between vertical elements
  },
  shakeButton: {
    width: '100%',
    paddingVertical: 10, // Compact height
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderWidth: 1,
    borderColor: '#ec4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  shakeButtonText: {
    color: '#f8fafc',
    fontSize: 13, // Smaller text size
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sassRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    padding: 3,
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  sassChip: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 9,
  },
  sassChipActive: {
    backgroundColor: '#8b5cf6',
  },
  sassChipText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  sassChipTextActive: {
    color: '#ffffff',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBtnText: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '600',
  },
});