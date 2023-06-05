import { Controller, Body, Post } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { ShoppingCartItem } from '../shopping-cart/types';

@Controller('payment')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout')
  checkout(@Body() data: ShoppingCartItem[]) {
    try {
      return this.stripeService.checkout(data);
    } catch (e) {
      console.log(e);
    }
  }
}
