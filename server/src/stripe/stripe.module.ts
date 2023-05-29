import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
