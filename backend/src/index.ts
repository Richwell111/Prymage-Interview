import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';
import identityRoutes from './routes/identityRoutes.js';
import { logger, errorHandler } from './middleware/appMiddleware.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', identityRoutes);
app.use('/api/tickets', ticketRoutes);

// Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
