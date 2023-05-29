import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaymentDto {
  @ApiProperty({ example: 'ivan' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 10000,
    description: 'amount of price should be converted into cents',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
