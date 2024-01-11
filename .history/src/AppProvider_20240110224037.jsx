import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const value = useAppProviderValue();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
