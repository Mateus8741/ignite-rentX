import React from "react";

import { BackButton } from "@/components/BackButton";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";

import { useNavigation } from "@react-navigation/native";

import ArrowSvg from "@assets/arrow.svg";

import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from "./styles";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  function handleSchedulingDetails() {
    navigation.navigate("SchedulingDetails");
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton color={theme.colors.shape} onPress={() => {}} />
        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue />
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue />
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} />
      </Footer>
    </Container>
  );
}
