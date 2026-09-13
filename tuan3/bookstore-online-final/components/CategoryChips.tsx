import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data';

export function CategoryChips() {
  return (
    <View style={styles.wrap}>
      {CATEGORIES.map((name) => (
        <View key={name} style={styles.chip}>
          <Text style={styles.chipText}>{name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  chipText: {
    color: '#4338CA',
    fontSize: 13,
    fontWeight: '600',
  },
});
