import { Database } from 'bun:sqlite';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || join(__dirname, 'payment.db');
const sqlPath = join(__dirname, 'seed.sql');

const db = new Database(dbPath);

// Drop everything (order matters because of FK references) then reseed from scratch.
db.exec('DROP TABLE IF EXISTS subscriptions');
db.exec('DROP TABLE IF EXISTS coupons');
db.exec('DROP TABLE IF EXISTS plans');
db.exec('DROP TABLE IF EXISTS users');

const sql = readFileSync(sqlPath, 'utf-8');
db.exec(sql);

console.log('♻️  Database reset & reseeded successfully!');
console.log('');
console.log('📋 Plans:');
const plans = db.query('SELECT * FROM plans').all();
plans.forEach((p) => console.log(`   - ${p.name}: ₹${p.price / 100}.00`));
console.log('');
console.log('🎟️  Coupons:');
const coupons = db.query('SELECT * FROM coupons').all();
coupons.forEach((c) => console.log(`   - ${c.code}: ${c.discount_percent}% off (max ${c.max_uses} uses)`));
console.log('');
console.log('📝 Users & subscriptions tables are empty and ready for data.');

db.close();
