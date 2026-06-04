import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateReadingPassageDto {
  @IsString()
  testId: string;

  @IsInt()
  passageNumber: number;

  @IsString()
  title: string;

  @IsString()
  passageText: string;
}

export class UpdateReadingPassageDto {
  @IsOptional()
  @IsInt()
  passageNumber?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  passageText?: string;
}
