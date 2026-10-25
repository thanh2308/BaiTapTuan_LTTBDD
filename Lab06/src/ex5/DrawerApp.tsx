import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Page, Profile } from '../components/Common';
import { colors } from '../theme';
type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();
function HomeScreen() { return <Page><View style={s.center}><Text style={s.big}>Xin chào 👋</Text></View></Page>; }
function SettingsScreen() {
 const [notify,setNotify] = useState(true);
 const [dark,setDark] = useState(false);
 return <Page><View style={s.settings}><View style={s.row}><Text>Nhận thông báo</Text><Switch accessibilityLabel="Nhận thông báo" value={notify} onValueChange={setNotify}/></View><View style={s.row}><Text>Giao diện tối</Text><Switch accessibilityLabel="Giao diện tối" value={dark} onValueChange={setDark}/></View><Text style={s.status}>Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện: {dark ? 'tối' : 'sáng'}</Text></View></Page>;
}
const icons = { Home: 'home-outline', Profile: 'person-outline', Settings: 'settings-outline' } as const;
export function DrawerApp() { return <Drawer.Navigator screenOptions={({ route }) => ({ drawerActiveTintColor: colors.red, drawerIcon: ({ color,size }) => <Ionicons name={icons[route.name]} color={color} size={size}/> })}><Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }}/><Drawer.Screen name="Profile" component={Profile} options={{ title: 'Cá nhân' }}/><Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }}/></Drawer.Navigator>; }
const s = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' }, big: { fontSize: 26, fontWeight: '700' }, settings: { padding: 20, gap: 16 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderRadius: 8 }, status: { color: colors.muted, lineHeight: 24 } });
