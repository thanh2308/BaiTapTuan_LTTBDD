import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { CartItem, Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
} as const;
const FILTERS: { value: "all" | OrderStatus; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã hủy" },
];
export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { reorder: mergeIntoCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [reordering, setReordering] = useState<number | null>(null);
  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setOrders([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders(
        [...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      );
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  useEffect(() => {
    void load();
  }, [load]);
  const filtered = useMemo(
    () => orders.filter((o) => status === "all" || o.status === status),
    [orders, status],
  );
  const reorder = async (order: Order) => {
    if (reordering !== null) return;
    setReordering(order.id);
    try {
      const books = await getBooks();
      const available: CartItem[] = [];
      for (const item of order.items) {
        const book = books.find((b) => b.id === item.bookId);
        if (!book || book.stock <= 0) continue;
        available.push({
          bookId: book.id,
          title: book.title,
          price: book.price,
          emoji: book.emoji,
          color: book.color,
          stock: book.stock,
          quantity: item.quantity,
        });
      }
      if (!available.length) {
        showMessage(
          "Chưa thể mua lại",
          "Các sách trong đơn hiện không còn hàng.",
        );
        return;
      }
      mergeIntoCart(available);
      showMessage(
        "Đã thêm vào giỏ",
        "Đã dùng giá và tồn kho hiện tại. Sách hết hàng được bỏ qua; số lượng được giới hạn theo tồn kho.",
        () => navigation.navigate("Tabs", { screen: "Cart" }),
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    } finally {
      setReordering(null);
    }
  };
  if (!isLoggedIn)
    return (
      <EmptyState
        emoji="🔒"
        title="Bạn cần đăng nhập"
        actionLabel="Đăng nhập"
        onAction={() => navigation.navigate("Login")}
      />
    );
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ padding: 12, gap: 8 }}
      >
        {FILTERS.map((f) => (
          <Pressable
            key={f.value}
            accessibilityRole="button"
            accessibilityLabel={`Lọc ${f.label}`}
            accessibilityState={{ selected: status === f.value }}
            onPress={() => {
              setStatus(f.value);
              setOpenId(null);
            }}
            style={[styles.chip, status === f.value && styles.activeChip]}
          >
            <Text
              style={{
                color: status === f.value ? "#fff" : colors.navy,
                fontWeight: "700",
              }}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🧾"
            title={
              orders.length
                ? "Không có đơn hàng ở trạng thái này"
                : "Bạn chưa có đơn hàng nào"
            }
            actionLabel="Mua sắm ngay"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
        renderItem={({ item: o }) => {
          const open = openId === o.id;
          return (
            <View style={styles.card}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Đơn #${o.id}`}
                accessibilityState={{ expanded: open }}
                onPress={() => setOpenId(open ? null : o.id)}
                style={styles.head}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.code}>Đơn #{o.id}</Text>
                  <Text style={styles.muted}>
                    {formatDateTime(o.createdAt)}
                  </Text>
                  <Text style={styles.total}>{formatPrice(o.total)}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 8 }}>
                  <StatusBadge status={o.status} />
                  <Text style={styles.toggle}>
                    {open ? "Thu gọn ▲" : "Chi tiết ▼"}
                  </Text>
                </View>
              </Pressable>
              {open && (
                <View style={styles.detail}>
                  {o.items.map((it) => (
                    <View key={it.bookId} style={styles.itemRow}>
                      <Text style={{ flex: 1, color: colors.text }}>
                        {it.title} × {it.quantity}
                      </Text>
                      <Text>{formatPrice(it.price * it.quantity)}</Text>
                    </View>
                  ))}
                  <View style={styles.address}>
                    <Text style={styles.code}>Giao đến</Text>
                    <Text>
                      {o.address.name} · {o.address.phone}
                    </Text>
                    <Text>{o.address.address}</Text>
                    <Text>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                  </View>
                  {o.status === "completed" && (
                    <PrimaryButton
                      title="Mua lại"
                      variant="outline"
                      onPress={() => reorder(o)}
                      loading={reordering === o.id}
                      disabled={reordering !== null}
                    />
                  )}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: "#fff",
    borderRadius: radius.md,
    overflow: "hidden",
  },
  head: { flexDirection: "row", padding: 14, gap: 12, alignItems: "center" },
  code: { fontWeight: "800", color: colors.navy },
  muted: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: "800", color: colors.indigo, fontSize: 17 },
  toggle: { color: colors.indigo, fontSize: 12 },
  detail: { padding: 14, paddingTop: 0, gap: 10 },
  itemRow: { flexDirection: "row", gap: 8 },
  address: {
    borderTopWidth: 1,
    borderColor: colors.line,
    paddingTop: 10,
    gap: 5,
  },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: "#E0E7FF",
  },
  activeChip: { backgroundColor: colors.indigo },
});
