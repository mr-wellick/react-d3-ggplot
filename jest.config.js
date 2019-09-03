module.exports = {
  testEnvironment: 'jest-environment-node',
  collectCoverageFrom: ['**/src/**/*'],
  coverageThreshold: {
    global: {
      statements: 5,
      branches: 0,
      functions: 5,
      lines: 5
    }
  }
};
