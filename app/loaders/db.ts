import { MONGODB_URI } from '../config';
import mongoose from 'mongoose';
import logger from './logger';


export async function initDb() {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection error:', error);
        throw error; // Rethrow the error to be caught in the init function
    }
}
