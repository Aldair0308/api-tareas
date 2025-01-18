import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeptosModule } from './deptos/deptos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:YKuHlwpFckFqtLhYPgWvKPUUXBOywizK@mongodb.railway.internal:27017', {}),
    TaskModule,
    UserModule,
    AuthModule,
    DeptosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
