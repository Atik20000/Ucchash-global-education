import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ListeningQuestion } from './listening-question.entity';
import { ReadingPassage } from './reading-passage.entity';
import { WritingTask } from './writing-task.entity';
import { TestResult } from './test-result.entity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 30 })
  listeningDuration: number; // in minutes

  @Column({ type: 'int', default: 60 })
  readingDuration: number; // in minutes

  @Column({ type: 'int', default: 60 })
  writingDuration: number; // in minutes

  @OneToMany(() => ListeningQuestion, (question) => question.test)
  listeningQuestions: ListeningQuestion[];

  @OneToMany(() => ReadingPassage, (passage) => passage.test)
  readingPassages: ReadingPassage[];

  @OneToMany(() => WritingTask, (task) => task.test)
  writingTasks: WritingTask[];

  @OneToMany(() => TestResult, (result) => result.test)
  results: TestResult[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
