import app from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/environment.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Bhavya Homes Backend running on port ${config.port} in ${config.nodeEnv} mode`);
  });
};

startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
