import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, TabParamList } from './types';
import { ProductsTab } from './ProductsTab';
import { FavoritesTab } from './FavoritesTab';
import { ProductDetailsScreen } from './ProductDetailsScreen';
import { FavoritesProvider } from './FavoritesContext';
import { colors } from '../theme';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
function HomeTabs() { return <Tab.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.red, tabBarIcon: ({ focused,color,size }) => <Ionicons name={route.name === 'Products' ? (focused ? 'bag' : 'bag-outline') : (focused ? 'heart' : 'heart-outline')} color={color} size={size}/> })}><Tab.Screen name="Products" component={ProductsTab} options={{ title: 'Products' }}/><Tab.Screen name="Favorites" component={FavoritesTab} options={{ title: 'Favorites' }}/></Tab.Navigator>; }
export function StackTabApp() { return <FavoritesProvider><Stack.Navigator><Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Cửa hàng' }}/><Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Chi tiết sản phẩm' }}/></Stack.Navigator></FavoritesProvider>; }
