import { AppContext } from "./AppContext";

const useMyGlobalAppLogic = () => {
  return {};
};

export const AppContextProvider = ({ children }) => {
  const value = useMyGlobalAppLogic();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
