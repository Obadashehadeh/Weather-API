import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/weather-dashboard';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    await db.collection('users').deleteMany({});
    await db.collection('locations').deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const usersResult = await db.collection('users').insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const adminUserId = usersResult.insertedIds[0];
    const testUserId = usersResult.insertedIds[1];

    const locationsResult = await db.collection('locations').insertMany([
      {
        name: 'Amman',
        country: 'Jordan',
        lat: 31.9454,
        lon: 35.9283,
        user: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'London',
        country: 'UK',
        lat: 51.5074,
        lon: -0.1278,
        user: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'New York',
        country: 'USA',
        lat: 40.7128,
        lon: -74.006,
        user: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seed();