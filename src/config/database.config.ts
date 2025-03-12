import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Student } from '../students/students.model';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: String(process.env.DB_USER) || 'root',
  password: String(process.env.DB_PASS) || 'root',
  database: String(process.env.DB_NAME) || 'users',
  autoLoadModels: true,
  synchronize: true, // Automatically creates tables if not present
  models: [Student],
};
