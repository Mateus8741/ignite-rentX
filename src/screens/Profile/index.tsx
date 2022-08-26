import React from "react";

import { BackButton } from "@/components/BackButton";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoCOntainer,
  Photo,
  PhotoButton,
} from "./styles";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSinOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSinOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoCOntainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/62652109?v=4",
            }}
          />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoCOntainer>
      </Header>
    </Container>
  );
}
