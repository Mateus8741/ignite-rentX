import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface ProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: ProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
