import { startTransition, useCallback, useState } from "react";

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

  const onBeforeEnd = useCallback((data, setResult) => {
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

    const columns = Object.entries(fieldToColumn).map(
      ([field, { values, types }]) => ({
        type: Object.entries(types)
          .sort((arrA, arrB) => arrB[1] - arrA[1])
          .find(([type]) => type === "string" || type === "number")[0],
        values: [...values].sort(),
        field,
      })
    );

    const fieldLists = Object.fromEntries(
      columns.map(({ values, field }) => [field, values])
    );

    const initialFieldFilters = Object.fromEntries(
      columns.map(({ values, field }) => [field, values])
    );

    console.log(fieldLists);

    console.log(columns);

    setResult({ fieldLists, data });
  }, []);

  const fetchResult = useJSON(`data/${fileName}.json`, onBeforeEnd);

  return { onFileChange, fetchResult, fileName };
};
