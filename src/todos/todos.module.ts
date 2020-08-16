import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category])],
  controllers: [TodosController],
  providers: [TodosService, LoggerMiddleware],
})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes(TodosController);
  }
}
