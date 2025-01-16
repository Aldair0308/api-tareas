import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  status: string;

  @IsArray()
  days: string[];

  @IsArray()
  dueDates: Date[];

  @IsArray()
  dueHours: string[];

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsArray()
  photos?: string[];

  @IsOptional()
  @IsArray()
  voiceNotes?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsString()
  responsible: string;

  @IsOptional()
  frequency?: {
    type: string;
    days?: string[];
    times?: string[];
  };
}
