import rootPath from '../../root';

const isDeployingOrExecuting = (paths: string[]) => {
  const functionName = process.env.FUNCTION_NAME ?? process.env.K_SERVICE ?? '';
  return (
    !functionName || new RegExp(`^${paths.join('-')}.*$`).test(functionName)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportFunctionsModule = (paths: string[], _exports: any) => {
  if (isDeployingOrExecuting(paths)) {
    const moduleName = paths.slice(-1)[0];
    const modulePath = [rootPath, paths.join('/')].join('/');
    _exports[moduleName] = {
      ...require(modulePath),
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportFunction = (paths: string[], _exports: any, f: () => any) => {
  if (isDeployingOrExecuting(paths)) {
    const functionName = paths.slice(-1)[0];
    _exports[functionName] = f();
  }
};

export { exportFunctionsModule, exportFunction };
