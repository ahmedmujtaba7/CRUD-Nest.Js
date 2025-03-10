import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public grade!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
    },
  );
  return User;
};