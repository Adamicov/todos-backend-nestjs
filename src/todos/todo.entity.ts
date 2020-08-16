import { BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Category } from './category.entity';

export enum TaskStatus {
  DONE = 'Done',
  IN_PROGRESS = 'Progress',
  DISMISSED = 'Dismissed',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedDate = new Date();
  }

  @Column('simple-array')
  faIcons: string[];

  @OneToOne(type => Category)
  @JoinColumn()
  category: Category;
}
