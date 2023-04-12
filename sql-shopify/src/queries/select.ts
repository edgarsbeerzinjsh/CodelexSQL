export const selectCount = (table: string): string => {
  return `select count(*) as c from ${table}`;
};

export const selectRowById = (id: number, table: string): string => {
  return `select * from ${table} where id = ${id}`;
};

export const selectCategoryByTitle = (title: string): string => {
  return `select * from categories where title = '${title}'`;
};

export const selectAppCategoriesByAppId = (appId: number): string => {
  return `select a.title as app_title, ac.category_id, c.title as category_title 
  from apps_categories ac join apps a on ac.app_id = a.id
  join categories c on ac.category_id = c.id 
  where ac.app_id = ${appId}`;
};

export const selectUnigueRowCount = (tableName: string, columnName: string): string => {
  return `select count(distinct ${columnName}) as c from ${tableName}`;
};

export const selectReviewByAppIdAuthor = (appId: number, author: string): string => {
  return `select * from reviews where app_id = ${appId} and author = '${author}'`;
};

export const selectColumnFromTable = (columnName: string, tableName: string): string => {
  return `select ${columnName} from ${tableName}`;
};

