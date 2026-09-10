import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import plansRouter from './routes/plans.js';
import couponsRouter from './routes/coupons.js';
import subscriptionsRouter from './routes/subscriptions.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/plans', plansRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
