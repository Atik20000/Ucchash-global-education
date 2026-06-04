import { IsString, IsInt, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ListeningQuestionType } from '../entities/listening-question.entity';

export class CreateListeningQuestionDto {
  @IsString()
  testId: string;

  @IsInt()
  sectionNumber: number;

  @IsInt()
  questionNumber: number;

  @IsEnum(ListeningQuestionType)
  questionType: ListeningQuestionType;

  @IsString()
  questionText: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsString()
  correctAnswer: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  instruction?: string;
}

export class UpdateListeningQuestionDto {
  @IsOptional()
  @IsInt()
  sectionNumber?: number;

  @IsOptional()
  @IsInt()
  questionNumber?: number;

  @IsOptional()
  @IsEnum(ListeningQuestionType)
  questionType?: ListeningQuestionType;

  @IsOptional()
  @IsString()
  questionText?: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsOptional()
  @IsString()
  correctAnswer?: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;

  @IsOptional()
  @IsString()
  instruction?: string;
}
