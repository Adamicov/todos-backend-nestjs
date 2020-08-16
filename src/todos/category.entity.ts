import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;
}
