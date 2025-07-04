import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import trackerRoutes from './routes/trackerRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['https://googlemeets.vercel.app', 'http://localhost:3000']
}));


app.use(express.json());
connectDB();

app.use('/', trackerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
