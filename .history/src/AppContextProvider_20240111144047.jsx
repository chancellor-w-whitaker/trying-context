import { startTransition, useCallback, useState } from "react";

import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const iterateDataAndDeriveColProperties = (data) => {
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

const returnColsWithUniqueValsAndType = (data) => {
  const fieldToColumn = iterateDataAndDeriveColProperties(data);

  return Object.entries(fieldToColumn).map(([field, { values, types }]) => ({
    type: Object.entries(types)
      .sort((arrA, arrB) => arrB[1] - arrA[1])
      .find(([type]) => type === "string" || type === "number")[0],
    values: [...values].sort(),
    field,
  }));
};

const initializeFieldFilters = () => {};

const useProvideGlobally = () => {
  const [fileName, setFileName] = useState(fileNames[0]);
  const [fieldFilters, setFieldFilters] = useState(null);

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const initializeFieldFilters = useCallback((initialState) => {
    setFieldFilters((thisState) => (!thisState ? initialState : thisState));
  }, []);

  const onBeforeEnd = useCallback(
    (data, setResult) => {
      const columns = returnColsWithUniqueValsAndType(data);

      const textColumns = columns.filter(({ type }) => type === "string");

      const fieldLists = Object.fromEntries(
        textColumns.map(({ values, field }) => [field, values])
      );

      const initFieldFilters = Object.fromEntries(
        textColumns.map(({ values, field }) => [field, new Set(values)])
      );

      initializeFieldFilters(initFieldFilters);

      setResult({ fieldLists, data });
    },
    [initializeFieldFilters]
  );

  const result = useJSON(`data/${fileName}.json`, onBeforeEnd);

  return {
    fieldLists: result?.fieldLists,
    data: result?.data,
    onFileChange,
    fieldFilters,
    fileName,
  };
};
