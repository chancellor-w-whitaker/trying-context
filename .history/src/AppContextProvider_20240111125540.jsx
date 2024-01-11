import { AppContext } from "./contexts/AppContext";

const useMyGlobalAppLogic = () => {
  return {};
};

export const AppContextProvider = ({ children }) => {
  const value = useMyGlobalAppLogic();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
