import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    return { message: 'User registered successfully', user: registerDto };
  }

  async login(user: { email: string; password: string }) {
    const payload = { userId: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
