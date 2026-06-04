import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Entity('writing_tasks')
export class WritingTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  testId: string;

  @ManyToOne(() => Test, (test) => test.writingTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: Test;

  @Column({ type: 'int' })
  taskNumber: number; // 1 or 2

  @Column({ type: 'text' })
  instruction: string;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'int' })
  wordLimit: number; // 150 for Task 1, 250 for Task 2

  @Column({ type: 'text', nullable: true })
  imageUrl: string; // For charts/graphs in Task 1

  @CreateDateColumn()
  createdAt: Date;
}
