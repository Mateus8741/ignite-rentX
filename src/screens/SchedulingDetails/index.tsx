import React, { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import { BackButton } from "@/components/BackButton";
import { ImageSlider } from "@/components/ImageSlider";
import { Accessory } from "@/components/Accessory";
import { Button } from "@/components/Button";

import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "@/dtos/CarDTO";

import { getAccessoryIcon } from "@/utils/getAccessoryIcon";

import { format } from "date-fns";
import { getPlataformDate } from "@/utils/getPlataformDate";
import { api } from "@/services/api";
import { Alert } from "react-native";

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

interface Params {
  car: CarDTO;
  dates: string[];
}

interface Period {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState<Period>({} as Period);

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length) * car.rent.price;

  async function handleConfirmRental() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    setIsLoading(true);

    await api.post("/schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreen: "Home",
          title: "Carro alugado!",
          message: `Agora você só precis ir\naté uma concessionária RENTX\ne pegar seu automóvel.`,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setDate({
      start: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrls={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
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
            <DateValue>{date.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{date.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length}`} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
}
