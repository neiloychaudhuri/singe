-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Main leaderboard table
create table leaderboard (
  id          uuid        default gen_random_uuid() primary key,
  device_id   uuid        not null,
  score       integer     not null check (score >= 0 and score <= 100),
  tier        text        not null,
  username    text,
  created_at  timestamptz default now()
);

-- Indexes for fast queries
create index leaderboard_score_idx     on leaderboard (score desc);
create index leaderboard_device_idx    on leaderboard (device_id);
create index leaderboard_created_idx   on leaderboard (created_at desc);

-- View: best score per device (deduplicates for leaderboard display)
create view leaderboard_best as
  select distinct on (device_id)
    device_id,
    score,
    tier,
    username,
    created_at
  from leaderboard
  order by device_id, score desc;

-- View: top 50 all-time
create view leaderboard_top50 as
  select
    row_number() over (order by score desc) as rank,
    device_id,
    score,
    tier,
    username,
    created_at
  from leaderboard_best
  order by score desc
  limit 50;

-- Row Level Security
alter table leaderboard enable row level security;

-- Public: can insert scores
create policy "allow public insert"
  on leaderboard for insert
  to anon
  with check (true);

-- Public: can read scores (leaderboard display)
create policy "allow public select"
  on leaderboard for select
  to anon
  using (true);
