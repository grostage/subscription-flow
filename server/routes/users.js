import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/users/:username — get user by username
router.get('/:username', (req, res) => {
  const user = db.query('SELECT * FROM users WHERE username = ?').get(req.params.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

// POST /api/users — create a new user
// Body: { username, name, age?, weight?, height? }
router.post('/', (req, res) => {
  const { username, name, age, weight, height } = req.body;

  if (!username || !name) {
    return res.status(400).json({ error: 'username and name are required' });
  }

  // TODO: Check if username already exists — if so, return 409
  // TODO: Insert the new user into the database
  // TODO: Return { success: true, user: { id, username, name, age, weight, height } }

  res.status(501).json({ error: 'Not implemented' });
});

export default router;
