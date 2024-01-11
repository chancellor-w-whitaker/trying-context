import { useAppContext } from "../hooks/useAppContext";

export const Table = () => {
  const { data } = useAppContext();

  const columnDefs =
    data.length > 0 ? Object.keys(data[0]).map((field) => ({ field })) : [];

  return <table></table>;
};
