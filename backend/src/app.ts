import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import planRoutes from './routes/plan.route';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);

export default app;