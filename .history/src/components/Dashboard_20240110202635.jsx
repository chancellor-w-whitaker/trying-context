import { useJSON } from "../hooks/useJSON";

export const Dashboard = () => {
  const result = useJSON({ url: `data/fall.json` });

  console.log(result);

  return <></>;
};
