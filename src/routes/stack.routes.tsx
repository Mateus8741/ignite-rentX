import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "@/screens/Home";
import { Confirmation } from "@/screens/Confirmation";
import { CarDetails } from "@/screens/CarDetails";
import { Scheduling } from "@/screens/Scheduling";
import { SchedulingDetails } from "@/screens/SchedulingDetails";
import { MyCars } from "@/screens/MyCars";
import { Splash } from "@/screens/Splash";
import { SignIn } from "@/screens/SignIn";
import { FirstStep } from "@/screens/SigUp/FirstStep";
import { SecondStep } from "@/screens/SigUp/SecondStep";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstStep">
      <Screen name="Splash" component={Splash} />
      <Screen name="FirstStep" component={FirstStep} />
      <Screen name="SecondStep" component={SecondStep} />
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
