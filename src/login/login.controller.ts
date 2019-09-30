import { Controller,Get, Request, Post, UseGuards,Body, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from '../auth/auth.service'
import {UsersService} from '../users/users.service'


@Controller('api')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
    ) {}

  @Get('users')
  async getUsers(){
    console.log("here");
    return this.userService.findAll();
  }
  //@UseGuards(AuthGuard('local'))  
  @Post('login')
  async login(@Request() req, @Body() body) {
    console.log("Body" + body.email);
    let user= await this.authService.validateUser(body.email,body.password)    
    if(user !== null)
      return this.authService.login(user);
    else
      return {error:"User Not found"}
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get('user/:email')
  getUser(@Param('email') email) {
    return this.userService.findOneUser(email);
  }
}
