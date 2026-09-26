// TUAN4 — Project hoàn chỉnh: Gộp Giờ 4 + Giờ 5
// Bao gồm đầy đủ:
//  - Giờ 4 Bài 1: HomeScreen (Header cố định + ScrollView Chips+Grid + FloatingCartButton)
//  - Giờ 4 Bài 2: BookDetailScreen (ảnh + mô tả cuộn + thanh "Thêm vào giỏ" cố định dưới)
//  - Giờ 5 Bài 1: TabBar dưới cùng cố định (4 tab: Trang chủ, Danh mục, Giỏ hàng, Tài khoản)
//  - Giờ 5 Bài 2: CartScreen (danh sách cuộn + tổng tiền cố định + nút Thanh toán)
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';

// Components
import { TabBar, TabKey } from './components/TabBar';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';

// Data
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  // --- state điều hướng ---
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(CART_ITEMS.length);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Khi nhấn "Thêm vào giỏ" trong BookDetailScreen
  function handleAddToCart() {
    setCartCount((n) => n + 1);
    setSelectedBookId(null); // quay về HomeScreen sau khi thêm
  }

  // Khi nhấn nút FloatingCartButton trên HomeScreen -> chuyển sang tab Giỏ hàng
  function handlePressCart() {
    setActiveTab('cart');
  }

  // Render nội dung chính tùy theo tab + trạng thái xem chi tiết
  function renderBody() {
    // Ưu tiên màn chi tiết sách (phủ lên trên tab home)
    if (selectedBook) {
      return (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={handleAddToCart}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={handlePressCart}
          />
        );
      case 'category':
        // Giờ 2: CategoryChips (flexWrap) + BookGrid 2 cột — dùng lại component sẵn có
        return (
          <ScrollView
            style={styles.tabScroll}
            contentContainerStyle={styles.tabContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Danh mục</Text>
            <CategoryChips />
            <Text style={styles.sectionTitle}>Tất cả sách</Text>
            <BookGrid books={BOOKS} onPressBook={(id) => setSelectedBookId(id)} />
          </ScrollView>
        );

      case 'cart':
        return <CartScreen items={CART_ITEMS} />;
      case 'account':
        // "Tài liệu gốc không mô tả tab này, để trống."
        return <Placeholder tab={activeTab} />;
      default:
        return <Placeholder tab={activeTab} />;
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar absolute bên dưới */}
      <View style={styles.body}>
        {renderBody()}

        {/* TabBar hiển thị mọi lúc, trừ khi đang xem chi tiết sách */}
        {!selectedBook && (
          <TabBar active={activeTab} onChange={setActiveTab} />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Giữ nguyên từ bookstore-online-gio5 — câu chú thích gốc của từng tab
function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: 'Nội dung tab "Trang chủ" thuộc Giờ 4 — xem project bookstore-online-gio4.',
    category: 'Nội dung tab "Danh mục" bookstore-online-gio2 — xem project bookstore-online-gio2.',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
  // Tab Danh mục
  tabScroll: { flex: 1 },
  tabContent: { padding: 16, paddingBottom: 80 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10, marginTop: 16 },
});
