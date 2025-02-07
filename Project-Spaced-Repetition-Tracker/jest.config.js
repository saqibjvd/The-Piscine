export default {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js']
};

