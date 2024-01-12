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
  const [fieldChecklists, setFieldChecklists] = useState({});

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const onDropdownItemClick = useCallback(
    (field, value) =>
      setFieldChecklists((currentState) => {
        const nextState = { ...currentState };
        nextState[field] = { ...nextState[field] };
        nextState[field].checked = new Set(nextState[field].checked);

        const modifySet = (set) =>
          set.has(value) ? set.delete(value) : set.add(value);

        modifySet(nextState[field].checked);

        return nextState;
      }),

    //   setFieldFilters((currentState) => {
    //     const nextState = { ...currentState };

    //     nextState[field] = new Set(nextState[field]);

    //     currentState[field].has(value)
    //       ? nextState[field].delete(value)
    //       : nextState[field].add(value);

    //     return nextState;
    //   }),
    []
  );

  const onBeforeEnd = useCallback((json, setResult) => {
    const columns = returnColsWithValuesAndType(json);

    const fieldChecklists = Object.fromEntries(
      columns
        .filter(({ type }) => type === "string")
        .map(({ values, field }) => [
          field,
          { checked: new Set(values), options: values },
        ])
    );

    setFieldChecklists(fieldChecklists);

    setResult(json);
  }, []);

  const url = `data/${fileName}.json`;

  const initialState = { fieldLists: {}, data: [] };

  const data = useJSON({ initialState, onBeforeEnd, url });

  return {
    onDropdownItemClick,
    fieldChecklists,
    onFileChange,
    fileName,
    data,
  };
};
