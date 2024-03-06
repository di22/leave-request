module.exports = {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup-jest.ts"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/e2e-tests/",
    "<rootDir>/tests-examples/"
  ],
  "moduleNameMapper": {
    "@core(.*)": "<rootDir>/src/app/core/$1",
    "@domain(.*)": "<rootDir>/src/app/domain/$1",
    "@shared(.*)": "<rootDir>/src/app/shared/$1",
  },
  "transform": {
    "^.+\\\\.ts?$": [
      "ts-jest",
      {
        "tsConfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    ]
  }
};