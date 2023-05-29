import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  // sessions and passport setup
  app.use(
    session({ secret: 'secret', resave: false, saveUninitialized: false }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Boilerparts store')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
