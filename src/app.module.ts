import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginController } from './login/login.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
