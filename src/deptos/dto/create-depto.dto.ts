import { IsDateString, IsNumber, IsBoolean } from 'class-validator';

export class CreateDeptoDto {
  @IsNumber()
  numero: number;

  @IsNumber()
  precio: number;

  @IsNumber()
  deposito: number;

  @IsDateString()
  luz?: string;

  @IsDateString()
  vencimiento?: string;

  @IsBoolean()
  activo?: boolean;
}
