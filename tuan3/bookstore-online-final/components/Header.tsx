import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>📚 BookStore</Text>
      <View style={styles.iconGroup}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#1E1B4B',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 14,
  },
  icon: {
    fontSize: 18,
  },
});
