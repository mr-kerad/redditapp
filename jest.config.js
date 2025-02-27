module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/JSX/TS/TSX files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|axios/.*)', // Transform axios and its submodules
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Ensure correct axios resolution
  },
  testEnvironment: 'jsdom', // For React DOM testing
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Load Jest DOM extensions
};