import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../todos/todo.entity';
import { Category } from '../todos/category.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
