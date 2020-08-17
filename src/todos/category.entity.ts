import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm/index';
import { User } from '../user/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(
    type => User,
    user => user.categories,
  )
  user: User;

}
