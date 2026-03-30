# Workflow Ideas

A Tinder-style voting app for workflow automation ideas. Swipe right to like, left to dislike.

## Features

- **Swipe to Vote**: Tinder-style card swiping interface
- **1000 SMB-focused workflow ideas**: Curated automation ideas for small/medium businesses
- **Leaderboard**: Top 10 ideas, most active, and category stats
- **12 Categories**: When-Then, Human-Gate, Self-Heal, Smart-Context, and more
- **Real-time voting**: Votes are tracked and cached for performance

## Tech Stack

- **Next.js 16** with App Router
- **Prisma ORM** with PostgreSQL (Neon)
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```
   DATABASE_URL=your_postgres_connection_string
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Seed the database:
   ```bash
   npx tsx prisma/seed.ts
   ```
6. Run the dev server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/workflows` - Fetch workflows (supports `category`, `limit`, `offset`)
- `GET /api/categories` - Fetch all categories with counts
- `POST /api/vote` - Submit a vote (`workflowId`, `voteType: "up" | "down"`)
- `GET /api/leaderboard` - Top ideas, most active, category stats

## License

MIT
