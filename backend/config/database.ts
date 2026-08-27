import mongoose from 'mongoose';
import { config } from './environment.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Atlas connection timeout / error: ${error}`);
    console.log('Attempting connection to local MongoDB instance...');
    try {
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/test', {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
    } catch (localErr) {
      console.warn(`Local MongoDB not available. Continuing with fallback storage.`);
    }
  }
};
