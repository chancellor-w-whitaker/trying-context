import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const value = useAppContextProviderValue();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContextProviderValue = () => {
  return {};
};
