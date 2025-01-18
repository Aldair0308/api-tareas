import { PartialType } from '@nestjs/mapped-types';
import { CreateDeptoDto } from './create-depto.dto';

export class UpdateDeptoDto extends PartialType(CreateDeptoDto) {}
