const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('./db/prisma');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../openapi.json');

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

const app = express();
app.use(express.json());
// allow CORS and credentials for local dev (adjust origin in production)
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3001')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
console.log('Allowed origins:', allowedOrigins);
app.use(cors({
  origin: (origin, cb) => {
    console.log('Request from origin:', origin);
    if (!origin) return cb(null, true); // allow non-browser clients
    return allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(cookieParser());
// Swagger UI at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// simple register
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  console.log('Register attempt:', { name, email, hasPassword: !!password });
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const hashed = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({ data: { name, email, password: hashed } });
    console.log('User created successfully:', user.id);
    // don't return password
    const { password: _p, ...safe } = user;
    res.status(201).json({ user: safe });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// login -> returns accessToken
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
  // create a refresh token stored in DB
  const refreshTokenValue = require('crypto').randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await prisma.refreshToken.create({ data: { token: refreshTokenValue, userId: user.id, expiresAt } });
  const { password: _p, ...safe } = user;
  // set httpOnly cookie for refresh token
  res.cookie('refreshToken', refreshTokenValue, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ accessToken: token, user: safe });
});

// refresh endpoint reads refresh token from httpOnly cookie and issues new access token
app.post('/auth/refresh', async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'missing refresh token' });
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored) return res.status(401).json({ error: 'invalid refresh token' });
  if (new Date() > stored.expiresAt) {
    // remove expired token
    await prisma.refreshToken.deleteMany({ where: { token } });
    return res.status(401).json({ error: 'refresh token expired' });
  }
  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user) return res.status(401).json({ error: 'invalid user' });
  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
  // rotate refresh token: create new and delete old
  const newRefreshToken = require('crypto').randomBytes(40).toString('hex');
  const newExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { token: newRefreshToken, userId: user.id, expiresAt: newExpires } });
  await prisma.refreshToken.delete({ where: { token } });
  res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
  const { password: _p, ...safe } = user;
  res.json({ accessToken, user: safe });
});

// logout: clear cookie and delete refresh token from DB
app.post('/auth/logout', async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    try { await prisma.refreshToken.deleteMany({ where: { token } }); } catch (e) {}
  }
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ ok: true });
});

// auth middleware
function authMiddleware(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = h.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// post job
app.post('/jobs', authMiddleware, async (req, res) => {
  const { title, description, location, budget } = req.body || {};
  if (!title || !description) return res.status(400).json({ error: 'title and description required' });
  const data = { title, description, location, budget: budget ? Number(budget) : undefined, postedById: req.userId };
  try {
    const job = await prisma.job.create({ data });
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list jobs
app.get('/jobs', async (req, res) => {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' }, include: { postedBy: true } });
  res.json({ jobs });
});

module.exports = app;
