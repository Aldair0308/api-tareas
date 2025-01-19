import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsString()
  tipo?: string;
  
  @IsOptional()
  @IsString()
  depto?: string;
  
  @IsOptional()
  @IsString()
  cliente?: string;
  
  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsDate()
  fecha?: Date;
}
