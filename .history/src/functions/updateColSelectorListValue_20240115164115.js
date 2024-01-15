export const updateColSelectorListValue = (value, previousState) => {
  const nextState = { ...previousState };
  const { relevant, checked } = nextState[value];
  nextState[value] = { checked: !checked, relevant };

  return nextState;
};
