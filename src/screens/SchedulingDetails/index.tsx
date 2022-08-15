import React from "react";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import { BackButton } from "@/components/BackButton";
import { ImageSlider } from "@/components/ImageSlider";
import { Accessory } from "@/components/Accessory";
import { Button } from "@/components/Button";

import { RFValue } from "react-native-responsive-fontsize";

import SpeedSvg from "@assets/speed.svg";
import AccelerationSvg from "@assets/acceleration.svg";
import ForceSvg from "@assets/force.svg";
import GasolineSvg from "@assets/gasoline.svg";
import ExchangeSvg from "@assets/exchange.svg";
import PeopleSvg from "@assets/people.svg";

import {
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Header,
  Name,
  Period,
  Price,
  Rent,
  Accessories,
  Footer,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceTotal,
  RentalPriceQuota,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  function handleConfirmRental() {
    navigation.navigate("SchedulingComplete");
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={[
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 60.000</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={SpeedSvg} name="Velocidade" />
          <Accessory icon={AccelerationSvg} name="Aceleração" />
          <Accessory icon={ForceSvg} name="Força" />
          <Accessory icon={GasolineSvg} name="Combustível" />
          <Accessory icon={ExchangeSvg} name="Auto" />
          <Accessory icon={PeopleSvg} name="2 Pessoas" />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>DATA</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>DATA</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>R$ 60.000</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 60.000</RentalPriceQuota>
            <RentalPriceTotal>R$ 60.000</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
