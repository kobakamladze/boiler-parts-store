import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ShoppingCartItem } from '../shopping-cart/types';

@Injectable()
export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  checkout(cartItems: ShoppingCartItem[]) {
    const totalPriceInUSD = cartItems.reduce(
      (acc, item) => acc + item.total_price,
      0,
    );

    return this.stripe.paymentIntents.create({
      amount: totalPriceInUSD * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }
}
