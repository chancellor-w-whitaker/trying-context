import { useContextProvidedToApp } from "./useContextProvidedToApp";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const value = useContextProvidedToApp();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
