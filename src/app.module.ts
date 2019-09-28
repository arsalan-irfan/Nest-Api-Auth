import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginController } from './login/login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'a1b2c3d4',
    database: 'Nest',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
