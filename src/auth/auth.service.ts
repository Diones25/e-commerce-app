import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user || !(await this.verifyPassword(user, password, user.password))) {
      throw new UnauthorizedException('Nome de usuário ou senha inválidos');
    }

    const { password: _, ...userWithoutPassword } = user;
    const accessToken = await this.jwtService.signAsync({
      sub: userWithoutPassword.id,
      username: userWithoutPassword.username
    });

    return {
      message: 'Login realizado com sucesso',
      data: {
        ...userWithoutPassword,
        accessToken,
      },
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);
    const newUser: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    return await this.userService.create(newUser);
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async verifyPassword(user: User, password: string, hashedPassword: string) {
    return user && (await bcrypt.compare(password, hashedPassword));
  }
}
