import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  age?: number;

  @IsOptional()
  @IsString()
  grade?: string;
}