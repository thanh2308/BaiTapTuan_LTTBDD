import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NotificationItem } from "../components/NotificationItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getNotifications, markAsRead } from "../services/notificationService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { AppNotification } from "../types";
import { colors } from "../theme";

export function NotificationsScreen({
  navigation,
}: RootScreenProps<"Notifications">) {
  const { user, isLoggedIn } = useAuth();
  const [data, setData] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const pending = useRef(new Set<number>());
  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    setActionError(null);
    try {
      setData(await getNotifications(user.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  useEffect(() => {
    void load();
  }, [load]);
  const open = (n: AppNotification) => {
    if (!n.read && !pending.current.has(n.id)) {
      pending.current.add(n.id);
      setActionError(null);
      setData((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)),
      );
      void markAsRead(n.id)
        .catch((e) => {
          setData((prev) =>
            prev.map((x) => (x.id === n.id ? { ...x, read: false } : x)),
          );
          setActionError(
            `Chưa lưu được trạng thái đã đọc. ${getErrorMessage(e)} Bấm thông báo để thử lại.`,
          );
        })
        .finally(() => pending.current.delete(n.id));
    }
    if (n.target?.screen === "Orders") navigation.navigate("Orders");
    else if (n.target?.screen === "BookDetail" && n.target.bookId)
      navigation.navigate("BookDetail", { bookId: n.target.bookId });
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
      {actionError ? (
        <Text
          accessibilityRole="alert"
          style={{ color: colors.danger, padding: 12 }}
        >
          {actionError}
        </Text>
      ) : null}
      <FlatList
        data={data}
        keyExtractor={(n) => String(n.id)}
        contentContainerStyle={{ padding: 12, gap: 8, flexGrow: 1 }}
        renderItem={({ item }) => (
          <NotificationItem item={item} onPress={open} />
        )}
        ListEmptyComponent={
          <EmptyState emoji="🔔" title="Chưa có thông báo nào" />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
