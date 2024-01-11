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
    const fieldToColInfo = {};

    json.forEach((row) => {
      Object.keys(row).forEach((field) => {
        if (!(field in fieldToColInfo)) {
          fieldToColInfo[field] = { values: new Set(), types: {} };
        }

        const { values, types } = fieldToColInfo[field];

        const value = row[field];

        values.add(value);

        const type = typeof value;

        if (!(type in types)) types[type] = 0;

        types[type] += 1;
      });
    });

    const columns = Object.entries(fieldToColInfo).map(
      ([field, { values, types }]) => ({
        type: Object.entries(types)
          .sort((arrA, arrB) => arrB[1] - arrA[1])
          .find(([type]) => type === "string" || type === "number")[0],
        values: [...values].sort(),
        field,
      })
    );

    const fieldToValueList = Object.fromEntries(
      columns.map(({ values, field }) => [field, values])
    );

    console.log(columns);

    setResult(json);
  }, []);

  const fetchResult = useJSON(`data/${fileName}.json`, onBeforeEnd);

  return { onFileChange, fetchResult, fileName };
};
