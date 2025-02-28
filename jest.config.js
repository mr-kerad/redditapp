module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/JSX/TS/TSX files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Transform axios and its submodules
  ],
  moduleNameMapper: {
    '^axios$': '<rootDir>/node_modules/axios/lib/axios.js', // Point to CommonJS version
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};