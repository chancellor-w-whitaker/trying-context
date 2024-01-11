import { startTransition, useCallback, useState } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const loopDataAndDeriveColProperties = (data) => {
  const fieldToColumn = {};

  data.forEach((row) => {
    Object.keys(row).forEach((field) => {
      if (!(field in fieldToColumn)) {
        fieldToColumn[field] = { values: new Set(), types: {} };
      }

      const { values, types } = fieldToColumn[field];

      const value = row[field];
      values.add(value);

      const type = typeof value;
      if (!(type in types)) types[type] = 0;
      types[type] += 1;
    });
  });

  return fieldToColumn;
};

const returnColsWithValsAndType = (data) => {
  const fieldToColumn = loopDataAndDeriveColProperties(data);

  return Object.entries(fieldToColumn).map(([field, { values, types }]) => ({
    type: Object.entries(types)
      .sort((arrA, arrB) => arrB[1] - arrA[1])
      .find(([type]) => type === "string" || type === "number")[0],
    values: [...values].sort(),
    field,
  }));
};

const conditionallyInitFilters = (initialState, setState) => {
  setState((currentState) => (!currentState ? initialState : currentState));
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

  const onBeforeFetchEnd = useCallback((data, setResult) => {
    const columns = returnColsWithValsAndType(data);

    const textColumns = columns.filter(({ type }) => type === "string");

    const fieldLists = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, values])
    );

    const initialFieldFilters = Object.fromEntries(
      textColumns.map(({ values, field }) => [field, new Set(values)])
    );

    // conditionallyInitFilters(initialFieldFilters, setFieldFilters);

    setFieldFilters(initialFieldFilters);

    setResult({ fieldLists, data });
  }, []);

  const result = useJSON(`data/${fileName}.json`, onBeforeFetchEnd);

  return {
    fieldLists: result ? result.fieldLists : {},
    data: result ? result.data : [],
    onDropdownItemClick,
    setFieldFilters,
    onFileChange,
    fieldFilters,
    fileName,
  };
};
