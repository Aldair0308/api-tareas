import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], required: true })
  days: string[]; // ['lunes', 'miércoles']

  @Prop({ type: [Date] })
  dueDates: Date[]; // ['2025-01-15T10:00:00Z', '2025-01-17T15:00:00Z']

  @Prop({ type: [String] })
  dueHours: string[]; // ['10:00', '15:00']

  @Prop()
  icon: string; // URL o nombre del icono

  @Prop({ type: [String] })
  photos: string[]; // URLs de fotos asociadas

  @Prop({ type: [String] })
  voiceNotes: string[]; // URLs de notas de voz

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Map, of: String })
  metadata: Map<string, string>; // Metadatos adicionales, si se necesitan

  @Prop({ required: true })
  responsible: string; // ID del usuario responsable

  @Prop({
    type: {
      type: String, // daily, weekly, custom
      required: true,
    },
    days: { type: [String], required: false }, // Frecuencia personalizada, días específicos
    times: { type: [String], required: false }, // Horarios personalizados
  })
  frequency: {
    type: string;
    days?: string[];
    times?: string[];
  };
}

export const TaskSchema = SchemaFactory.createForClass(Task);
