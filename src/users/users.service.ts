import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}
    async findAll() {
        const sqlQuery = 'select * from users';
        return this.databaseService.query(sqlQuery);
    }
    async findOne(id: Number) {
        const sqlQuery = `select * from users where id = ${id}`;
        return this.databaseService.query(sqlQuery);
    }
    async create(createStudentDto: CreateUserDto){
        const sqlQuery = `insert into users (name, age, grade) values ('${createStudentDto.name}', ${createStudentDto.age}, '${createStudentDto.grade}')`;
        return this.databaseService.query(sqlQuery);    
    }
    async update(id: Number, updateUserDto: UpdateUserDto) {
        // Collect all fields that are present in updateUserDto
        const fieldsToUpdate = Object.entries(updateUserDto)
        .filter(([_, value]) => value !== undefined) // Ignore undefined fields
        .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
        .join(', ');

        // If no fields are provided, return an error
        if (!fieldsToUpdate) {
            throw new Error("No fields provided for update");
        }

        // Construct the SQL query dynamically
        const sqlQuery = `UPDATE users SET ${fieldsToUpdate} WHERE id = ${id}`;

        // Execute the query
        return this.databaseService.query(sqlQuery);
    }
    async remove(id: Number) {
        const sqlQuery = `delete from users where id = ${id}`;
        return this.databaseService.query(sqlQuery);
    }
}
    