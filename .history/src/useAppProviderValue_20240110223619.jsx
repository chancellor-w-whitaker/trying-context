import { useState } from "react";

import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const useAppProvided = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const data = useJSON({ url: `data/${fileName}.json` });

  return { setFileName, fileName, data };
};
