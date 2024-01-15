import { startTransition, useCallback, useState, useMemo } from "react";

import { comparePreviousColumnFilters } from "./functions/comparePreviousColumnFilters";
import { returnColsWithValuesAndType } from "./functions/returnColsWithValuesAndType";
import { buildRelevantColumnFilters } from "./functions/buildRelevantColumnFilters";
import { regressionTypes } from "./constants/regressionTypes";
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
  const [regressionType, setRegressionType] = useState(regressionTypes[0]);
  const [columnFilters, setColumnFilters] = useState({});
  const [groupBy, setGroupBy] = useState({});

  const onFileNameChange = useCallback(
    ({ target: { value } }) => startTransition(() => setFileName(value)),
    []
  );

  const onRegressionTypeChange = useCallback(
    ({ target: { value } }) => startTransition(() => setRegressionType(value)),
    []
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

  const onGroupByChange = useCallback(
    ({ target: { value } }) => {
      first;
    },
    [second]
  );

  // how should sum up (checklist), group by (checklist), & regression type (radio list) be saved in state?
  // should they be saved in same object?
  // regression type isn't concerned with relevance (its options won't change), so store it separately
  // sum up & group by options will change, but the differences will be simpler to find (than the differences between old & new col filters)
  // may be simpler to just make sum up & group by two different state variables
  // need all & all relevant buttons
  // need to set up filtered data calculation
  // need to set up filtered data relevance calculation (in dropdown close event handler or dropdown open event handler?)
  // do you want to virtualize dropdown lists?
  // get pivot data
  // render in recharts & ag grid
  // remember what chad described about handling the retention rates and/or graduation rates data (found somewhere in pivot-table notes)
  const onBeforeEnd = useCallback((json, setResult) => {
    const columns = returnColsWithValuesAndType(json);

    const textColumns = columns.filter(({ type }) => type === "string");

    setGroupBy((previousGroupBy) => {
      const relevantGroupBy = Object.fromEntries(({ field }) => [
        field,
        { checked: false, relevant: true },
      ]);

      Object.entries(previousGroupBy).forEach(([field, { checked }]) => {
        if (field in relevantGroupBy) {
          relevantGroupBy[field].checked = checked;
        } else {
          relevantGroupBy[field] = { relevant: false, checked };
        }
      });

      return relevantGroupBy;
    });

    setColumnFilters((previousColumnFilters) => {
      const relevantColumnFilters = buildRelevantColumnFilters(textColumns);

      console.log(relevantColumnFilters);

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
    onRegressionTypeChange,
    onColumnFilterChange,
    dropdownMenuStyle,
    onFileNameChange,
    regressionType,
    columnFilters,
    fileName,
    data,
  };
};
