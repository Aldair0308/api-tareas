
// deptos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeptosService } from './deptos.service';
import { DeptosController } from './deptos.controller';
import { DeptoSchema } from './schemas/depto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Depto', schema: DeptoSchema }])],
  controllers: [DeptosController],
  providers: [DeptosService],
})
export class DeptosModule {}