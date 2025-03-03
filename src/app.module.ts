import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeptosModule } from './deptos/deptos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo:YKuHlwpFckFqtLhYPgWvKPUUXBOywizK@mongodb.railway.internal:27017', {}),
    TaskModule,
    UserModule,
    AuthModule,
    DeptosModule,
    ClientesModule,
    PagosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
