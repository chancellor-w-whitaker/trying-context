import { useAppContext } from "../hooks/useAppContext";

export const Table = () => {
  const { data } = useAppContext();

  return <table></table>;
};
