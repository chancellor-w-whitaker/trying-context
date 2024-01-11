import { useState } from "react";

import { useJSON } from "../hooks/useJSON";

export const Dashboard = () => {
  const [fileName, setFileName] = useState();

  const result = useJSON({ url: `data/fall.json` });

  console.log(result);

  return <></>;
};
