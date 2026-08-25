import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { apiLimiter } from './middleware/rateLimit.middleware.js';

const app: Application = express();

// Middlewares
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api', apiLimiter);

// Base route check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Bhavya Homes API is healthy' });
});

// API routes
app.use('/api', routes);

// Centralized error handler
app.use(errorHandler);

export default app;
