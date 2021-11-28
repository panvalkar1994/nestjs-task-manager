import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:54321,
      username:'postgres',
      password:'postgres',
      database:'task-management',
      autoLoadEntities:true,
      synchronize:true,
    }),
    AuthModule
  ],
})
export class AppModule {}
