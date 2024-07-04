import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RegisterUserDto } from './auth/dto/register-user.dto';
import { LoginUserDto } from './auth/dto/login-user.dto';
import { CustomException } from './exceptions/custom.exception';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.create(registerUserDto);
    return user;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
    if (!user) {
      throw new CustomException();
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req;
  }
}
