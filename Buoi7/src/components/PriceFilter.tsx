import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors } from "../theme";
interface Props { value: PriceRange; onChange: (v: PriceRange) => void; }
export function PriceFilter({ value, onChange }: Props) {
  return <View style={styles.row}>{PRICE_RANGES.map((r) => {
    const active = value === r.key;
    return <Pressable key={r.key} accessibilityRole="button" accessibilityState={{ selected: active }} style={[styles.btn, active && styles.active]} onPress={() => onChange(active ? null : r.key)}>
      <Text style={[styles.text, active && styles.activeText]}>{r.label}</Text>
    </Pressable>;
  })}</View>;
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 8 },
  btn: { borderWidth: 1, borderColor: colors.cyan, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  active: { backgroundColor: colors.cyan }, text: { color: colors.cyan, fontWeight: "700" }, activeText: { color: "#fff" },
});

