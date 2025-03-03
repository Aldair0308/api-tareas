
// clientes.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ClienteSchema } from './schemas/cliente.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cliente', schema: ClienteSchema }])],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
