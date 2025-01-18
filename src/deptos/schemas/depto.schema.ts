// depto.schema.ts
import { Schema, Document } from '@nestjs/mongoose';

export interface Depto extends Document {
  numero: number;
  precio: number;
  deposito: number;
  luz: Date;
  vencimiento: Date;
  activo: boolean;
}

export const DeptoSchema = new Schema<Depto>({
  numero: { type: Number, required: true },
  precio: { type: Number, required: true },
  deposito: { type: Number, required: true },
  luz: { type: Date, default: Date.now },
  vencimiento: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true },
});
