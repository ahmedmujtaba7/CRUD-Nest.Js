import { IsOptional, IsEmail, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  class?: string;
}
