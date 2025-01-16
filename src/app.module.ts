import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tareas', {}),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
