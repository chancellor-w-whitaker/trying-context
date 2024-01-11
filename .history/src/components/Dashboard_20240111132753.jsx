import { useAppContext } from "../hooks/useAppContext";

export const Dashboard = () => {
  const { setFileName, fileName, data } = useAppContext();

  console.log(data);
  return <></>;
};
