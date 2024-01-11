import { AgGridReact } from "ag-grid-react";

import { useAppContext } from "../hooks/useAppContext"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

export const Table = () => {
  const { data } = useAppContext();

  const columnDefs =
    data.length > 0 ? Object.keys(data[0]).map((field) => ({ field })) : [];

  return <table></table>;
};
