import { useDebounce } from "../hooks/useDebounce";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onRemove, onChangeQty }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);
  // Chỉ ghi khi giá trị đã lắng 300 ms; thay đổi từ store được đồng bộ riêng bên dưới.
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty]);
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);
  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text>Còn {item.stock}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Pressable
            accessibilityLabel="Giảm"
            disabled={qty <= 1}
            style={{ opacity: qty <= 1 ? 0.35 : 1, padding: 8 }}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Text>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable
            accessibilityLabel="Tăng"
            disabled={qty >= item.stock}
            style={{ opacity: qty >= item.stock ? 0.35 : 1, padding: 8 }}
            onPress={() => setQty((q) => Math.min(item.stock, q + 1))}
          >
            <Text>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => onRemove(item.bookId)}
        hitSlop={8}
        accessibilityLabel="Xóa khỏi giỏ"
      >
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 5,
    gap: 10,
  },
  cover: {
    width: 54,
    height: 72,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  trash: { fontSize: 22 },
});
