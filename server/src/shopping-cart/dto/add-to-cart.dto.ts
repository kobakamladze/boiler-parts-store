import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'ivan' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  partId: number;
}
