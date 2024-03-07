import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import { testDB } from './config/database';

const app = express();
const port = process.env.SERVER_PORT || 3000;

testDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.send('ModaCal API is up !');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
