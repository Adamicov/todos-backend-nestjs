import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Observable } from 'rxjs';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { ForbiddenException } from './exceptions/forbidden.exception';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(): any {
    return this.todosService.getAll();
  }

  @Get('forbidden')
  forbidden() {
    throw new ForbiddenException();
  }

  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }
}
