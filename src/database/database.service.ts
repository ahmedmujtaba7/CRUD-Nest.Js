import { Sequelize } from 'sequelize';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      await sequelize.authenticate(); // Test the connection
      console.log('Database connection established successfully.');
      return sequelize;
    },
  },
];