import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateTestDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  listeningDuration?: number;

  @IsOptional()
  @IsInt()
  readingDuration?: number;

  @IsOptional()
  @IsInt()
  writingDuration?: number;
}

export class UpdateTestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  listeningDuration?: number;

  @IsOptional()
  @IsInt()
  readingDuration?: number;

  @IsOptional()
  @IsInt()
  writingDuration?: number;
}
