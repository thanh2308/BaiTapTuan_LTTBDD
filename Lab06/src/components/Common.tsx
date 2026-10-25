import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Phone } from '../types';
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const n = Math.max(0, Math.min(5, Math.round(value)));
  return <Text accessibilityLabel={`${n} trên 5 sao`} style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>{'★'.repeat(n)}<Text style={{ color: colors.line }}>{'★'.repeat(5-n)}</Text></Text>;
}
export function Loading() { return <View style={s.center}><ActivityIndicator size="large" color={colors.blue}/><Text>Đang tải...</Text></View>; }
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <View style={s.center}><Text accessibilityRole="alert" style={s.error}>{message}</Text><Pressable accessibilityRole="button" onPress={onRetry} style={s.button}><Text style={s.white}>THỬ LẠI</Text></Pressable></View>;
}
export function Profile() { return <View style={s.center}><View style={s.avatar}><Text style={s.initials}>HT</Text></View><Text style={s.name}>Huỳnh Hoài Thanh</Text><Text style={s.muted}>thanh.huynh@example.com</Text></View>; }
export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={phone.name} style={s.card} onPress={onPress}><Image source={PHONE_COLORS[phone.defaultColor].image} style={s.thumb} resizeMode="contain"/><View style={{ flex: 1, gap: 8 }}><Text style={s.rowTitle}>{phone.name.split(' - ')[0]}</Text><Text style={s.price}>{formatPrice(phone.price)}</Text></View><Text>›</Text></Pressable>;
}
export function Page({ children }: { children: React.ReactNode }) { return <SafeAreaView edges={['left','right','bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>{children}</SafeAreaView>; }
const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  button: { backgroundColor: colors.blue, padding: 14, borderRadius: 6 }, white: { color: '#fff', fontWeight: '700' },
  error: { color: colors.red, textAlign: 'center' }, avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontSize: 30, fontWeight: '700' }, name: { fontSize: 24, fontWeight: '700', color: colors.text }, muted: { color: colors.muted },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  thumb: { width: 64, height: 80 }, rowTitle: { color: colors.text, fontWeight: '600', fontSize: 16 }, price: { fontWeight: '700', color: colors.red },
});
