import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Header,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

import {
  UserDataResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserLogoutResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from './types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({ type: UserRegisterRequest })
  @ApiOkResponse({ type: UserRegisterResponse })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async createUser(@Request() req, @Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    if ('password' in createdUser) {
      delete createdUser.password;
    }
    return createdUser;
  }

  @ApiBody({ type: UserLoginRequest })
  @ApiOkResponse({ type: UserLoginResponse })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  login(@Request() req) {
    return { user: req.user, message: 'successfully logged in' };
  }

  @ApiOkResponse({ type: UserDataResponse })
  @Get('/personal-data')
  @UseGuards(AuthenticatedGuard)
  personalData(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: UserLogoutResponse })
  @Get('/logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Request() req) {
    req.session.destroy();
    return { message: 'session ended' };
  }
}
