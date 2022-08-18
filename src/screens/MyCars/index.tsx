import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";

import { useTheme } from "styled-components";

import { AntDesign } from "@expo/vector-icons";

import { api } from "@/services/api";

import { BackButton } from "@/components/BackButton";
import { CarDTO } from "@/dtos/CarDTO";
import { useNavigation } from "@react-navigation/native";

import { Car } from "@/components/Car";

import { Loading } from "@/components/Loading";

import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  Subtitle,
  Title,
} from "./styles";


interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>
        <Subtitle>Escolha uma data de início e fim do aluguel</Subtitle>
      </Header>

        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Perioso</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>

    </Container>
  );
}
