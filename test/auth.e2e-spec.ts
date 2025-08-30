import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "../src/app.module";

describe('Autenticación y perfil (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'DANI',    
        password: 'dani',
      })
      .expect(200);

    token = loginResponse.body.access_token; 

    console.log('Token obtenido:', token); 
  });

  it('/profile (GET) - acceso autorizado con token', async () => {
    const res = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    console.log('Datos perfil:', res.body);

    expect(res.body.username).toEqual('DANI');  
  });

  afterAll(async () => {
    await app.close();
  });
});