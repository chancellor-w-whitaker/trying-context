import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const value = useAppProviderValue();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
