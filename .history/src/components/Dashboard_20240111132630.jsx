import { useAppContext } from "../hooks/useAppContext";

export const Dashboard = () => {
  const data = useAppContext();

  console.log(data);
  return <></>;
};
