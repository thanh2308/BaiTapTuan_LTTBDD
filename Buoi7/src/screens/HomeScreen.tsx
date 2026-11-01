import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { Book, Category } from "../types";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);
  const debouncedKeyword = useDebounce(keyword, 400);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    return sort === null ? filtered : [...filtered].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);
  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null || sort !== null;
  const clearFilters = () => { setKeyword(""); setCategoryId(null); setPriceRange(null); setSort(null); };

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && <SearchBar value={keyword} onChangeText={setKeyword} onClose={() => { setSearchOpen(false); setKeyword(""); }} />}
      {loading ? <LoadingView label="Đang tải sách…" /> : error ? <ErrorView message={error} onRetry={load} /> : (
        <BookGrid data={visibleBooks} onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.sortRow}>
                {(["asc", "desc"] as const).map((value) => (
                  <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: sort === value }}
                    style={[styles.sortButton, sort === value && styles.sortActive]} onPress={() => setSort(sort === value ? null : value)}>
                    <Text style={{ color: sort === value ? "#fff" : colors.indigo }}>{value === "asc" ? "Giá tăng dần" : "Giá giảm dần"}</Text>
                  </Pressable>
                ))}
              </View>
              {hasFilter && <Pressable style={styles.clear} onPress={clearFilters}><Text style={{ color: colors.danger }}>✕ Xóa bộ lọc</Text></Pressable>}
            </View>
          }
          ListEmptyComponent={<EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp" message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc." actionLabel="Xóa bộ lọc" onAction={clearFilters} />}
        />
      )}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  sortRow: { flexDirection: "row", gap: 8, paddingHorizontal: 8, marginVertical: 6 },
  sortButton: { borderWidth: 1, borderColor: colors.indigo, borderRadius: 8, padding: 9 },
  sortActive: { backgroundColor: colors.indigo },
  clear: { alignSelf: "flex-start", backgroundColor: "#FEE2E2", borderRadius: 16, padding: 9, margin: 8 },
});

