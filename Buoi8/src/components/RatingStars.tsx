import React from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";
interface Props {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
}
export function RatingStars({ value, size = 18, onChange }: Props) {
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text
            key={n}
            style={{
              fontSize: size,
              color: n <= Math.round(value) ? colors.warning : colors.line,
            }}
          >
            ★
          </Text>
        );
        return onChange ? (
          <Pressable
            key={n}
            accessibilityLabel={`${n} sao`}
            accessibilityRole="button"
            onPress={() => onChange(n)}
            hitSlop={4}
          >
            {star}
          </Pressable>
        ) : (
          star
        );
      })}
    </View>
  );
}
