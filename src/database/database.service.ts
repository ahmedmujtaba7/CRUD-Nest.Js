import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'users',
    });
  }

  async query(sql: string, params?: any[]) {
    const [rows] = await this.connection.execute(sql, params);
    return rows;
  }

  async close() {
    await this.connection.end();
  }
}