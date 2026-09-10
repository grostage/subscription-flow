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

  const user = db.query('SELECT * FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const plan = db.query('SELECT * FROM plans WHERE id = ?').get(planId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  // The coupon's usage count was already atomically decremented (incremented)
  // during POST /api/coupons/validate on the Coupon step. We just look it up
  // here to snapshot the discount on the subscription row — we deliberately
  // do NOT touch current_uses again, otherwise a single applied coupon would
  // consume two redemptions.
  let coupon = null;
  if (couponCode) {
    coupon = db.query('SELECT * FROM coupons WHERE code = ?').get(String(couponCode).trim().toUpperCase());
  }

  const discountPercent = coupon ? coupon.discount_percent : 0;
  const originalPrice = plan.price;
  const finalPrice = Math.round((originalPrice * (100 - discountPercent)) / 100);

  const insert = db
    .query(
      `INSERT INTO subscriptions
         (user_id, plan_id, coupon_id, coupon_code, original_price, discount_percent, final_price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`
    )
    .run(user.id, plan.id, coupon ? coupon.id : null, coupon ? coupon.code : null, originalPrice, discountPercent, finalPrice);

  const subscription = db.query('SELECT * FROM subscriptions WHERE id = ?').get(insert.lastInsertRowid);

  res.status(201).json({
    success: true,
    subscription: { ...subscription, plan_name: plan.name },
  });
});

export default router;
