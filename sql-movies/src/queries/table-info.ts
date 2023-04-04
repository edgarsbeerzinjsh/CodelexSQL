export const tableInfo = (table: string) => {
  return `pragma table_info(${table})`;
};

export const indexList = (table: string) => {
  return `pragma index_list(${table})`;
};
