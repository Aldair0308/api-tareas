import { IsNumber, IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @IsNotEmpty()
  depto: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  fecha?: string;
}
