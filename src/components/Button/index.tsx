import React from "react";
import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress?: () => void;
}

export function Button({ title, color, onPress, ...rest }: Props) {
  return (
    <Container color={color} {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
