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
    const columns = returnColsWithValuesAndType(data);

    const textColumns = columns.filter(({ type }) => type === "string");

    const fieldLists = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, values])
    );

    const initialFieldFilters = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, new Set(values)])
    );

    setFieldFilters(initialFieldFilters);

    const result = { fieldLists, data };

    setResult(result);
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
  };
};
