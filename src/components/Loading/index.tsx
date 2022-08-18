import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

interface Props {
  color?: string;
}

export function Loading({ color }: Props) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      color={color ? color : theme.colors.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
}
