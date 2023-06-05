import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { BoilerPartsService } from './boiler-parts.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearcGetByNameRequest,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartsService: BoilerPartsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.boilerPartsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestSellers() {
    return this.boilerPartsService.bestSellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.boilerPartsService.new();
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.boilerPartsService.findOne(id);
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @UseGuards(AuthenticatedGuard)
  @Get('search')
  search(@Body() { search }: { search: string }) {
    return this.boilerPartsService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: SearcGetByNameRequest })
  @UseGuards(AuthenticatedGuard)
  @Get('name')
  searchbyName(@Body() { name }: { name: string }) {
    return this.boilerPartsService.findOneByName(name);
  }
}
