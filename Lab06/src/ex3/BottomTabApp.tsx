import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../data/phones';
import { Page, Profile } from '../components/Common';
import { colors } from '../theme';
type Tabs = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<Tabs>();
const ICONS: Record<keyof Tabs, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = { Home: ['home','home-outline'], Search: ['search','search-outline'], Profile: ['person','person-outline'] };
function HomeTab() { return <Page><FlatList data={PHONES} keyExtractor={p => p.id} contentContainerStyle={s.list} renderItem={({ item }) => <View style={s.card}><Text>{item.name.split(' - ')[0]}</Text></View>}/></Page>; }
function SearchTab() {
 const [keyword,setKeyword] = useState('');
 const filtered = PHONES.filter(p => p.name.toLowerCase().includes(keyword.trim().toLowerCase()));
 return <Page><TextInput accessibilityLabel="Nhập từ khóa" placeholder="Nhập từ khóa" value={keyword} onChangeText={setKeyword} style={s.input}/><FlatList data={filtered} keyExtractor={p => p.id} contentContainerStyle={s.list} ListEmptyComponent={<Text>Không có kết quả cho “{keyword}”</Text>} renderItem={({ item }) => <View style={s.card}><Text>{item.name.split(' - ')[0]}</Text></View>}/></Page>;
}
export function BottomTabApp() { return <Tab.Navigator screenOptions={({ route }) => ({ tabBarActiveTintColor: colors.red, tabBarIcon: ({ focused,color,size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} color={color} size={size}/> })}><Tab.Screen name="Home" component={HomeTab} options={{ title: 'Trang chủ' }}/><Tab.Screen name="Search" component={SearchTab} options={{ title: 'Tìm kiếm' }}/><Tab.Screen name="Profile" component={Profile} options={{ title: 'Cá nhân' }}/></Tab.Navigator>; }
const s = StyleSheet.create({ list: { padding: 16, gap: 10 }, card: { padding: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 8 }, input: { margin: 16, marginBottom: 0, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 14, backgroundColor: '#fff', fontSize: 16 } });
