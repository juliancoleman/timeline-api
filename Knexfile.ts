require("dotenv").config();

import * as pg from "pg";

// Parse stringified BIGINTs from Postgres
const numberTypes: number[] = [700, 701, 1700, 20, 20, 1021, 1022, 1231];

numberTypes.forEach((type: number) => pg.types.setTypeParser(type, "text", parseFloat));

module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.DATABSE_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SKEY,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
    disableTransactions: true,
  },
};
