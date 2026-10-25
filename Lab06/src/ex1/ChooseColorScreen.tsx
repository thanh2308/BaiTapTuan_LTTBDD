import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ColorKey, Phone } from '../types';
import { COLOR_ORDER, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { SelectPhoneParamList } from './SelectPhoneApp';
type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };
export function ChooseColorScreen({ navigation, route, phone }: Props) {
 const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
 const [line1, ...rest] = phone.name.split(' - ');
 return <SafeAreaView edges={['left','right','bottom']} style={s.root}><View style={s.header}><Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={s.thumb} resizeMode="contain"/><View style={s.headerText}><Text>{line1}</Text><Text>{rest.join(' - ')}</Text>{picked && <><Text>Màu: <Text style={s.bold}>{PHONE_COLORS[picked].label}</Text></Text><Text>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text><Text style={s.bold}>{formatPrice(phone.price)}</Text></>}</View></View>
 <View style={s.body}><Text style={s.hint}>Chọn một màu bên dưới:</Text><ScrollView contentContainerStyle={s.swatches}>{COLOR_ORDER.map(key => <Pressable key={key} accessibilityRole="radio" accessibilityLabel={`Màu ${PHONE_COLORS[key].label}`} accessibilityState={{ checked: picked === key }} onPress={() => setPicked(key)} style={[s.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && s.selected]}/>)}</ScrollView><Pressable accessibilityRole="button" style={s.done} onPress={() => navigation.popTo('Product', { color: picked })}><Text style={s.white}>XONG</Text></Pressable></View></SafeAreaView>;
}
const s = StyleSheet.create({ root: { flex: 1, backgroundColor: '#fff' }, header: { flexDirection: 'row', padding: 12, gap: 16, minHeight: 150 }, thumb: { width: 92, height: 125 }, headerText: { flex: 1, gap: 8 }, bold: { fontWeight: '700' }, body: { flex: 1, backgroundColor: colors.grey, padding: 12 }, hint: { fontSize: 16, marginBottom: 12 }, swatches: { alignItems: 'center', gap: 10, flexGrow: 1, paddingBottom: 20 }, swatch: { width: 76, height: 76, borderWidth: 3, borderColor: 'transparent' }, selected: { borderColor: '#333' }, done: { backgroundColor: colors.blue, borderRadius: 4, padding: 12, alignItems: 'center', marginBottom: 4 }, white: { color: '#fff', fontWeight: '700', fontSize: 16 } });
