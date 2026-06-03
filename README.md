# The Akshansh Experience

A cinematic atmospheric poetry platform. Writing as presence, not content.

## Overview

The Akshansh Experience is a curated digital literary world where poetry is experienced as emotional presence. It features two atmospheric worlds — Midnight Snowfall and The Page — with ambient sound, particle systems, and cinematic design.

## Features

- Dual atmospheric themes: Midnight Snowfall (dark) and The Page (light)
- Animated particle systems: snowfall and thunderstorm rain
- Ambient sound system with theme-aware tracks
- Full poem archive with mood-based filtering
- Curated collections (Archives of Solitude)
- Supabase authentication (Google OAuth + Magic Link)
- Likes, saves, and poem submissions
- User dashboard
- Canvas-generated Instagram share cards
- Fully responsive

## Stack

- React + TanStack Start + TanStack Router
- TailwindCSS + Framer Motion
- Supabase (Auth + Database)
- Howler.js (Audio)
- Vite

## Getting Started

```bash
npm install
cp .env.example .env
# Add your Supabase credentials to .env
npm run dev
```

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

Deployed on Vercel. Connect your GitHub repository and add environment variables in the Vercel dashboard.

---
*Writing as presence, not content.*