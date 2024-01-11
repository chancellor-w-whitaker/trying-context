import { useSetAppContextValue } from "./useSetAppContextValue";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const value = useSetAppContextValue();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
