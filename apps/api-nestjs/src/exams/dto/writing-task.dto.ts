import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateWritingTaskDto {
  @IsString()
  testId: string;

  @IsInt()
  taskNumber: number;

  @IsString()
  instruction: string;

  @IsString()
  questionText: string;

  @IsInt()
  wordLimit: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateWritingTaskDto {
  @IsOptional()
  @IsInt()
  taskNumber?: number;

  @IsOptional()
  @IsString()
  instruction?: string;

  @IsOptional()
  @IsString()
  questionText?: string;

  @IsOptional()
  @IsInt()
  wordLimit?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
