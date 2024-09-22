import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { testDB } from './config/database';
import vendorRoutes from './routes/vendor.routes';
import buyerRoutes from './routes/buyer.routes';
import appointmentRoutes from './routes/appointment.routes';

const app = express();
const port = process.env.SERVER_PORT || 4200;

testDB();

app.use(cors());
app.use(express.json());
app.use('/api/vendors', vendorRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api', (req, res) => {
  res.send('Calendify API is up !');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
