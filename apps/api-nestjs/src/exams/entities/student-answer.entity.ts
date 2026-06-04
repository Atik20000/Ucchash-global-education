import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Test } from './test.entity';

export enum AnswerType {
  LISTENING = 'listening',
  READING = 'reading',
  WRITING = 'writing',
}

@Entity('student_answers')
export class StudentAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  testId: string;

  @ManyToOne(() => Test, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: Test;

  @Column({
    type: 'enum',
    enum: AnswerType,
  })
  answerType: AnswerType;

  @Column('uuid', { nullable: true })
  questionId: string; // listening_question_id or reading_question_id or writing_task_id

  @Column({ type: 'int' })
  questionNumber: number;

  @Column({ type: 'text' })
  studentAnswer: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean; // Only for listening and reading

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
