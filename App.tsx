import React from "react";

import { Routes } from "@/routes";

import { Text, View } from "react-native";

import { ThemeProvider } from "styled-components";

import theme from "@/global/styles/theme";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { AppProvider } from "@/hooks";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  // if (!fontsLoaded) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text
  //         style={{
  //           fontSize: 20,
  //           fontWeight: "bold",
  //           color: "red",
  //         }}
  //       >
  //         Loading...
  //       </Text>
  //     </View>
  //   );
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
