import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// Fetch the most recent active subscription for a user, joined with its plan.
function getActiveSubscription(userId) {
  return db
    .query(
      `SELECT s.id, s.final_price, s.original_price, s.discount_percent,
              s.coupon_code, s.status, s.created_at,
              p.id AS plan_id, p.name AS plan_name, p.price AS plan_price
       FROM subscriptions s
       JOIN plans p ON p.id = s.plan_id
       WHERE s.user_id = ? AND s.status = 'active'
       ORDER BY s.created_at DESC
       LIMIT 1`
    )
    .get(userId);
}

// GET /api/users/:username — get user by username (used for the "remember me" auto-login)
router.get('/:username', (req, res) => {
  const user = db.query('SELECT * FROM users WHERE username = ?').get(req.params.username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const subscription = getActiveSubscription(user.id);
  res.json({ user, subscription: subscription || null });
});

// POST /api/users — create a new user, or resolve an existing one as a "returning user"
// Body: { username, name, age?, weight?, height? }
router.post('/', (req, res) => {
  const { username, name, age, weight, height } = req.body;

  if (!username || !name) {
    return res.status(400).json({ error: 'username and name are required' });
  }

  const trimmedUsername = String(username).trim();

  const existing = db.query('SELECT * FROM users WHERE username = ?').get(trimmedUsername);

  if (existing) {
    // Simplified auth: an existing username means this is a returning user.
    // We don't overwrite their stored profile — just hand it back along with
    // whatever active subscription they already have.
    const subscription = getActiveSubscription(existing.id);
    return res.json({ success: true, existing: true, user: existing, subscription: subscription || null });
  }

  const insert = db
    .query('INSERT INTO users (username, name, age, weight, height) VALUES (?, ?, ?, ?, ?)')
    .run(trimmedUsername, String(name).trim(), age ?? null, weight ?? null, height ?? null);

  const user = db.query('SELECT * FROM users WHERE id = ?').get(insert.lastInsertRowid);

  res.status(201).json({ success: true, existing: false, user, subscription: null });
});

export default router;
