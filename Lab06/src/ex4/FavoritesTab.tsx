import React from 'react';
import { FlatList, Text } from 'react-native';
import { PHONES } from '../data/phones';
import { Page, ProductRow } from '../components/Common';
import { useFavorites } from './FavoritesContext';
import { TabProps } from './types';
export function FavoritesTab({ navigation }: TabProps<'Favorites'>) {
 const { ids } = useFavorites();
 return <Page><FlatList data={PHONES.filter(p => ids.includes(p.id))} keyExtractor={p => p.id} contentContainerStyle={{ padding: 16, gap: 12 }} ListEmptyComponent={<Text>Chưa có sản phẩm nào được lưu.</Text>} renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}/>}/></Page>;
}
