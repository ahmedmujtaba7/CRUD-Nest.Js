import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './students.model';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student) private readonly studentModel: typeof Student) {}

  async findById(id: number): Promise<Student> {
    const student = await this.studentModel.findByPk(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, updateData: Partial<Student>): Promise<Student> {
    const student = await this.findById(id);
    await student.update(updateData);
    return student;
  }

  async delete(id: number): Promise<void> {
    const student = await this.findById(id);
    await student.destroy();
  }
}
