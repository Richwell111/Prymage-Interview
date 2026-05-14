const logger = {
  info: (message: string, ...details: any[]) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, ...details);
  },
  warn: (message: string, ...details: any[]) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, ...details);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error || '');
  }
};

export default logger;
