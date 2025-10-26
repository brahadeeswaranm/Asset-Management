import '@testing-library/jest-dom';

// Mock ServiceNow global variables
global.window = global.window || {};
global.window.g_ck = 'mock-user-token';

// Mock fetch for API calls
global.fetch = jest.fn();

// Setup common test utilities
beforeEach(() => {
  fetch.mockClear();
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};