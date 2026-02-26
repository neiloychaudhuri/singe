# Singe

A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are -- then hypes you up anyway.

## Getting Started

### Prerequisites

- Node.js 18+
- [Google Gemini API key](https://ai.google.dev)
- [Supabase project](https://supabase.com)
- [PostHog project](https://posthog.com) (optional)

### Installation

```bash
npm install
cp .env.local.example .env.local
# Fill in your API keys
```

### Database Setup

1. Open your Supabase project dashboard
2. Go to the SQL editor
3. Paste and run the full contents of `supabase/schema.sql`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Google Gemini API** for AI readouts
- **Supabase** (PostgreSQL) for leaderboard
- **PostHog** for analytics
- **html2canvas** for export cards

## License

MIT
