import { startTransition, useCallback, useState, useMemo } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// const conditionallyInitFilters = (initialState, setState) => {
//   setState((currentState) => (!currentState ? initialState : currentState));
// };

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

  const onBeforeFetchEnd = useCallback((data, setResult) => {
    const columns = returnColsWithValuesAndType(data);

    const textColumns = columns.filter(({ type }) => type === "string");

    const fieldLists = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, values])
    );

    const initialFieldFilters = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, new Set(values)])
    );

    // conditionallyInitFilters(initialFieldFilters, setFieldFilters);

    setFieldFilters(initialFieldFilters);

    // setResult(() => {
    //   return { fieldLists, data };
    // });

    setResult({ fieldLists, data });
  }, []);

  const result = useJSON(`data/${fileName}.json`, onBeforeFetchEnd);

  const data = result ? result.data : [];

  const fieldLists = result ? result.fieldLists : {};

  return {
    onDropdownItemClick,
    setFieldFilters,
    onFileChange,
    fieldFilters,
    fieldLists,
    fileName,
    data,
  };
};