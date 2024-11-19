/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  verbose: true,
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};