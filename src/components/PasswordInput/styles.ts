import React from "react";
import styled, { css } from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;

  border-bottom-width: 1px;
  border-bottom-color: transparent;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
