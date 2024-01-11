import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { useAppContext } from "../hooks/useAppContext";

export const Table = ({ columnDefs }) => {
  const { data } = useAppContext();

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        {/* The AG Grid component */}
        <AgGridReact columnDefs={columnDefs} rowData={data} />
      </div>
    </>
  );
};
