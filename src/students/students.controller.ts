import { Controller, Get, Put, Delete, UseGuards, Req, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // ✅ Get own profile only
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.studentsService.findById(req.user.id); // ✅ Uses `req.user.id`
  }

  // ✅ Update own profile
  @UseGuards(AuthGuard)
  @Put('me')
  updateProfile(@Req() req, @Body() updateData) {
    return this.studentsService.update(req.user.id, updateData);
  }

  // ✅ Delete own profile
  @UseGuards(AuthGuard)
  @Delete('me')
  deleteProfile(@Req() req) {
    return this.studentsService.delete(req.user.id);
  }
}
