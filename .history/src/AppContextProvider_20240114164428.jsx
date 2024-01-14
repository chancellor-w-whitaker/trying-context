import { startTransition, useCallback, useState, useMemo } from "react";

import { comparePreviousColumnFilters } from "./functions/comparePreviousColumnFilters";
import { returnColsWithValuesAndType } from "./functions/returnColsWithValuesAndType";
import { buildRelevantColumnFilters } from "./functions/buildRelevantColumnFilters";
import { useBodyBgVariant } from "./hooks/useBodyBgVariant";
import { AppContext } from "./contexts/AppContext";
import { fileNames } from "./constants/fileNames";
import { useJSON } from "./hooks/useJSON";

export const AppContextProvider = ({ children }) => {
  const value = useProvideGlobally();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useProvideGlobally = () => {
  useBodyBgVariant("primary-subtle");

  const [fileName, setFileName] = useState(fileNames[0].id);
  const [columnFilters, setColumnFilters] = useState({});

  const onFileChange = useCallback(
    ({ target: { value } }) => startTransition(() => setFileName(value)),
    [setFileName]
  );

  const onColumnFilterChange = useCallback(
    ({ target: { name: field, value } }) =>
      startTransition(() =>
        setColumnFilters((previousState) => {
          // destructure top object (looks like { field1: {}, field2: {}, ... })
          const nextState = { ...previousState };
          // destructure field object (looks like { checklist: {}, relevant })
          nextState[field] = { ...nextState[field] };
          // destructure checklist (looks like { value1: {}, value2: {}, ... })
          nextState[field].checklist = { ...nextState[field].checklist };

          const { relevant, checked } = nextState[field].checklist[value];
          // create new object for value and flip checked state
          nextState[field].checklist[value] = { checked: !checked, relevant };

          return nextState;
        })
      ),
    []
  );

  const onBeforeEnd = useCallback((json, setResult) => {
    const columns = returnColsWithValuesAndType(json);

    const textColumns = columns.filter(({ type }) => type === "string");

    setColumnFilters((previousColumnFilters) => {
      const relevantColumnFilters = buildRelevantColumnFilters(textColumns);

      comparePreviousColumnFilters(
        previousColumnFilters,
        relevantColumnFilters
      );

      return relevantColumnFilters;
    });

    // object that maps key (field) to checklist
    // checklist: { type, list }
    // field (string)
    // type (string) ("checkbox" or "radio")
    // list: [{}, {}, {}] (or what about an object that maps value to item state? that might solve indexing issues deriving from managing arrays in state)
    // list element: { value, checked, disabled (or relevant, or just something to describe relevance to dataset) }

    // in the future, may need something to describe relevance to filtered dataset
    // remember, this operation doesn't have to be run until you close (or maybe even open) a checklist
    // and what about sorting a list by relevance when opening a checklist? should this be a stateful or visual operation?
    // making it stateful would probably make updating the state of the item easier because the item's index in the list wouldn't change

    setResult(json);
  }, []);

  const data = useJSON(`data/${fileName}.json`, onBeforeEnd);

  const dropdownMenuStyle = useMemo(() => ({ maxHeight: 300 }), []);

  return {
    onColumnFilterChange,
    dropdownMenuStyle,
    columnFilters,
    onFileChange,
    fileName,
    data,
  };
};