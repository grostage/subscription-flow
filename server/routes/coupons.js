import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/coupons — return all coupons
router.get('/', (req, res) => {
  const coupons = db.query('SELECT * FROM coupons').all();
  res.json({ coupons });
});

// POST /api/coupons/validate — validate a coupon code and redeem one use of it
// Body: { code }
router.post('/validate', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Coupon code is required' });
  }

  const normalizedCode = String(code).trim().toUpperCase();

  const coupon = db.query('SELECT * FROM coupons WHERE code = ?').get(normalizedCode);
  if (!coupon) {
    return res.status(404).json({ error: 'Invalid coupon code' });
  }

  // Race-condition-safe redemption: this single UPDATE only succeeds if
  // current_uses is still below max_uses at the moment it runs. SQLite
  // serializes writes to a database file, so if two requests for the same
  // coupon arrive at (near) the same time, they cannot both pass this check
  // and both increment the counter past max_uses — whichever commits second
  // will see current_uses already at the limit and simply get changes: 0.
  // This is safer than "SELECT count, check in JS, then UPDATE" which has a
  // window between the read and the write where two concurrent requests
  // could both read a stale count and both think they're allowed through.
  const result = db
    .query('UPDATE coupons SET current_uses = current_uses + 1 WHERE code = ? AND current_uses < max_uses')
    .run(normalizedCode);

  if (result.changes === 0) {
    return res.status(400).json({ error: 'Coupon has been fully redeemed' });
  }

  const updated = db.query('SELECT * FROM coupons WHERE code = ?').get(normalizedCode);

  res.json({
    valid: true,
    code: updated.code,
    discountPercent: updated.discount_percent,
    remainingUses: updated.max_uses - updated.current_uses,
  });
});

export default router;
