import React from 'react';
import { FlatList } from 'react-native';
import { PHONES } from '../data/phones';
import { Page, ProductRow } from '../components/Common';
import { TabProps } from './types';
export function ProductsTab({ navigation }: TabProps<'Products'>) { return <Page><FlatList data={PHONES} keyExtractor={p => p.id} contentContainerStyle={{ padding: 16, gap: 12 }} renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })}/>}/></Page>; }
