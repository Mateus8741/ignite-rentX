import React, { useState } from "react";

import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/PasswordInput";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import { useAuth } from "@/hooks/auth";

import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoCOntainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { Button } from "@/components/Button";

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  async function handleAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.cancelled) {
      return;
    }

    if (result["uri"]) {
      setAvatar(result["uri"]);
    }
  }

  async function handleUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH obrigatória"),
        name: Yup.string().required("Nome obrigatório"),
      });
      const data = {
        driverLicense,
        name,
      };
      await schema.validate(data);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });
      Alert.alert("Dados atualizados com sucesso!");
      Keyboard.dismiss();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
        Keyboard.dismiss();
      } else {
        Alert.alert("Erro ao atualizar perfil", error.message);
        Keyboard.dismiss();
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair, irá precisar de internet para fazer login.",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: async () => {},
        },
        {
          text: "Sair",
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  }

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOption(option: "dataEdit" | "passwordEdit") {
    setOption(option);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoCOntainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoCOntainer>
          </Header>
          <Content
            style={{
              marginBottom: useBottomTabBarHeight(),
            }}
          >
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOption("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOption("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
