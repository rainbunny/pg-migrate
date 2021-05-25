jest.mock('pg', () => {
  const mClient = {
    query: jest.fn().mockReturnValue(Promise.resolve({})),
    release: jest.fn(),
  };
  const mPool = {
    connect: async () => mClient,
  };
  return {
    Pool: jest.fn(() => mPool),
  };
});

jest.mock('fs', () => {
  const readdirSync = jest.fn();
  const readFileSync = jest.fn();
  return {
    readdirSync,
    readFileSync,
  };
});

export {};
