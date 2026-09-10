import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/coupons — return all coupons
router.get('/', (req, res) => {
  const coupons = db.query('SELECT * FROM coupons').all();
  res.json({ coupons });
});

// POST /api/coupons/validate — validate a coupon code
// Body: { code }
router.post('/validate', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Coupon code is required' });
  }

  // TODO: Look up the coupon by code in the database
  // TODO: If not found, return 404 { error: 'Invalid coupon code' }
  // TODO: If current_uses >= max_uses, return 400 { error: 'Coupon has been fully redeemed' }
  // TODO: Increment current_uses atomically (handle race conditions!)
  // TODO: Return { valid: true, code, discountPercent, remainingUses }

  res.status(501).json({ error: 'Not implemented' });
});

export default router;
