import { useAppContext } from "../hooks/useAppContext";

export const Table = () => {
  const { data } = useAppContext();

  console.log(data);

  return <table></table>;
};
