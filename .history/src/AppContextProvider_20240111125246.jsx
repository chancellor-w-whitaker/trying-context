import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const value = useMyGlobalAppLogic();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useMyGlobalAppLogic = () => {
  return {};
};
