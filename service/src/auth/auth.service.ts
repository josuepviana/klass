import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export type UserDetails = Pick<User, "id" | "name" | "username">

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<UserDetails> {
    const user = await this.usersService.findOne(username);


    if (user && this.hashingService.validate(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserDetails): Promise<any> {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
