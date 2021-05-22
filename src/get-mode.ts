export const getMode = (): 'up' | 'down' => {
  const mode = (process.argv[2] || '').toLowerCase();
  if (!['up', 'down'].includes(mode)) {
    throw new Error(`Invalid migration operation: ${mode}`);
  }
  return mode === 'up' ? 'up' : 'down';
};
