import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Volume2, VolumeX, History, Settings, Sparkles, Flame, Zap } from 'lucide-react-native';
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
  const intensityLevels: Array<{
    id: SassIntensity;
    label: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'MILD',
      label: 'Mild',
      icon: <Sparkles size={14} color={intensity === 'MILD' ? '#38bdf8' : '#64748b'} />,
      color: '#38bdf8',
    },
    {
      id: 'SPICY',
      label: 'Spicy',
      icon: <Flame size={14} color={intensity === 'SPICY' ? '#ec4899' : '#64748b'} />,
      color: '#ec4899',
    },
    {
      id: 'SAVAGE',
      label: 'Savage',
      icon: <Zap size={14} color={intensity === 'SAVAGE' ? '#f43f5e' : '#64748b'} />,
      color: '#f43f5e',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Intensity Selector Segmented Bar */}
      <View style={styles.intensityContainer}>
        <Text style={styles.sectionLabel}>SASS LEVEL</Text>
        <View style={styles.segmentedBar}>
          {intensityLevels.map((lvl) => {
            const isSelected = intensity === lvl.id;
            return (
              <TouchableOpacity
                key={lvl.id}
                style={[
                  styles.segmentButton,
                  isSelected && {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: lvl.color,
                  },
                ]}
                onPress={() => onSelectIntensity(lvl.id)}
                activeOpacity={0.7}
              >
                {lvl.icon}
                <Text
                  style={[
                    styles.segmentText,
                    isSelected ? { color: lvl.color, fontWeight: '700' } : { color: '#94a3b8' },
                  ]}
                >
                  {lvl.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Shake / Spin Main Trigger Button */}
      <TouchableOpacity
        style={[styles.shakeButton, isLoading && styles.shakeButtonDisabled]}
        onPress={onSimulateShake}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <Text style={styles.shakeButtonText}>
          {isLoading ? '🔮 DIVINING THE SASS...' : '✨ SHAKE OR SWIPE 8-BALL'}
        </Text>
      </TouchableOpacity>

      {/* Secondary Action Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolButton} onPress={onOpenHistory} activeOpacity={0.7}>
          <History size={18} color="#94a3b8" />
          <Text style={styles.toolText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} onPress={onToggleSound} activeOpacity={0.7}>
          {soundEnabled ? (
            <Volume2 size={18} color="#94a3b8" />
          ) : (
            <VolumeX size={18} color="#64748b" />
          )}
          <Text style={styles.toolText}>{soundEnabled ? 'Sound ON' : 'Muted'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} onPress={onOpenSettings} activeOpacity={0.7}>
          <Settings size={18} color="#94a3b8" />
          <Text style={styles.toolText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 16,
  },
  intensityContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#64748b',
    marginBottom: 8,
  },
  segmentedBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  shakeButton: {
    width: '100%',
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderWidth: 1.5,
    borderColor: '#ec4899',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  shakeButtonDisabled: {
    opacity: 0.6,
  },
  shakeButtonText: {
    color: '#fdf2f8',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 4,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  toolText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
});
