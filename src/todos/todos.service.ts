import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<void> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.content = createTodoDto.content;
    await this.todosRepository.save(todo);
  }

  getAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
