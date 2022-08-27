import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import { api } from "@/services/api";
import { CarDTO } from "@/dtos/CarDTO";

import { useNavigation } from "@react-navigation/native";

import { LoadAnimation } from "@/components/LoadAnimation";

import { RFValue } from "react-native-responsive-fontsize";

import { useNetInfo } from "@react-native-community/netinfo";

import { synchronize } from "@nozbe/watermelondb/sync";

import { Car as ModelCar } from "../../database/model/Car";

import { database } from "@/database";

import { Car } from "@/components/Car";

import Logo from "@assets/logo.svg";

import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<any>();
  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSync() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    offlineSync();
  }, [netInfo.isConnected === true]);

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
          {!isLoading && <TotalCars> Total de {cars.length} carros </TotalCars>}
        </HeaderContent>
      </Header>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadAnimation />
        </View>
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
