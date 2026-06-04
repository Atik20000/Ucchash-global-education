import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Test } from './test.entity';

export enum ListeningQuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  FORM_COMPLETION = 'form_completion',
  NOTE_COMPLETION = 'note_completion',
  MATCHING = 'matching',
  MAP_LABELING = 'map_labeling',
}

@Entity('listening_questions')
export class ListeningQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  testId: string;

  @ManyToOne(() => Test, (test) => test.listeningQuestions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: Test;

  @Column({ type: 'int' })
  sectionNumber: number; // 1, 2, 3, or 4

  @Column({ type: 'int' })
  questionNumber: number; // 1-40

  @Column({
    type: 'enum',
    enum: ListeningQuestionType,
  })
  questionType: ListeningQuestionType;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'jsonb', nullable: true })
  options: string[]; // For multiple choice

  @Column({ type: 'text' })
  correctAnswer: string;

  @Column({ type: 'text', nullable: true })
  audioUrl: string; // YouTube URL for the section

  @Column({ type: 'text', nullable: true })
  instruction: string;

  @CreateDateColumn()
  createdAt: Date;
}
