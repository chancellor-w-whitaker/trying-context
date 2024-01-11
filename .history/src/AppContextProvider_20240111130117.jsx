import { useState } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideToApp();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useProvideToApp = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const data = useJSON({ url: `data/${fileName}.json` });

  return data;
};
