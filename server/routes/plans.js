import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/plans — return all plans
router.get('/', (req, res) => {
  const plans = db.query('SELECT * FROM plans').all();
  res.json({ plans });
});

// GET /api/plans/:id — return a single plan
router.get('/:id', (req, res) => {
  const plan = db.query('SELECT * FROM plans WHERE id = ?').get(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json({ plan });
});

export default router;
