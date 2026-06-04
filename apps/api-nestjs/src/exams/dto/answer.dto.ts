import { IsString, IsInt, IsEnum } from 'class-validator';
import { AnswerType } from '../entities/student-answer.entity';

export class SubmitAnswerDto {
  @IsString()
  testId: string;

  @IsEnum(AnswerType)
  answerType: AnswerType;

  @IsString()
  questionId: string;

  @IsInt()
  questionNumber: number;

  @IsString()
  studentAnswer: string;
}

export class BulkSubmitAnswersDto {
  @IsString()
  testId: string;

  answers: SubmitAnswerDto[];
}
