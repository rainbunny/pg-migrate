export const getTargetVersion = (): string => {
  let targetVersion = (process.argv[3] || '').toLowerCase();
  if (targetVersion.startsWith('--')) {
    targetVersion = '';
  }
  return targetVersion;
};
