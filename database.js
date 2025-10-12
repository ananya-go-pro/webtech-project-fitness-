const { MongoClient } = require("mongodb");
const config = require("./config.json");

let db;
let client;

async function run() {
  if (db) return db;

  const url = (config && config.database && config.database.url) || "mongodb://127.0.0.1:27017";
  const name = (config && config.database && config.database.name) || "mydb";

  if (!client) client = new MongoClient(url);
  await client.connect();
  db = client.db(name);
  return db;
}

module.exports = { run };