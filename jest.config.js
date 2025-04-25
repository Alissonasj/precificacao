/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/dist/',
    '<rootDir>/logs/'
  ],
  preset: 'ts-jest'
};
