import React, { useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';
import { PHONES } from './src/data/phones';
import { colors } from './src/theme';
const exercises = ['Select Phone', 'Gắn API', 'Bottom Tab Navigation', 'Stack + Tab + Passing Params', 'Drawer Navigation'];
export default function App() {
 const [exercise,setExercise] = useState<number | null>(null);
 const screens = [<SelectPhoneApp phone={PHONES[0]}/>, <SelectPhoneApi/>, <BottomTabApp/>, <StackTabApp/>, <DrawerApp/>];
 return <GestureHandlerRootView style={s.root}><SafeAreaProvider><StatusBar barStyle="dark-content"/><SafeAreaView style={s.root} edges={['top','left','right']}>
 {exercise === null ? <ScrollView contentContainerStyle={s.menu}><Text style={s.title}>Lab 06 — Navigation</Text><Text style={s.subtitle}>Huỳnh Hoài Thanh · 23633801</Text>{exercises.map((title,i) => <Pressable key={title} accessibilityRole="button" style={s.card} onPress={() => setExercise(i)}><Text style={s.number}>0{i+1}</Text><Text style={s.label}>Bài {i+1}: {title}</Text><Text style={s.chevron}>›</Text></Pressable>)}</ScrollView> : <><View style={s.bar}><Pressable accessibilityRole="button" accessibilityLabel="Về danh sách bài tập" onPress={() => setExercise(null)} style={s.back}><Text style={s.backText}>‹ Danh sách bài tập</Text></Pressable><Text style={s.current}>Bài {exercise+1}</Text></View><NavigationContainer key={exercise}>{screens[exercise]}</NavigationContainer></>}
 </SafeAreaView></SafeAreaProvider></GestureHandlerRootView>;
}
const s = StyleSheet.create({ root: { flex: 1, backgroundColor: '#fff' }, menu: { padding: 20, gap: 16 }, title: { fontSize: 28, fontWeight: '700', color: colors.navy, marginTop: 24 }, subtitle: { color: colors.muted, marginBottom: 16 }, card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 18 }, number: { fontSize: 20, color: colors.red, fontWeight: '700' }, label: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text }, chevron: { fontSize: 24, color: colors.muted }, bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.line }, back: { padding: 14 }, backText: { color: colors.blue, fontWeight: '600' }, current: { paddingRight: 16, color: colors.muted } });
