import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/users/schemas/user.schema';
import { Location } from '../src/locations/schemas/location.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let locationModel: Model<Location>;
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    locationModel = moduleFixture.get<Model<Location>>(getModelToken(Location.name));

    await app.init();

    // Clean up database before tests
    await userModel.deleteMany({});
    await locationModel.deleteMany({});
  });

  afterAll(async () => {
    // Clean up database after tests
    await userModel.deleteMany({});
    await locationModel.deleteMany({});
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Weather Dashboard API!');
  });

  describe('Auth', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.name).toBe('Test User');
      expect(response.body.user.email).toBe('test@example.com');

      testUserId = response.body.user.id;
      authToken = response.body.accessToken;
    });

    it('should login a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user.name).toBe('Test User');
      expect(response.body.user.email).toBe('test@example.com');
    });
  });

  describe('Locations', () => {
    let locationId: string;

    it('should create a new location', async () => {
      const response = await request(app.getHttpServer())
        .post('/locations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Amman',
          country: 'Jordan',
          lat: 31.9454,
          lon: 35.9283,
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Amman');
      expect(response.body.country).toBe('Jordan');
      expect(response.body.user.toString()).toBe(testUserId);

      locationId = response.body._id;
    });

    it('should get all locations for user', async () => {
      const response = await request(app.getHttpServer())
        .get('/locations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Amman');
    });

    it('should get a location by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/locations/${locationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body._id).toBe(locationId);
      expect(response.body.name).toBe('Amman');
    });

    it('should update a location', async () => {
      const response = await request(app.getHttpServer())
        .put(`/locations/${locationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Amman Updated',
        })
        .expect(200);

      expect(response.body._id).toBe(locationId);
      expect(response.body.name).toBe('Amman Updated');
      expect(response.body.country).toBe('Jordan');
    });

    it('should delete a location', async () => {
      await request(app.getHttpServer())
        .delete(`/locations/${locationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe('Weather', () => {
    it('should get current weather for a location', async () => {
      const response = await request(app.getHttpServer())
        .get('/weather?location=Amman')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('main');
      expect(response.body).toHaveProperty('weather');
      expect(Array.isArray(response.body.weather)).toBe(true);
    });

    it('should get forecast for a location', async () => {
      const response = await request(app.getHttpServer())
        .get('/weather/forecast?location=Amman')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(Array.isArray(response.body.list)).toBe(true);
      expect(response.body.city).toHaveProperty('name');
    });
  });
});