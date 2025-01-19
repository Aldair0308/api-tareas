import { Schema, Document } from 'mongoose';

export interface Pago extends Document {
  monto: number;
  tipo: string;
  depto: string;
  cliente: string;
  telefono: string;
  activo: boolean;
  fecha: Date;
}

export const PagoSchema = new Schema({
  monto: { type: Number, required: true },
  tipo: { type: String, required: true },
  depto: { type: String, required: true },
  cliente: { type: String, required: true },
  telefono: { type: String, required: true },
  activo: { type: Boolean, default: true },
  fecha: { type: Date, default: Date.now },
});
