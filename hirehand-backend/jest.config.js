module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.int.test.js'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text', 'lcov']
};
