-- ============================================================
-- Eazy Gym — Database Schema & Seed
-- Run via: bun db/seed.js
-- ============================================================

-- Users (intern must create this table)
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  username    TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  age         INTEGER,
  weight      REAL,
  height      REAL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Plans (pre-seeded, read-only)
CREATE TABLE IF NOT EXISTS plans (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  price       INTEGER NOT NULL, -- in paise (₹1499 = 149900)
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Coupons (pre-seeded)
CREATE TABLE IF NOT EXISTS coupons (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  code             TEXT    NOT NULL UNIQUE,
  discount_percent INTEGER NOT NULL,
  max_uses         INTEGER NOT NULL,
  current_uses     INTEGER NOT NULL DEFAULT 0,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions (intern must design and create this table)
CREATE TABLE IF NOT EXISTS subscriptions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT
  -- TODO: Add columns for user_id, plan_id, coupon_id, final_price, created_at, etc.
);

-- ============================================================
-- Seed Data
-- ============================================================

INSERT OR IGNORE INTO plans (name, price) VALUES
  ('Basic', 149900),
  ('Pro',   299900);

INSERT OR IGNORE INTO coupons (code, discount_percent, max_uses, current_uses) VALUES
  ('WELCOME10', 10, 100, 0),
  ('SUPER50',   50,   5, 0);
