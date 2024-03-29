/* eslint-disable */
export default {
  displayName: 'api-data-access-user-user',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/api/data-access/user/user',
  preset: '../../../../jest.preset.js',
};
