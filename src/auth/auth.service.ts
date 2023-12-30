import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) throw new UnauthorizedException('user not found');
    if (user?.password !== pass) {
      throw new UnauthorizedException('password not correct');
    }

    const payload = { sub: user.id, username: user.account };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
