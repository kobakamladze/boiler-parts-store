import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) throw new UnauthorizedException('Invalid credentials');

    return user && passwordCheck
      ? {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      : null;
  }
}
