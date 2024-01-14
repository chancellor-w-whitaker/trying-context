import { startTransition, useCallback, useState } from "react";

import { returnColsWithValuesAndType } from "./functions/returnColsWithValuesAndType";
import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useProvideGlobally = () => {
  const [fileName, setFileName] = useState(fileNames[0]);
  const [columnFilters, setColumnFilters] = useState({});
  const [fieldFilters, setFieldFilters] = useState(null);

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const onDropdownItemClick = useCallback(
    (field, value) =>
      setFieldFilters((currentState) => {
        const nextState = { ...currentState };

        nextState[field] = new Set(nextState[field]);

        currentState[field].has(value)
          ? nextState[field].delete(value)
          : nextState[field].add(value);

        return nextState;
      }),
    []
  );

  const onBeforeEnd = useCallback((data, setResult) => {
    const allColumns = returnColsWithValuesAndType(data);

    const textColumns = allColumns.filter(({ type }) => type === "string");

    const colFilters = Object.fromEntries(
      textColumns.map(({ values, field }) => [
        field,
        { checked: new Set(values), options: values },
      ])
    );

    setColumnFilters(colFilters);

    setResult(data);
  }, []);

  const url = `data/${fileName}.json`;

  const initialState = { fieldLists: {}, data: [] };

  const { fieldLists, data } = useJSON({ initialState, onBeforeEnd, url });

  return {
    onDropdownItemClick,
    onFileChange,
    fieldFilters,
    fieldLists,
    fileName,
    data,
  };
};