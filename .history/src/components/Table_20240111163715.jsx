import { useAppContext } from "../hooks/useAppContext";

export const Table = () => {
  const { data } = useAppContext();

  console.log(data);

  console.log(data.length > 0 ? Object.keys(data[0]).map(field=>({field})))

  return <table></table>;
};
