import { useAppProviderValue } from "./useAppProviderValue";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const value = useAppProviderValue();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
