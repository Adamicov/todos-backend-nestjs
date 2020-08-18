import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { getConnection, Repository } from 'typeorm/index';
import { User } from '../user/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<void> {
    const connection = getConnection();
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.content = createTodoDto.content;
    await this.todosRepository.save(todo);
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({where: {id: 1}, relations: ['todos']});
    console.log(user);
    user.todos.push(todo);
    await userRepository.save(user);
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
