import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  closeDatabaseIntegration,
  databaseIntegrationSetup,
} from './connection';
import { CreatePersonDto } from 'src/dto/create-person.dto';
import {
  createPersonDto,
  createdPerson,
  listPeople,
  getAPerson,
  personToClientDto,
  createAddressDto,
} from './person.mock';

describe('PeopleController (e2e)', () => {
  process.env.MYSQL_DATABASE = 'test_store_db';
  let app: INestApplication;

  beforeAll(async () => {
    const databaseConnection = await databaseIntegrationSetup();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...databaseConnection.options,
            autoLoadEntities: true,
            synchronize: true,
          }),
        }),
      ],
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
      const data: CreatePersonDto = createPersonDto;
      return request(app.getHttpServer())
        .post('/people')
        .send(data)
        .expect(201)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual(createdPerson);
        });
    });
    it('BAD REQUEST 400', async () => {
      const data: CreatePersonDto = createPersonDto;
      return request(app.getHttpServer())
        .post('/people')
        .send(data)
        .expect(400)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            status: 400,
            error: 'Email já cadastrado',
          });
        });
    });
  });
  describe('/people (GET)', () => {
    it('OK 200', async () => {
      return request(app.getHttpServer())
        .get('/people')
        .expect(200)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual(listPeople);
        });
    });
  });
  describe('/people/:id (GET)', () => {
    it('OK 200', async () => {
      return request(app.getHttpServer())
        .get('/people/1')
        .expect(200)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual(getAPerson);
        });
    });
    it('NOT FOUND 404', async () => {
      return request(app.getHttpServer())
        .get('/people/100')
        .expect(404)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            status: 404,
            error: 'ID de Pessoa não encontrado',
          });
        });
    });
  });
  describe('/people/:id (PATCH)', () => {
    it('OK 200', async () => {
      return request(app.getHttpServer())
        .patch('/people/1')
        .expect(200)
        .send({ ...createPersonDto, email: 'baleia@test.com' })
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            message: createdPerson.message,
            data: { ...createdPerson.data, email: 'baleia@test.com' },
          });
        });
    });
    it('NOT FOUND 404', async () => {
      return request(app.getHttpServer())
        .patch('/people/100')
        .send(createPersonDto)
        .expect(404)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            status: 404,
            error: 'ID de Pessoa não encontrado',
          });
        });
    });
  });
  describe('/people/:id (DELETE)', () => {
    it('OK 200', async () => {
      return request(app.getHttpServer())
        .delete('/people/1')
        .expect(200)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            message: 'Success',
            data: 'Pessoa excluída com sucesso!',
          });
        });
    });
    it('NOT FOUND 404', async () => {
      return request(app.getHttpServer())
        .delete('/people/100')
        .expect(404)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            status: 404,
            error: 'ID de Pessoa não encontrado',
          });
        });
    });
  });
  describe('/people/:id/address (POST)', () => {
    it('CREATED 201', async () => {
      const data: CreatePersonDto = createPersonDto;
      return request(app.getHttpServer())
        .post('/people')
        .send(data)
        .then((response) => {
          const body = response.body;
          request(app.getHttpServer())
            .post(`/people/${body.data.id}/address`)
            .send(createAddressDto)
            .expect(201);
        });
    });
    it('BAD REQUEST 400', async () => {
      const data: CreatePersonDto = personToClientDto;
      return request(app.getHttpServer())
        .post('/people')
        .send(data)
        .expect(201)
        .then((response) => {
          const body = response.body;
          return request(app.getHttpServer())
            .post(`/people/${body.data.id}/address`)
            .send({
              street: 'Rua das Capivaras',
              neighborhood: 'Selva Vermelha',
              city: 'São João de Meriti',
              state: 'Rio de Janeiro',
              cep: '23145-789',
            })
            .expect(400)
            .then((res) => {
              const error = res.body.error;
              expect(error).toEqual({
                type: 'INVALID_VALUE',
                message: '"addressNumber" is required',
              });
            });
        });
    });
    it('NOT FOUND 404', async () => {
      return request(app.getHttpServer())
        .post('/people/100/address')
        .send(createAddressDto)
        .expect(404)
        .then((response) => {
          const body = response.body;
          expect(body).toEqual({
            status: 404,
            error: 'ID de Pessoa não encontrado',
          });
        });
    });
  });
});
