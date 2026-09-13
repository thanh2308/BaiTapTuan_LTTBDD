import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

const COVER_WIDTH = 80;
const COVER_HEIGHT = 110;

export function BookRowCard({ book }: { book: Book }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <View style={styles.info}>
        <View>
          <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  cover: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#EEF2F7',
  },
  info: {
    flex: 1,
    height: COVER_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  author: {
    fontSize: 12,
    color: '#5B6B7F',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
  },
});
