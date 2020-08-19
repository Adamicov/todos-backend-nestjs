import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm/index';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Category } from '../todos/category.entity';
import { defaultCategories } from './defaultCategories';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new User();
    user.name = createUserDto.name;
    const categories = defaultCategories.map(
      category => new Category(category.name, category.color),
    );
    const connection = getConnection();
    const categoryRepository = connection.getRepository(Category);
    await categoryRepository.save(categories);
    user.categories = categories;
    await this.userRepository.save(user);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['categories', 'todos'] });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findUserByName(name: string): Promise<User> {
    return this.userRepository.findOne({ name });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
