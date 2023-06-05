import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';
import request from 'supertest';

import { databaseConfig } from '../../src/config/configuration';
import { SequelizeConfigService } from '../../src/config/seuqlizeConfig.service';
import { User } from '../../src/users/users.model';
import { UsersModule } from '../../src/users/users.module';

const mockUser = {
  username: 'test2',
  email: 'test@test2',
  password: 'testtest2',
};

describe('User tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true }),
        UsersModule,
      ],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({ where: { email: mockUser.email } });
  });

  it('Registration test', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send(mockUser);
    const recentUser = await User.findByPk(response.body.id);

    const passwordCheck = await compare(mockUser.password, recentUser.password);

    expect(response.body.username).toBe(mockUser.username);
    expect(response.body.email).toBe(mockUser.email);
    expect(passwordCheck).toBe(true);
  });
});
