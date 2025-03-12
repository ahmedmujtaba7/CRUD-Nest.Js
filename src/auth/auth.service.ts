import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '../students/students.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student) private studentModel: typeof Student,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, grade: string, className: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await this.studentModel.create({ email, password: hashedPassword, grade, className } as Student);
    console.log('Created Student:', student);
    return student;
  }

  async login(email: string, password: string) {
    const student = await this.studentModel.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'grade', 'class'], // Ensure password is included
      raw: true // Forces Sequelize to return plain JSON
    });
  
    console.log('Retrieved Student:', student); // Log retrieved student
  
    if (!student) throw new Error('User not found');
    if (!student.password) throw new Error('Password not found for this user');
  
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');
  
    const token = this.jwtService.sign({ id: student.id, email: student.email });
    return { token };
  }  
}
