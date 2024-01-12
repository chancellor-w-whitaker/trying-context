export const buildRelevantColumnFilters = (columns) => {
  return Object.fromEntries(
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
};
