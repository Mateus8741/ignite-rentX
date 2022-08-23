import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar } from "react-native";

import { api } from "@/services/api";
import { CarDTO } from "@/dtos/CarDTO";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "@/components/Loading";
import { useTheme } from "styled-components";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "@/components/Car";

import Logo from "@assets/logo.svg";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from "./styles";
import { PanGestureHandler } from "react-native-gesture-handler";
import { LoadAnimation } from "@/components/LoadAnimation";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const MyCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive: (event, ctx: any) => {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd: (event) => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const navigation = useNavigation<any>();

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }),
    [];

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
          {!isLoading && (
            <TotalCars> Total de {cars.length} carros </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {isLoading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            MyCarsButtonStyle,
            {
              position: "absolute",
              bottom: 50,
              right: 2,
            },
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
