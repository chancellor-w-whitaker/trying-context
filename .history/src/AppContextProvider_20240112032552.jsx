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
  //   const [fieldChecklists, setFieldChecklists] = useState({});
  const [columnFilters, setColumnFilters] = useState({});

  const onFileChange = useCallback(
    (e) => startTransition(() => setFileName(e.target.value)),
    [setFileName]
  );

  const onColumnFilterItemClick = useCallback(
    (field, value) =>
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
      }),
    []
  );

  //   const onDropdownItemClick = useCallback(
  //     (field, value) =>
  //       setFieldChecklists((currentState) => {
  //         const nextState = { ...currentState };
  //         nextState[field] = { ...nextState[field] };
  //         nextState[field].checked = new Set(nextState[field].checked);

  //         const { type } = nextState[field];

  //         const modifyChecked = (set, type) => {
  //           if (type === "checkbox") {
  //             set.has(value) ? set.delete(value) : set.add(value);
  //           }
  //           if (type === "radio") {
  //             set.clear();
  //             set.add(value);
  //           }
  //         };

  //         modifyChecked(nextState[field].checked, type);

  //         return nextState;
  //       }),
  //     []
  //   );

  const onBeforeEnd = useCallback((json, setResult) => {
    // rethink way you are turning columns to dropdowns--may be some unnecessary conversions
    // alternatively, may not matter because columns must be turned into an array for grid compatibility
    const columns = returnColsWithValuesAndType(json);

    const relevantColFilters = Object.fromEntries(
      columns
        .filter(({ type }) => type === "string")
        .map(({ values, field }) => [
          field,
          {
            checklist: Object.fromEntries(
              values.map((value) => [value, { relevant: true, checked: true }])
            ),
            relevant: true,
          },
        ])
    );

    setColumnFilters((prevColFilters) => {
      const next = relevantColFilters;

      Object.entries(prevColFilters).forEach(([field, { checklist }]) => {
        if (!(field in next)) {
          next[field] = {
            checklist: Object.fromEntries(
              Object.entries(checklist).map(([value, { checked }]) => [
                value,
                { relevant: false, checked },
              ])
            ),
            relevant: false,
          };
        } else {
          Object.entries(checklist).forEach(([value, { checked }]) => {
            const nextChecklist = next[field].checklist;

            if (value in nextChecklist) {
              nextChecklist[value].checked = checked;
            } else {
              nextChecklist[value] = { relevant: false, checked };
            }
          });
        }
      });

      return next;
    });

    // const textColumns = columns.filter(({ type }) => type === "string");

    // const prototype = Object.fromEntries(
    //   textColumns.map(({ values, field }) => [
    //     field,
    //     {
    //       list: Object.fromEntries(
    //         values.map((value) => [value, { relevant: true, checked: true }])
    //       ),
    //       type: "checkbox",
    //       relevant: true,
    //     },
    //   ])
    // );

    // console.log(prototype);

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

  const data = useJSON({
    url: `data/${fileName}.json`,
    initialState: [],
    onBeforeEnd,
  });

  return {
    // onDropdownItemClick,
    onColumnFilterItemClick,
    columnFilters,
    // fieldChecklists,
    onFileChange,
    fileName,
    data,
  };
};
