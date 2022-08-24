import React from "react";

import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
  light = false,
  ...rest
}: Props) {
  return (
    <Container
      color={color}
      {...rest}
      onPress={onPress}
      enabled={enabled}
      style={{
        opacity: !enabled ? 0.5 : 1,
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
