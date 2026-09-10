# 🏋️ Eazy Gym — Intern Coding Challenge

> ⏰ **You have exactly 2 hours. Late submissions will not be accepted.**

---

## Your Mission

The frontend UI is already built. Your job is to **build the backend, connect the database, and wire it all up** so the app works end-to-end.

You may use **AI tools** (ChatGPT, Copilot, Cursor, etc.) — we care about the result, not the method. Ship fast, ship clean.

---

## ⚙️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Express + Bun |
| Database | SQLite (via `bun:sqlite`) |
| Runtime | [Bun](https://bun.sh/) |

---

## 🚀 Getting Started

### 0. Install Bun (if you don't have it)

Bun is the runtime used for both the backend and package management.

**macOS / Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

After installing, restart your terminal and verify:
```bash
bun --version
```

---

### 1. Fork the repo
Fork this repository to your own GitHub account.

### 2. Clone your fork & create a branch
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
git checkout -b solution/<your-name>
# example: git checkout -b solution/john-doe
```

### 3. Setup (run this once)
```bash
bun run setup
```

This does **three things automatically**:
1. Creates `.env` files from the templates
2. Installs all dependencies (`bun install`)
3. Creates the SQLite database and seeds it with Plans & Coupons

> ⚠️ You must run `bun run setup` before anything else. Without it there is no database and the server won't start.

If you need to re-seed or reset the DB manually:
```bash
bun run db:seed    # seed the database (creates tables + inserts plans & coupons)
bun run db:reset   # drop everything and re-seed from scratch
```

You'll see this output on successful seed:
```
✅ Database seeded successfully!

📋 Plans:
   - Basic: ₹1499.00
   - Pro: ₹2999.00

🎟️  Coupons:
   - WELCOME10: 10% off (max 100 uses)
   - SUPER50: 50% off (max 5 uses)

📝 Subscriptions table is empty and ready for data.
```


### 4. Start the dev servers
```bash
bun run dev
```

| Server | URL | Status after setup |
|--------|-----|--------------------|
| Frontend | http://localhost:3000 | ✅ UI loads |
| Backend | http://localhost:3001 | ✅ Starts, plans & coupons queryable |

**What works out of the box:**
- `GET /api/plans` → returns Basic & Pro plans from the DB ✅
- `GET /api/coupons` → returns WELCOME10 & SUPER50 from the DB ✅
- `POST /api/users` → returns `501 Not Implemented` ❌ (your job)
- `POST /api/coupons/validate` → returns `501 Not Implemented` ❌ (your job)
- `POST /api/subscriptions/subscribe` → returns `501 Not Implemented` ❌ (your job)

### 5. Build, then push
```bash
git add .
git commit -m "solution: your name"
git push origin solution/<your-name>
```

> Submit the **branch link** before the 2-hour deadline. No extensions.

---

## 📋 What You Need to Build

The frontend pages are complete with dummy/placeholder data. Your task is to replace the placeholders with **real functionality**.

### Page 1 — Profile (`/profile`)
- On submit, call `POST /api/users` to create the user in the database
- Save: `username`, `name`, `age`, `weight`, `height`
- If the **username already exists**, treat it as a returning user:
  - Show a **"Welcome back, [Name]!"** message
  - Display their saved profile details (name, age, weight, height)
  - Display their **active subscription plan** and price
- Navigate to `/plan` for new users

### Page 2 — Plan Selection (`/plan`)
- Fetch plans from `GET /api/plans` (pre-seeded in DB)
- Let the user select one plan
- Store the selected plan to pass to the Summary page
- A plan **must** be selected to proceed

### Page 3 — Coupon (`/coupon`)
- Call `POST /api/coupons/validate` with the entered code
- If valid: show the discount percentage and remaining uses **after** applying
- If invalid or exhausted: show an error
- When a coupon is applied:
  - Decrement `current_uses` in the database
  - When `current_uses >= max_uses`, the coupon must be **rejected** for the next user — handle race conditions

### Page 4 — Summary (`/summary`)
- Show real data: user info, selected plan, applied coupon (if any)
- Calculate and display the **final price after discount**
- On "Complete Purchase", call `POST /api/subscriptions/subscribe`
- On success, redirect to `/profile` — the user should now see the **Welcome Back** view with their plan

---

## 🗄️ Database (already seeded)

### Pre-seeded Plans
| Name | Price |
|------|-------|
| Basic | ₹1,499 / month |
| Pro | ₹2,999 / month |

### Pre-seeded Coupons
| Code | Discount | Max Uses |
|------|----------|----------|
| WELCOME10 | 10% off | 100 |
| SUPER50 | 50% off | 5 |

### Tables to implement
- `users` — created by you
- `subscriptions` — created by you (schema is your design)

See `GETTING_STARTED.md` for the full schema reference.

---

## ✅ Evaluation Criteria

| Criteria | Weight |
|----------|--------|
| All features working end-to-end | High |
| Coupon validation + race condition handling | High |
| Returning user flow (welcome back + plan shown) | High |
| Code clarity and structure | Medium |
| Delivered within 2 hours | Required |

---

## 📁 Project Structure

```
├── client/          ← Frontend (React + Vite) — already built
│   └── src/
│       ├── pages/   ← Profile, Plan, Coupon, Summary
│       └── api/     ← Wire these up to your backend
│
└── server/          ← Backend (Express + Bun) — you build this
    ├── index.js
    ├── db.js
    └── routes/
```

> **Tip:** Read `GETTING_STARTED.md` for API endpoint specs and DB schema details before you start.

---

Good luck. 🚀
