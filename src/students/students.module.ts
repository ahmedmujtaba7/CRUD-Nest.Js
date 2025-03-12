import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './students.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Student]), AuthModule],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
