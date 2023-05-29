import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

class BoilerPart {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  boiler_manufacturer: string;

  @ApiProperty({ example: 12345 })
  price: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  parts_manufacturer: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  description: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  compatibility: string;

  @ApiProperty({ example: `[${faker.image.city()}]` })
  images: string;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({ example: true })
  bestseller: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 123 })
  popularity: number;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: BoilerPart, isArray: true })
  rows: BoilerPart;
}

export class Bestsellers extends BoilerPart {
  @ApiProperty({ example: true })
  bestseller: boolean;
}
export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: BoilerPart, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends BoilerPart {
  @ApiProperty({ example: true })
  new: boolean;
}
export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: BoilerPart, isArray: true })
  rows: NewParts;
}

class SearchByLetterResponse extends BoilerPart {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}
export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}
export class SearchRequest {
  @ApiProperty({ example: 'r' })
  search: string;
}

class BoilerPartByName extends BoilerPart {
  @ApiProperty({ example: 'Doloremque reiciendis.' })
  name: string;
}
export class GetByNameResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: BoilerPartByName, isArray: true })
  rows: BoilerPartByName;
}
export class SearcGetByNameRequest {
  @ApiProperty({ example: 'Doloremque reiciendis.' })
  name: string;
}

export class FindOneResponse extends BoilerPart {}

export interface IBoilerParts {
  limit: string;
  offset: string;
}
