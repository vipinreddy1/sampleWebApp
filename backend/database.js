import sqlite3 from "sqlite3";
const sql3 = sqlite3.verbose();

const DB = new sql3.Database(
  "./sampledata.db",
  sqlite3.OPEN_READWRITE,
  connected
);

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("created DB, or it already exists");
}

let sql = `CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL
  )`;
DB.run(sql, [], (err) => {
  if (err) {
    console.log("error creating users table");
    return;
  }
  console.log("created users table");
});

let createProductsTable = `CREATE TABLE IF NOT EXISTS Products(
    product_id INTEGER PRIMARY KEY,    
    product_name TEXT NOT NULL,
    price INT NOT NULL,
    record_count INT DEFAULT 0,
    category TEXT
  )`;
DB.run(createProductsTable, [], (err) => {
  if (err) {
    console.log("error creating products table");
    return;
  }
  console.log("created products table");
});

export default DB;
