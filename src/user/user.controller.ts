import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto);
  }
}
