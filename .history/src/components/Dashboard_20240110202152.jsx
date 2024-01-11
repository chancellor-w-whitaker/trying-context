import { useJson } from "../hooks/useJson";

export const Dashboard = () => {
  const result = useJson({ url: "data/fall.json" });

  console.log(result);

  return <></>;
};
