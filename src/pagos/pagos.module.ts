import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { PagoSchema } from './schemas/pago.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pago', schema: PagoSchema }])],
  controllers: [PagosController],
  providers: [PagosService],
  exports: [PagosService]
})
export class PagosModule {}
