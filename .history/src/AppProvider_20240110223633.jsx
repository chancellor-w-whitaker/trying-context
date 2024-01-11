import { useAppProvided } from "./useAppProvided";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const provided = useAppProvided();

  return <AppContext.Provider value={provided}>{children}</AppContext.Provider>;
};
