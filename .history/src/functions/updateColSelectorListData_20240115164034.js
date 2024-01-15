export const updateColSelectorListData = (columnsArray, previousList) => {
  const relevantList = Object.fromEntries(
    columnsArray.map(({ field }) => [field, { checked: false, relevant: true }])
  );

  Object.entries(previousList).forEach(([field, { checked }]) => {
    if (field in relevantList) {
      relevantList[field].checked = checked;
    } else {
      relevantList[field] = { relevant: false, checked };
    }
  });

  return relevantList;
};
