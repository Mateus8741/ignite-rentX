import React from "react";
import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  justify-content: center;
  align-items: center;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.shape};
`;
