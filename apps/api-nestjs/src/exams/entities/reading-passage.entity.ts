import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Test } from './test.entity';
import { ReadingQuestion } from './reading-question.entity';

@Entity('reading_passages')
export class ReadingPassage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  testId: string;

  @ManyToOne(() => Test, (test) => test.readingPassages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: Test;

  @Column({ type: 'int' })
  passageNumber: number; // 1, 2, or 3

  @Column()
  title: string;

  @Column({ type: 'text' })
  passageText: string;

  @OneToMany(() => ReadingQuestion, (question) => question.passage)
  questions: ReadingQuestion[];

  @CreateDateColumn()
  createdAt: Date;
}
