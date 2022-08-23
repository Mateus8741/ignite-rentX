import React from "react";

import LottieView from "lottie-react-native";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={require("@assets/loadingCar.json")}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
