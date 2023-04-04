import sqlite3 from "sqlite3";
import fs from "fs";
import { resolve } from "path";

const sql = sqlite3.verbose();

const DB_DIR = resolve(__dirname, `../_db`);

const path = (prefix: string): string => {
  return `${DB_DIR}/${prefix}-database.sqlite3`;
};

export class SQLiteWrapper {
  private pathToFile: string;
  private db: sqlite3.Database;

  constructor(pathToFile: string) {
    this.pathToFile = pathToFile;
    this.db = new sql.Database(this.pathToFile);
  }

  async selectSingleRow(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(query, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  async selectMultipleRows(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  async execute(query: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(query, err => {
        if (err) return reject(`Execution failed: ${err} for query "${query}"`);
        resolve();
      });
    });
  }

  async reset(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(this.pathToFile, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  static async createNew(prefix: string): Promise<SQLiteWrapper> {
    const exists = await new Promise(resolve =>
      fs.exists(DB_DIR, exists => resolve(exists))
    );
    if (!exists) {
      await new Promise((resolve, reject) => {
        fs.mkdir(DB_DIR, err => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
    return new SQLiteWrapper(path(prefix));
  }

  static async fromExisting(
    sourcePrefix: string,
    targetPrefix: string
  ): Promise<SQLiteWrapper> {
    const sourcePath = path(sourcePrefix);
    const targetPath = path(targetPrefix);
    await new Promise((resolve, reject) => {
      fs.copyFile(sourcePath, targetPath, err => {
        if (err) return reject(err);
        resolve();
      });
    });
    return new SQLiteWrapper(targetPath);
  }
}
