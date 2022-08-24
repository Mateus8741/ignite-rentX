import React from "react";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import * as Yup from "yup";

import { BackButton } from "@/components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Bullet } from "@/components/Bullet";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";

export function FirstStep() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [driver_license, setDriver_license] = React.useState("");

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNext() {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.string().required("CNH é obrigatório"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });
      const data = {
        name,
        email,
        driver_license,
      };
      await schema.validate(data);
      navigation.navigate("SecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Erro", error.message);
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCorrect={false}
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={setDriver_license}
              value={driver_license}
            />
          </Form>
          <Button title="Próximo" onPress={handleNext} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
