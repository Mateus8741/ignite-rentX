import React from "react";
import { StatusBar } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "@/components/Car";

import Logo from "@assets/logo.svg";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation<any>();
  const carData = {
    brand: "Audi",
    name: " RS3",
    rent: {
      period: "Ao dia",
      price: 200,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };

  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
