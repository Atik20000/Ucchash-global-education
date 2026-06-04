import { IsString, IsInt, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ReadingQuestionType } from '../entities/reading-question.entity';

export class CreateReadingQuestionDto {
  @IsString()
  passageId: string;

  @IsInt()
  questionNumber: number;

  @IsEnum(ReadingQuestionType)
  questionType: ReadingQuestionType;

  @IsString()
  questionText: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsString()
  correctAnswer: string;

  @IsOptional()
  @IsString()
  instruction?: string;
}

export class UpdateReadingQuestionDto {
  @IsOptional()
  @IsInt()
  questionNumber?: number;

  @IsOptional()
  @IsEnum(ReadingQuestionType)
  questionType?: ReadingQuestionType;

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
  instruction?: string;
}
