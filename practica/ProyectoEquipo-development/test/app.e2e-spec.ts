import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - debe devolver un JWT', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'usuario1', 
        password: '123456',   
      })
      .expect(200);

    expect(loginResponse.body).toHaveProperty('access_token');
    jwtToken = loginResponse.body.access_token;
  });

  it('/profile (GET) - debe devolver el perfil del usuario', async () => {
    const profileResponse = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(profileResponse.body).toHaveProperty('username');
    expect(profileResponse.body.username).toBe('usuario1');
  });

  afterAll(async () => {
    await app.close();
  });
});
