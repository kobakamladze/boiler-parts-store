import { ApiProperty } from '@nestjs/swagger';

export class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  partId: number;

  @ApiProperty({ example: 'Aliquid alias.' })
  name: string;

  @ApiProperty({ example: 3 })
  price: number;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 3 })
  total_price: number;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({
    example:
      'https://loremflickr.com/640/480/technics?random=849581742306099411950399951214',
  })
  image: string;

  @ApiProperty({ example: 'Salmon' })
  parts_manufacturer: string;

  @ApiProperty({ example: 'Henry' })
  boiler_manufacturer: string;

  @ApiProperty({ example: '2023-03-19T12:45:51.240Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-03-19T12:45:51.240Z' })
  updatedAt: string;
}

export class GetAllCartItemsResponse extends ShoppingCartItem {}

export class addItemToCartResponse extends ShoppingCartItem {}

export class UpdateCountRequest {
  @ApiProperty({ example: 4 })
  count: number;
}
export class UpdateCountResponse extends ShoppingCartItem {
  @ApiProperty({ example: 4 })
  count: number;

  @ApiProperty({ example: 12 })
  total_price: number;
}
