import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, NotFoundException, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './users.guard';
import { LoginDto } from './dto/loginDto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: RegisterDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':mail')
  findOne(@Param('mail') mail: string) {
    return this.usersService.findOnebyEmail(mail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiResponse({ status: 409, description: "user already exist"})
  @ApiResponse({ status: 201, description: "User created"})
  @Post('register')
  register(@Body() resisterDto : RegisterDto){
    return this.usersService.create(resisterDto);
  }

  @ApiResponse({ status: 404, description: "Email not found"})
  @ApiResponse({ status: 401, description: "Unauthorized"})
  @ApiResponse({ status: 201, description: "User found"})
  @Post('login')
  async login(@Body() loginDto : LoginDto): Promise<any> {
    return this.usersService.signIn(loginDto.email, loginDto.password)
  }

}
