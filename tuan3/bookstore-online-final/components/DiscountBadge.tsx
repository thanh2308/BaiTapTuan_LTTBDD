import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function DiscountBadge({ discountPercent, isNew }: { discountPercent?: number; isNew?: boolean }) {
  if (!discountPercent && !isNew) return null;

  return (
    <View style={[styles.badge, isNew && styles.badgeNew]}>
      <Text style={styles.badgeText}>{isNew ? 'Mới' : `-${discountPercent}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeNew: {
    backgroundColor: '#F97316',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
