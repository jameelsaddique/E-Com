const stamp = () => new Date().toISOString();

const write = (level, message) => {
  process.stdout.write(`[${stamp()}] ${level.toUpperCase()} ${message}\n`);
};

export const logger = {
  info: (msg) => write('info', msg),
  warn: (msg) => write('warn', msg),
  error: (msg) => write('error', msg)
};
