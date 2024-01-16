import { startTransition, useCallback, useState, useMemo } from "react";

import { comparePreviousColumnFilters } from "./functions/comparePreviousColumnFilters";
import { returnColsWithValuesAndType } from "./functions/returnColsWithValuesAndType";
import { buildRelevantColumnFilters } from "./functions/buildRelevantColumnFilters";
import { updateColSelectorListValue } from "./functions/updateColSelectorListValue";
import { updateColSelectorListData } from "./functions/updateColSelectorListData";
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
  const [measure, setMeasure] = useState({});

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
    ({ target: { value } }) =>
      startTransition(() =>
        setGroupBy((previousState) =>
          updateColSelectorListValue(value, previousState)
        )
      ),
    []
  );

  const onMeasureChange = useCallback(
    ({ target: { value } }) => {
      startTransition(() =>
        setMeasure((previousState) => {
          const nextState = { ...previousState };

          nextState[fileName] = { ...nextState[fileName], checked: value };

          return nextState;
        })
      );
    },
    [fileName]
  );

  // * how should sum up (checklist), group by (checklist), & regression type (radio list) be saved in state?
  // * should they be saved in same object?
  // * regression type isn't concerned with relevance (its options won't change), so store it separately
  // * sum up & group by options will change, but the differences will be simpler to find (than the differences between old & new col filters)
  // * may be simpler to just make sum up & group by two different state variables
  // need all & all relevant buttons
  // * need to set up filtered data calculation
  // ! don't like fileName being a dependency for onBeforeEnd (does it affect performance or create extra renders to set a dep in a data fetching use effect?)
  // ! is it bad practice to use start transition when setting all state values (including data)?
  // todo: group by should be ordered
  // todo: sum up should be a radio selector
  // todo: need to set up filtered data relevance calculation (in dropdown close event handler or dropdown open event handler?)
  // todo: get column defs from group by selections & pivot values (pivot values need data for all relevant sum up selections)
  // todo: create ag grid from column defs & row data (row data being filtered data or pivot data once calculated)
  // ? should grid not be empty when no group by selections are made?
  // ? do you want to virtualize dropdown lists?
  // get pivot data
  // render in recharts & ag grid
  // remember what chad described about handling the retention rates and/or graduation rates data (found somewhere in pivot-table notes)
  const onBeforeEnd = useCallback(
    (json, setResult) =>
      startTransition(() => {
        const columns = returnColsWithValuesAndType(json);

        const textColumns = columns.filter(({ type }) => type === "string");

        const numberColumns = columns.filter(({ type }) => type === "number");

        setMeasure((previousState) => {
          const nextState = { ...previousState };

          const measures = numberColumns.map(({ field }) => field);

          if (!(fileName in nextState)) {
            nextState[fileName] = { checked: measures[0], options: measures };
          }

          return nextState;
        });

        setGroupBy((previousGroupBy) =>
          updateColSelectorListData(
            textColumns.filter(
              ({ field }) =>
                field !==
                fileNames.find(({ id }) => id === fileName).pivotColumn
            ),
            previousGroupBy
          )
        );

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
      }),
    [fileName]
  );

  const data = useJSON(`data/${fileName}.json`, onBeforeEnd);

  const filteredData = useMemo(() => {
    const relevantFields = Object.keys(columnFilters).filter(
      (field) => columnFilters[field].relevant
    );

    return data?.filter((row) => {
      for (const field of relevantFields) {
        const value = row[field];

        if (!columnFilters[field].checklist[value].checked) return false;
      }

      return true;
    });
  }, [columnFilters, data]);

  const dropdownMenuStyle = useMemo(() => ({ maxHeight: 300 }), []);

  return {
    measure: {
      current: measure[fileName]?.checked,
      options: measure[fileName]?.options,
      onChange: onMeasureChange,
    },
    regressionType: {
      onChange: onRegressionTypeChange,
      current: regressionType,
    },
    columnFilters: { onChange: onColumnFilterChange, current: columnFilters },
    fileName: { onChange: onFileNameChange, current: fileName },
    groupBy: { onChange: onGroupByChange, current: groupBy },
    data: { filtered: filteredData, current: data },
    dropdownMenu: { style: dropdownMenuStyle },
  };
};
