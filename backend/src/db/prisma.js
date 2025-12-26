const { PrismaClient } = require('@prisma/client');

const prisma = global.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'test') global.__prisma = prisma;

module.exports = prisma;
