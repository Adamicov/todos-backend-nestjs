import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Category } from '../todos/category.entity';
import { Todo } from '../todos/todo.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @OneToMany(
    type => Category,
    category => category.user,
  )
  categories: Category[];

  @OneToMany(
    type => Todo,
    todo => todo.user,
  )
  todos: Todo[];


}
