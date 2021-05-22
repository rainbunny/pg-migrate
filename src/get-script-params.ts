export const getScriptParams = (): {params: {[name: string]: string}} => {
  const {argv} = process;
  const params: {[name: string]: string} = {};

  argv.forEach((str, index, argvArr) => {
    if (str.startsWith('--') && argvArr.length > index + 1) {
      const paramName = str.replace('--', '');
      params[paramName] = argvArr[index + 1];
    }
  });

  return {params};
};
