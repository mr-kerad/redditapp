module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/JSX/TS/TSX files
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};