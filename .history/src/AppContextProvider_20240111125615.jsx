import { AppContext } from "./contexts/AppContext";

const useMyAppLogic = () => {
  return {};
};

export const AppContextProvider = ({ children }) => {
  const value = useMyAppLogic();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
