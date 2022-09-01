import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppStackRoutes } from "./app.stack.routes";
import { useAuth } from "@/hooks/auth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";
import { LoadAnimation } from "@/components/LoadAnimation";
import { View } from "react-native";

export function Routes() {
  const { user, loading } = useAuth();
  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadAnimation />
    </View>
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
