import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { X, Key, Server, RefreshCw, Check, Database } from 'lucide-react-native';
import { getApiBaseUrl, setApiBaseUrl, DEFAULT_API_URL } from '../services/api';

interface SettingsModalProps {
  visible: boolean;
  seed: string;
  totalDraws: number;
  onClose: () => void;
  onRegenerateSeed: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  seed,
  totalDraws,
  onClose,
  onRegenerateSeed,
}) => {
  const [apiUrl, setApiUrl] = useState<string>(DEFAULT_API_URL);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    getApiBaseUrl().then((url) => setApiUrl(url));
  }, [visible]);

  const handleSaveApiUrl = async () => {
    await setApiBaseUrl(apiUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleConfirmRegenerate = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to regenerate your special user seed?')) {
        onRegenerateSeed();
      }
    } else {
      Alert.alert(
        'Regenerate User Seed?',
        'This will replace your unique random installation seed with a brand new cryptographic seed.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Regenerate', style: 'destructive', onPress: onRegenerateSeed },
        ]
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>App & Seeding Settings</Text>
            <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
              <X size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
            {/* User Seed Info */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Key size={16} color="#ec4899" />
                <Text style={styles.sectionTitle}>Unique Installation Seed</Text>
              </View>
              <Text style={styles.sectionDesc}>
                Each installation receives a unique cryptographic seed that personalizes your randomized fortune stream.
              </Text>
              <View style={styles.seedBox}>
                <Text style={styles.seedText} selectable={true}>
                  {seed || 'Generating...'}
                </Text>
              </View>
              <View style={styles.seedStats}>
                <Text style={styles.statLabel}>Lifetime Fortunes Drawn: <Text style={styles.statValue}>{totalDraws}</Text></Text>
                <TouchableOpacity onPress={handleConfirmRegenerate} style={styles.regenerateBtn}>
                  <RefreshCw size={13} color="#f43f5e" />
                  <Text style={styles.regenerateText}>New Seed</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Vercel API Connection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Server size={16} color="#8b5cf6" />
                <Text style={styles.sectionTitle}>Vercel API & PostgreSQL</Text>
              </View>
              <Text style={styles.sectionDesc}>
                Set your deployed Vercel backend URL to sync directly with your PostgreSQL database.
              </Text>
              <TextInput
                style={styles.input}
                value={apiUrl}
                onChangeText={setApiUrl}
                placeholder="https://your-sassy-8ball.vercel.app"
                placeholderTextColor="#64748b"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={handleSaveApiUrl} style={styles.saveBtn}>
                {savedSuccess ? (
                  <>
                    <Check size={16} color="#fff" />
                    <Text style={styles.saveBtnText}>Saved!</Text>
                  </>
                ) : (
                  <Text style={styles.saveBtnText}>Save API Endpoint</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Cross-Platform Details */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Database size={16} color="#06b6d4" />
                <Text style={styles.sectionTitle}>Platform Information</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Platform:</Text>
                <Text style={styles.infoVal}>{Platform.OS.toUpperCase()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Motion Sensor:</Text>
                <Text style={styles.infoVal}>Accelerometer (Shake + Gyro)</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Offline Mode:</Text>
                <Text style={styles.infoVal}>Enabled (Local fallback)</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#12141f',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
    gap: 24,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f8fafc',
  },
  sectionDesc: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
    marginBottom: 12,
  },
  seedBox: {
    backgroundColor: '#090a0f',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
    marginBottom: 10,
  },
  seedText: {
    color: '#f472b6',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 13,
    fontWeight: '600',
  },
  seedStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  statValue: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  regenerateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  regenerateText: {
    fontSize: 11,
    color: '#f43f5e',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#090a0f',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: 13,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  infoKey: {
    fontSize: 12,
    color: '#64748b',
  },
  infoVal: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: '600',
  },
});
