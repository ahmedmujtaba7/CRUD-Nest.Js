import { Dialect } from "sequelize";

export const databaseConfig = {
    dialect: 'mysql' as Dialect,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'users',
  };