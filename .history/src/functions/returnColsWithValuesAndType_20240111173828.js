const loopDataAndDeriveColProperties = (data) => {
  const fieldToColumn = {};

  data.forEach((row) => {
    Object.keys(row).forEach((field) => {
      if (!(field in fieldToColumn)) {
        fieldToColumn[field] = { values: new Set(), types: {} };
      }

      const { values, types } = fieldToColumn[field];

      const value = row[field];
      values.add(value);

      const type = typeof value;
      if (!(type in types)) types[type] = 0;
      types[type] += 1;
    });
  });

  return fieldToColumn;
};

export const returnColsWithValuesAndType = (data) => {
  const fieldToColumn = loopDataAndDeriveColProperties(data);

  return Object.entries(fieldToColumn).map(([field, { values, types }]) => ({
    type: Object.entries(types)
      .sort((arrA, arrB) => arrB[1] - arrA[1])
      .find(([type]) => type === "string" || type === "number")[0],
    values: [...values].sort(),
    field,
  }));
};
