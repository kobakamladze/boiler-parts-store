import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { ShoppingCartService } from './shopping-cart.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  GetAllCartItemsResponse,
  UpdateCountRequest,
  UpdateCountResponse,
  addItemToCartResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllCartItemsResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get('get/:id')
  getAll(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.findAllItems(id);
  }

  @ApiBody({ type: AddToCartDto })
  @ApiOkResponse({ type: addItemToCartResponse, status: 201 })
  @UseGuards(AuthenticatedGuard)
  @Post('add')
  add(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.addItem(addToCartDto);
  }

  @ApiBody({ type: UpdateCountRequest })
  @ApiOkResponse({ type: UpdateCountResponse })
  @UseGuards(AuthenticatedGuard)
  @Put('count/:id')
  updateCount(
    @Param('id', ParseIntPipe) id: number,
    @Body() { count }: { count: number },
  ) {
    return this.shoppingCartService.updateItemCount({ partId: id, count });
  }

  @ApiOkResponse({ status: 200 })
  @UseGuards(AuthenticatedGuard)
  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.removeItem(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('clean-up/:id')
  cleanUp(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingCartService.findAllItems(id);
  }
}
