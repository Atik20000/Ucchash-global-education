import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReadingPassage } from './reading-passage.entity';

export enum ReadingQuestionType {
  TRUE_FALSE_NOT_GIVEN = 'true_false_not_given',
  MATCHING_HEADINGS = 'matching_headings',
  SENTENCE_COMPLETION = 'sentence_completion',
  MULTIPLE_CHOICE = 'multiple_choice',
  SUMMARY_COMPLETION = 'summary_completion',
}

@Entity('reading_questions')
export class ReadingQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  passageId: string;

  @ManyToOne(() => ReadingPassage, (passage) => passage.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passageId' })
  passage: ReadingPassage;

  @Column({ type: 'int' })
  questionNumber: number; // 1-40 (across all passages)

  @Column({
    type: 'enum',
    enum: ReadingQuestionType,
  })
  questionType: ReadingQuestionType;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'jsonb', nullable: true })
  options: string[]; // For multiple choice or matching

  @Column({ type: 'text' })
  correctAnswer: string;

  @Column({ type: 'text', nullable: true })
  instruction: string;

  @CreateDateColumn()
  createdAt: Date;
}
