import { startTransition, useCallback, useState } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useProvideGlobally = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const data = useJSON(`data/${fileName}.json`);

  return { onFileChange, fileName, data };
};
