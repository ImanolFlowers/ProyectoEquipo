import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Enfrentamientos (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let equipo1Id: number;
  let equipo2Id: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // perimero logeamos quien creara los partidos para que tenga el permiso
    //en este caso como el admoinistrador arbitro es quien se encarga de esos, colocamos la contra y user
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'IMA',
        password: 'ima',
      })
      .expect(200);

    token = loginResponse.body.access_token;

    // toom una lista de los equipoc agregados
    const equiposResponse = await request(app.getHttpServer())
      .get('/equipos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const equipos = equiposResponse.body;

    // de ejemplos solo tomare 2 id que son las primeras
    equipo1Id = equipos[0].id;
    equipo2Id = equipos[1].id;
  });

  it('/enfrentamientos (POST) - crear un enfrentamiento', async () => {
    const nuevoEnfrentamiento = {
      equipoLocalId: equipo1Id,
      equipoVisitanteId: equipo2Id,
      lugar: 'Ayutla',
      fecha: '25-08-2025',
      hora: '18:00',
    };

    const res = await request(app.getHttpServer())
      .post('/enfrentamientos')
      .set('Authorization', `Bearer ${token}`)
      .send(nuevoEnfrentamiento)
      .expect(201);

    console.log('Enfrentamiento creado:', res.body);

    // validaciones para que lo que esperamos como respuesta tenga ciertas propiedades
    expect(res.body).toHaveProperty('equipoLocal');
    expect(res.body).toHaveProperty('equipoVisitante');
    expect(res.body.lugar).toBe('Ayutla');
  });

  afterAll(async () => {
    await app.close();
  });
});
