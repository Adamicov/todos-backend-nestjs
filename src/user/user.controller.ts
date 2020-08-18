import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ForbiddenException } from '../todos/exceptions/forbidden.exception';
import { CreateTodoDto } from '../todos/dto/create-todo.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): any {
    return this.userService.getAll();
  }

  @Get('forbidden')
  forbidden() {
    throw new ForbiddenException();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }
}
