import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService    
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log("Email:"+email);
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  // async login(user: any) {
  //   console.log(user);
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}