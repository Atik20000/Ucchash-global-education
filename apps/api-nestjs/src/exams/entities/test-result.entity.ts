import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Test } from './test.entity';

export enum TestStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  testId: string;

  @ManyToOne(() => Test, (test) => test.results, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: Test;

  @Column({
    type: 'enum',
    enum: TestStatus,
    default: TestStatus.IN_PROGRESS,
  })
  status: TestStatus;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  // Listening scores
  @Column({ type: 'int', nullable: true })
  listeningScore: number; // Out of 40

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  listeningBand: number; // e.g., 7.5

  // Reading scores
  @Column({ type: 'int', nullable: true })
  readingScore: number; // Out of 40

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  readingBand: number; // e.g., 8.0

  // Writing (manual grading)
  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  writingBand: number; // e.g., 6.5

  // Overall band
  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  overallBand: number;

  // Section completion tracking
  @Column({ type: 'boolean', default: false })
  listeningCompleted: boolean;

  @Column({ type: 'boolean', default: false })
  readingCompleted: boolean;

  @Column({ type: 'boolean', default: false })
  writingCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
