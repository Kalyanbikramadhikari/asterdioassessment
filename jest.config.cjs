module.exports = {
    // preset: 'vite',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
  };
  