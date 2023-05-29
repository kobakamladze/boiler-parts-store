import { ApiProperty } from '@nestjs/swagger';

// Auth
export class UserLoginRequest {
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'user123' })
  password: string;
}

export class UserLoginResponse {
  @ApiProperty({
    example: { id: 1, username: 'user', password: 'user123' },
  })
  user: { id: number; username: string; password: string };

  @ApiProperty({ example: 'logged in' })
  message: string;
}

export class UserRegisterRequest {
  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'user123' })
  password: number;
}

export class UserRegisterResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: '2023-05-27T09:20:29.975Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-05-27T09:20:29.975Z' })
  updatedAt: string;
}

export class UserLogoutResponse {
  @ApiProperty({
    example: 'session ended',
  })
  message: string;
}

// other
export class UserDataResponse {
  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'user123' })
  password: string;
}
