import React, { useState } from "react";

import { BackButton } from "@/components/BackButton";
import { useTheme } from "styled-components";
import { Alert, StatusBar } from "react-native";
import { Button } from "@/components/Button";
import {
  Calendar,
  CalendarProps,
  DayProps,
  generateInterval,
} from "@/components/Calendar";

import { useNavigation, useRoute } from "@react-navigation/native";

import ArrowSvg from "@assets/arrow.svg";

import { format } from "date-fns/esm";
import { getPlataformDate } from "@/utils/getPlataformDate";
import { CarDTO } from "@/dtos/CarDTO";

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

interface RentalPreiod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [selectedDate, setSelectedDate] = useState<DayProps>({} as DayProps);
  const [markDates, setMarkDates] = useState<CalendarProps | any>(
    {} as CalendarProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPreiod>(
    {} as RentalPreiod
  );

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleSchedulingDetails() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione um período para alugar");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markDates),
      });
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !selectedDate.timestamp ? date : selectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlataformDate(new Date(lastDate)), "dd/MM/yyyy"),
    });
  }

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
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!selectedDate.timestamp}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!selectedDate.timestamp}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} />
      </Footer>
    </Container>
  );
}
