import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  depto: string;

  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
}
