import React from "react";
import { ActivityIndicator } from "react-native";
import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress?: () => void;
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
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
      {isLoading ? <ActivityIndicator color="#FFF" /> : <Title>{title}</Title>}
    </Container>
  );
}
