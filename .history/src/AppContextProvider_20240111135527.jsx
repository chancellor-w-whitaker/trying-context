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

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const onBeforeEnd = useCallback((json, setResult) => {
    const columnLookup = {};

    json.forEach((row) => {
      Object.keys(row).forEach((field) => {
        if (!(field in columnLookup)) {
          columnLookup[field] = { values: new Set(), types: {} };
        }

        const { values, types } = columnLookup[field];

        const value = row[field];

        values.add(value);

        const type = typeof value;

        if (!(type in types)) types[type] = 0;

        types[type] += 1;
      });
    });

    const columns = Object.entries(columnLookup).map(
      ([field, { values, types }]) => ({
        type: Object.entries(types)
          .sort((arrA, arrB) => arrB[1] - arrA[1])
          .find(([type]) => type === "string" || type === "number")[0],
        values: [...values].sort(),
        field,
      })
    );
  }, []);

  const data = useJSON(`data/${fileName}.json`);

  return { onFileChange, fileName, data };
};
