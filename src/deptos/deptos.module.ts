
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeptosService } from './deptos.service';
import { DeptosController } from './deptos.controller';
import { DeptoSchema } from './schemas/depto.schema';
import { ClientesModule } from '../clientes/clientes.module';
import { PagosModule } from '../pagos/pagos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Depto', schema: DeptoSchema }]),
    ClientesModule,
    PagosModule
  ],
  controllers: [DeptosController],
  providers: [DeptosService],
})
export class DeptosModule {}