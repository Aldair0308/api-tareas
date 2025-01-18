import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsNumber()
  depto?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDate()
  fecha?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
