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

        const { type } = nextState[field];

        const modifyChecked = (set, type) => {
          if (type === "checkbox") {
            set.has(value) ? set.delete(value) : set.add(value);
          }
          if (type === "radio") {
            set.clear();
            set.add(value);
          }
        };

        modifyChecked(nextState[field].checked, type);

        return nextState;
      }),
    []
  );

  const onBeforeEnd = useCallback((json, setResult) => {
    const columns = returnColsWithValuesAndType(json);

    // object mapping key (field) to checklist
    // checklist: { type, list }
    // field (string)
    // type (string) ("checkbox" or "radio")
    // list: [{}, {}, {}]
    // list element: { value, checked, disabled (or relevant, or just something to describe relevance to dataset) }

    // in the future, may need something to describe relevance to filtered dataset
    // remember, this operation doesn't have to be run until you close (or maybe even open) a checklist
    // and what about sorting a list by relevance when opening a checklist? should this be a stateful or visual operation?
    // making it stateful would probably make updating the state of the item easier because the item's index in the list wouldn't change

    const fieldChecklists = Object.fromEntries(
      columns
        .filter(({ type }) => type === "string")
        .map(({ values, field }) => [
          field,
          { checked: new Set(values), type: "checkbox", options: values },
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
