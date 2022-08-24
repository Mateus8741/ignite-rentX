import React, { useState } from "react";

import { useTheme } from "styled-components";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { BackButton } from "@/components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Bullet } from "@/components/Bullet";
import { Button } from "@/components/Button";
import { PasswordInput } from "@/components/PasswordInput";

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    cnh: string;
  };
}

export function SecondStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Erro", "Preencha todos os campos");
    } else if (password !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem");
    }

    navigation.navigate("Confirmation", {
      nextScreen: "SignIn",
      title: "Cadastro concluído",
      message: `Agora é só fazer login\ne aproveitar`,
    });
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
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {"\n"}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              placeholder="Digite sua senha"
              iconName="lock"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              placeholder="Repetir senha"
              iconName="lock"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>
          <Button
            title="Próximo"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
