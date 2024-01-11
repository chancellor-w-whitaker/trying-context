import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { useAppContext } from "../hooks/useAppContext";

export const Table = () => {
  const { data } = useAppContext();

  const columnDefs =
    data.length > 0 ? Object.keys(data[0]).map((field) => ({ field })) : [];

  return; // Container with theme & dimensions
  <div className="ag-theme-quartz" style={{ height: 500 }}>
    {/* The AG Grid component */}
    <AgGridReact columnDefs={colDefs} rowData={rowData} />
  </div>;
};
