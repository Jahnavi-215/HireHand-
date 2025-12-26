const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// set up test DB file path (ephemeral file in project)
const TEST_DB = path.resolve(__dirname, '../../test.db');
process.env.DATABASE_URL = `file:${TEST_DB}`;
process.env.NODE_ENV = 'test';

// Ensure Prisma client is generated and schema is pushed BEFORE requiring app/prisma
const projectRoot = path.resolve(__dirname, '../../');
try {
  execSync('npx prisma generate', { cwd: projectRoot, stdio: 'inherit', env: { ...process.env, DATABASE_URL: `file:${TEST_DB}` } });
  execSync('npx prisma db push --accept-data-loss', { cwd: projectRoot, stdio: 'inherit', env: { ...process.env, DATABASE_URL: `file:${TEST_DB}` } });
} catch (e) {
  console.warn('prisma setup failed', e.message);
}

const app = require('../../src/app');
const prisma = require('../../src/db/prisma');

afterAll(async () => {
  try { await prisma.$disconnect(); } catch (e) {}
  try { if (fs.existsSync(TEST_DB)) fs.unlinkSync(TEST_DB); } catch (e) {}
});

test('register -> login -> post job -> list job', async () => {
  // register
  const reg = await request(app).post('/auth/register').send({ name: 'Alice', email: 'alice@example.com', password: 'password' });
  expect(reg.status).toBe(201);
  expect(reg.body.user).toBeDefined();

  // login
  const login = await request(app).post('/auth/login').send({ email: 'alice@example.com', password: 'password' });
  expect(login.status).toBe(200);
  expect(login.body.accessToken).toBeDefined();
  const token = login.body.accessToken;

  // post job
  const jobPayload = { title: 'Test Job', description: 'Do something', location: 'Remote', budget: 100 };
  const post = await request(app).post('/jobs').set('Authorization', `Bearer ${token}`).send(jobPayload);
  expect(post.status).toBe(201);
  expect(post.body.job).toBeDefined();
  expect(post.body.job.title).toBe('Test Job');

  // list jobs
  const list = await request(app).get('/jobs');
  expect(list.status).toBe(200);
  expect(Array.isArray(list.body.jobs)).toBe(true);
  const found = list.body.jobs.find(j => j.title === 'Test Job');
  expect(found).toBeDefined();
  expect(found.postedBy).toBeDefined();
  expect(found.postedBy.email).toBe('alice@example.com');
});
