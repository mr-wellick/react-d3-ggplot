module.exports = {
  collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 75
    }
  }
};
