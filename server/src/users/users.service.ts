import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
    attributes?: any;
  }): Promise<User> {
    return this.userModel.findOne({
      ...filter,
    });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const suchUserAlreadyExistsByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });
    if (suchUserAlreadyExistsByEmail)
      return { warningMessage: 'Email is already taken' };

    const newUser = new User();
    const hashedPassword = await hash(createUserDto.password, 10);
    newUser.password = hashedPassword;
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;

    await newUser.save();

    return this.findOne({
      where: { email: createUserDto.email, username: createUserDto.username },
      attributes: { exclude: 'password' },
    });
  }
}
