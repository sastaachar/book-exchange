interface Logger {
  log: typeof console.log;
}

const loggers: { [key: string]: Logger } = {};
export const getLogger = (module: string): Logger => {
  if (loggers[module]) return loggers[module];
  const initTime = Date.now();
  console.info(`Creating logger : [${module} : ${initTime / 1000}s] `);
  loggers[module] = {
    log: (...args) => {
      const timeElapsed = (Date.now() - initTime) / 1000;
      console.log(...[`[${module} : ${timeElapsed}s]`, ...args]);
    },
  };

  return loggers[module];
};
