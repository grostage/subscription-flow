import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// POST /api/subscriptions/subscribe
// Body: { userId, planId, couponCode? }
router.post('/subscribe', (req, res) => {
  const { userId, planId, couponCode } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ error: 'userId and planId are required' });
  }

  // TODO: Fetch the plan price from the database
  // TODO: If couponCode is provided, fetch and validate the coupon
  // TODO: Calculate finalPrice after discount
  // TODO: Insert a new row into the subscriptions table
  // TODO: Return { success: true, subscription: { id, userId, planId, finalPrice, ... } }

  res.status(501).json({ error: 'Not implemented' });
});

export default router;
