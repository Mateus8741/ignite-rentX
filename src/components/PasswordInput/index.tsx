import React, { useState } from "react";

import { useTheme } from "styled-components";

import { Feather } from "@expo/vector-icons";

import { RectButton } from "react-native-gesture-handler";

import { TextInputProps } from "react-native";

import { Container, IconContainer, InputText } from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  function handleVisibility() {
    setShowPassword(!showPassword);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer
        isFocused={isFocused}
      >
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        isFocused={isFocused}
        secureTextEntry={!showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <RectButton onPress={handleVisibility}>
        <IconContainer>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </RectButton>
    </Container>
  );
}
