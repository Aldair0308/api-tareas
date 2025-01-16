import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  days?: string[];

  @IsOptional()
  @IsArray()
  dueDates?: Date[];

  @IsOptional()
  @IsArray()
  dueHours?: string[];

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

  @IsOptional()
  @IsString()
  responsible?: string;

  @IsOptional()
  frequency?: {
    type: string;
    days?: string[];
    times?: string[];
  };
}
