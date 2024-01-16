export const updateColSelectorListData = (columnsArray, previousState) => {
  const nextState = Object.fromEntries(
    columnsArray.map(({ field }) => [field, { checked: false, relevant: true }])
  );

  Object.entries(previousState).forEach(([field, { checked }]) => {
    if (field in nextState) {
      nextState[field].checked = checked;
    } else {
      nextState[field] = { relevant: false, checked };
    }
  });

  const checkedRelevantEntries = Object.entries(nextState).filter(
    (entry) => entry[1].checked && entry[1].relevant
  );

  const firstField = Object.keys(nextState)[0];

  if (checkedRelevantEntries.length === 0) nextState[firstField].checked = true;

  return nextState;
};
