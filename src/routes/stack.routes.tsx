import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "@/screens/Home";
import { SchedulingComplete } from "@/screens/SchedulingComplete";
import { CarDetails } from "@/screens/CarDetails";
import { Scheduling } from "@/screens/Scheduling";
import { SchedulingDetails } from "@/screens/SchedulingDetails";
import { MyCars } from "@/screens/MyCars";
import { Splash } from "@/screens/Splash";
import { SigIn } from "@/screens/SigIn";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SigIn">
      <Screen name="Splash" component={Splash} />
      <Screen name="SigIn" component={SigIn} />
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
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
