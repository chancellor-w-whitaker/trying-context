import { useState } from "react";

import { fileNames } from "../constants/fileNames";
import { useJSON } from "../hooks/useJSON";

export const Dashboard = () => {
  const [fileName, setFileName] = useState(fileNames[0]);

  const result = useJSON({ url: `data/fall.json` });

  console.log(result);

  return <></>;
};
