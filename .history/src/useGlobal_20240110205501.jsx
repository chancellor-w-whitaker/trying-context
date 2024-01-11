import { useState } from "react";

import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const useGlobal = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const data = useJSON({ url: `data/fall.json` });

  return { setFileName, fileName, data };

  console.log(data);
};
