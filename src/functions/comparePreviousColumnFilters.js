export const comparePreviousColumnFilters = (previousState, nextState) => {
  Object.entries(previousState).forEach(([field, { checklist }]) => {
    if (!(field in nextState)) {
      nextState[field] = {
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
        const nextChecklist = nextState[field].checklist;

        if (value in nextChecklist) {
          nextChecklist[value].checked = checked;
        } else {
          nextChecklist[value] = { relevant: false, checked };
        }
      });
    }
  });
};
