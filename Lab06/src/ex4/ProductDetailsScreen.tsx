import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { PHONES, PHONE_COLORS } from '../data/phones';
import { Page, Stars } from '../components/Common';
import { colors, formatPrice } from '../theme';
import { RootProps } from './types';
import { useFavorites } from './FavoritesContext';
export function ProductDetailsScreen({ route }: RootProps<'ProductDetails'>) {
 const { id } = route.params;
 const phone = PHONES.find(p => p.id === id);
 const { has,toggle } = useFavorites();
 if (!phone) return <Page><Text style={{ padding: 20 }}>Không tìm thấy sản phẩm #{id}</Text></Page>;
 return <Page><ScrollView contentContainerStyle={s.content}><Image source={PHONE_COLORS[phone.defaultColor].image} resizeMode="contain" style={s.image}/><Text style={s.title}>{phone.name}</Text><Stars value={phone.rating}/><Text style={s.price}>{formatPrice(phone.price)}</Text><Text>Cung cấp bởi <Text style={{ fontWeight: '700' }}>{phone.supplier}</Text></Text><Pressable accessibilityRole="button" accessibilityState={{ selected: has(id) }} style={s.button} onPress={() => toggle(id)}><Text style={s.white}>{has(id) ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}</Text></Pressable></ScrollView></Page>;
}
const s = StyleSheet.create({ content: { padding: 20, gap: 18 }, image: { width: '100%', height: 300 }, title: { fontWeight: '700', fontSize: 20 }, price: { color: colors.red, fontSize: 24, fontWeight: '700' }, button: { padding: 16, borderRadius: 6, backgroundColor: colors.red, alignItems: 'center' }, white: { color: '#fff', fontWeight: '700', fontSize: 16 } });
