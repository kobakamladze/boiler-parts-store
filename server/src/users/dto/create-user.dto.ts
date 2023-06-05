import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'user@email.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user123' })
  @IsNotEmpty()
  password: string;
}
