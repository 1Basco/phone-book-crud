import sqlite3 from "sqlite3";

export const openConnection = () => {
  let db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
      db.run(
        `CREATE TABLE contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text, 
            last_name text, 
            phone_number text UNIQUE,
            constraint phone_number_unique UNIQUE (phone_number)
            )`,
        (err) => {
          if (err) {
            //   table already exists
          }
        }
      );
    }
  });
  return db;
};

export const queryDBFirst = async (queryString: string, params?: any[]) => {
  const queryReturn = await queryDB(queryString, params);
  return queryReturn[0];
};

export const queryDB = async (queryString: string, params?: any[]) => {
  let db = openConnection();
  try {
    return await new Promise<any[]>((resolve, reject) => {
      db.all(queryString, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  } finally {
    db.close();
  }
};
