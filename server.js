import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';

dotenv.config();
const app = express();

// Basic middleware
app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/', (req, res) => res.json({ ok: true, name: 'Cleaning Service Booking API' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Start
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error('Failed to connect DB:', err);
  process.exit(1);
});
