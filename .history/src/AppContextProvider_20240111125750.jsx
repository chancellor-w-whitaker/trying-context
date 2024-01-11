import { useState } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";

const useMyAppLogic = () => {
  const [fileName, setFileName] = useState(fileNames[0]);
  return {};
};

export const AppContextProvider = ({ children }) => {
  const value = useMyAppLogic();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
