import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseProviders } from '../database/database.service';
import { UserModel } from './user.model';
import { Sequelize } from 'sequelize';
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    ...databaseProviders,
    {
      provide: 'USER_MODEL',
      useFactory: (sequelize: Sequelize) => UserModel(sequelize),
      inject: ['SEQUELIZE'],
    },
    UsersService,
  ],
})
export class UsersModule {}