import React from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import theme from "@/global/styles/theme";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/PasswordInput";

import { Footer, Container, Header, Subtitle, Title, Form } from "./styles";

export function SigIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container>
          <Header>
            <Title>
              Estamos {"\n"}
              quase lá
            </Title>
            <Subtitle>
              Faça seu login para começar {"\n"}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={() => {}}
              enabled={false}
              isLoading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={() => {}}
              enabled={false}
              isLoading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
