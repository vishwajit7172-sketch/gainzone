# 🏋️ GainZone — AI Gym Coach

A full-stack Next.js fitness app powered by **Groq AI** and **Supabase**.  
Built for serious gym-goers who want personalized plans, form guidance, and progress tracking.

---

## ✨ Features

| Feature | Tech |
|---|---|
| AI Form Tips (per exercise) | Groq (llama3-8b) |
| Full Plan Generator (workout + diet) | Groq (llama3-70b) |
| Workout Logger with sets/reps | Supabase |
| Rest Timer with ring countdown | Pure React |
| Body Fat Calculator | Navy + BMI methods |
| Calisthenics Plan Support | Built-in |
| Exercise Library (18 movements) | Local data |
| Responsive (mobile + desktop) | Tailwind |

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your keys:

```env
GROQ_API_KEY=your_groq_key        # https://console.groq.com (free)
NEXT_PUBLIC_SUPABASE_URL=...      # https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY=... # Project Settings → API
```

### 3. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Paste the contents of `supabase-schema.sql` and run it

### 4. Run the app
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting API Keys

### Groq (free, fast)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up → API Keys → Create key
3. Paste into `GROQ_API_KEY`

### Supabase (free tier)
1. Go to [supabase.com](https://supabase.com) → New Project
2. Settings → API
3. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📁 Project Structure

```
gainzone/
├── app/
│   ├── api/
│   │   ├── ai-tips/route.ts        ← Groq: exercise form tips
│   │   └── generate-plan/route.ts  ← Groq: full workout+diet plan
│   ├── page.tsx                    ← Main app with nav
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Dashboard.tsx               ← Today view + quick stats
│   ├── ExerciseLibrary.tsx         ← 18 exercises + AI tips modal
│   ├── PlanBuilder.tsx             ← 3-step form → AI generated plan
│   ├── WorkoutLog.tsx              ← Active logging + Supabase sync
│   ├── RestTimer.tsx               ← Ring countdown timer
│   └── Calculator.tsx              ← Body fat % calculator
├── lib/
│   ├── exercises.ts                ← Exercise data + PPL/Cali programs
│   └── supabase.ts                 ← Supabase client + types
├── supabase-schema.sql             ← Run this in Supabase SQL editor
└── .env.local.example
```

---

## 🏗️ Deploy to Vercel

```bash
# Push to GitHub first, then:
vercel --prod
```

**In Vercel dashboard → Settings → Environment Variables, add:**
- `GROQ_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> ⚠️ Do NOT put these in `vercel.json` — add them via the dashboard only.

---

## 🛣️ Roadmap

- [ ] Auth (Supabase Auth) — per-user plans and logs
- [ ] Progress charts (weight over time)
- [ ] Video exercise demos
- [ ] Apple Health / Google Fit sync
- [ ] Macro tracking with food search
- [ ] Workout sharing / social

---

## 🧱 Stack

- **Next.js 14** (App Router)
- **Groq SDK** — llama3-8b (tips) + llama3-70b (plan gen)
- **Supabase** — Postgres + real-time
- **Tailwind CSS** — styling
- **Barlow Condensed + DM Sans** — typography
