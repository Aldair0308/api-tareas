// cliente.schema.ts
import { Schema, Document } from 'mongoose';

export interface Cliente extends Document {
  depto: number;
  nombre: string;
  telefono: string;
  fecha: string;
  activo: boolean;
}

export const ClienteSchema = new Schema({
  depto: { type: Number, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha: { type: String, default: new Date().toISOString() },
  activo: { type: Boolean, default: true },
});