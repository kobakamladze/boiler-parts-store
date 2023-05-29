import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SequelizeConfigService } from './config/seuqlizeConfig.service';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({ load: [databaseConfig] }),
    UsersModule,
    AuthModule,
    BoilerPartsModule,
    ShoppingCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
