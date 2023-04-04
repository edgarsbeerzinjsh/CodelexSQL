import { SQLiteWrapper } from "./sqlite-wrapper";

export class Database {
  private sql: SQLiteWrapper;

  constructor(sql: SQLiteWrapper) {
    this.sql = sql;
  }

  async isConnected(): Promise<boolean> {
    const query = `select 'hello world' as result`;
    const row = await this.sql.selectSingleRow(query);
    return row.result === `hello world`;
  }

  async createTable(query: string): Promise<void> {
    return this.sql.execute(query);
  }

  async createIndex(query: string): Promise<void> {
    return this.sql.execute(query);
  }

  async tableExists(table: string): Promise<boolean> {
    const query = `select 1 as result from sqlite_master where type = 'table' and name = '${table}'`;
    const row = await this.sql.selectSingleRow(query);
    return row && row.result === 1;
  }

  async insert(query: string): Promise<void> {
    await this.sql.execute(query);
  }

  async selectSingleRow(query: string): Promise<any> {
    return this.sql.selectSingleRow(query);
  }

  async selectMultipleRows(query: string): Promise<any[]> {
    return this.sql.selectMultipleRows(query);
  }

  async delete(query: string): Promise<void> {
    await this.sql.execute(query);
  }

  async execute(query: string): Promise<void> {
    await this.sql.execute(query);
  }

  static async createNew(prefix: string): Promise<Database> {
    const sql = await SQLiteWrapper.createNew(prefix);
    return new Database(sql);
  }

  static async fromExisting(
    sourcePrefix: string,
    targetPrefix: string
  ): Promise<Database> {
    const sql = await SQLiteWrapper.fromExisting(sourcePrefix, targetPrefix);
    return new Database(sql);
  }
}
