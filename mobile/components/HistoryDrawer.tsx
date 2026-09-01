import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { X, Trash2, Clock } from 'lucide-react-native';
import { FortuneHistoryItem } from '../types';

interface HistoryDrawerProps {
  visible: boolean;
  history: FortuneHistoryItem[];
  onClose: () => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  visible,
  history,
  onClose,
  onClearHistory,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Clock size={18} color="#ec4899" />
              <Text style={styles.headerTitle}>Sassy Archive ({history.length})</Text>
            </View>
            <View style={styles.headerActions}>
              {history.length > 0 && (
                <TouchableOpacity onPress={onClearHistory} style={styles.iconBtn}>
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
                <X size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* List */}
          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No sassy fortunes recorded yet.</Text>
              <Text style={styles.emptySubtext}>Shake or swipe the 8-ball to begin!</Text>
            </View>
          ) : (
            <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
              {history.map((item, index) => {
                const date = new Date(item.timestamp);
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <View key={item.id || index} style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View
                        style={[
                          styles.badge,
                          {
                            backgroundColor:
                              item.intensity === 'SAVAGE'
                                ? 'rgba(244, 63, 94, 0.15)'
                                : item.intensity === 'SPICY'
                                ? 'rgba(236, 72, 153, 0.15)'
                                : 'rgba(56, 189, 248, 0.15)',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.badgeText,
                            {
                              color:
                                item.intensity === 'SAVAGE'
                                  ? '#f43f5e'
                                  : item.intensity === 'SPICY'
                                  ? '#ec4899'
                                  : '#38bdf8',
                            },
                          ]}
                        >
                          {item.intensity}
                        </Text>
                      </View>
                      <Text style={styles.timestamp}>{timeStr}</Text>
                    </View>
                    <Text style={styles.cardText}>"{item.fortune}"</Text>
                  </View>
                );
              })}
            </ScrollView>
          )}
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
    maxHeight: '80%',
    minHeight: '45%',
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 13,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 11,
    color: '#64748b',
  },
  cardText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
    fontWeight: '500',
  },
});
