import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  grade: string;

  @Column({ allowNull: false, field: 'class' })
  className: string;
}
