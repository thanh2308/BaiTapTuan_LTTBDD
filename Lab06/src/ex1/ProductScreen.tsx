import React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PHONE_COLORS } from '../data/phones';
import { Stars } from '../components/Common';
import { colors, formatPrice } from '../theme';
import { Phone } from '../types';
import { SelectPhoneParamList } from './SelectPhoneApp';
type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & { phone: Phone };
export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  return <SafeAreaView edges={['left','right','bottom']} style={s.root}>
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.imageWrap}><Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={s.image} resizeMode="contain" accessibilityLabel={`Điện thoại màu ${PHONE_COLORS[picked ?? phone.defaultColor].label}`}/></View>
      <View style={s.info}><Text style={s.name}>{phone.name}</Text><View style={s.row}><Stars value={phone.rating}/><Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text></View>
      <View style={s.row}><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text></View>
      <View style={s.row}><Text style={s.badge}>{phone.badge}</Text><Text style={s.question}>?</Text></View>
      <Pressable accessibilityRole="button" style={s.chooseBtn} onPress={() => navigation.navigate('ChooseColor', { color: picked })}><Text style={s.chooseText}>4 MÀU-CHỌN {picked ? 'LOẠI' : 'MÀU'}</Text><Text style={s.arrow}>›</Text></Pressable></View>
    </ScrollView>
    <Pressable accessibilityRole="button" style={s.buy} onPress={() => Alert.alert('CHỌN MUA', `${phone.name}\nMàu: ${PHONE_COLORS[picked ?? phone.defaultColor].label}\n${formatPrice(phone.price)}`)}><Text style={s.buyText}>CHỌN MUA</Text></Pressable>
  </SafeAreaView>;
}
const s = StyleSheet.create({
 root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 }, content: { flexGrow: 1, paddingBottom: 16 }, imageWrap: { flex: 1, minHeight: 260, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 }, image: { width: '100%', height: 310, maxHeight: 420 },
 info: { gap: 18, paddingBottom: 16 }, name: { fontSize: 16, color: colors.text }, row: { flexDirection: 'row', alignItems: 'center', gap: 16, flexWrap: 'wrap' }, review: { fontSize: 13 }, price: { fontSize: 21, fontWeight: '700' }, oldPrice: { color: colors.muted, textDecorationLine: 'line-through', fontWeight: '600' }, badge: { color: '#D00000', fontWeight: '700', fontSize: 12 }, question: { borderWidth: 1, borderRadius: 10, width: 20, height: 20, textAlign: 'center' }, chooseBtn: { minHeight: 40, borderColor: '#999', borderWidth: 1, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }, chooseText: { fontSize: 13 }, arrow: { position: 'absolute', right: 12, fontSize: 26 }, buy: { backgroundColor: '#F00000', borderRadius: 6, alignItems: 'center', padding: 14, marginBottom: 8 }, buyText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
