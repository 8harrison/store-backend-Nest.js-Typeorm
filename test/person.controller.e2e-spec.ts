import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  closeDatabaseIntegration,
  databaseIntegrationSetup,
} from './connection';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';

describe('PeopleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const databaseConnection = await databaseIntegrationSetup();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRoot(databaseConnection.options)],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await closeDatabaseIntegration();
  });

  describe('/people (POST)', () => {
    it('CREATED 201', async () => {
      const data: CreatePersonDto = {
        firstName: 'Cachalote',
        lastName: 'Baleia',
        cpf: '123.456.789-44',
        email: 'cachalote@test.com',
        password: '12345678',
        phone: '(52)98875-4321',
      };
      return request(app.getHttpServer())
        .post('/people')
        .send(data)
        .expect(201);
    });
    it('should be defined', async () => {
      expect(app).toBeDefined();
    });
  });
  describe('/people (GET)', () => {
    it('OK 200', async () => {
      return request(app.getHttpServer()).get('/people').expect(200);
    });
  });
});
