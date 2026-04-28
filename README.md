# Pantry Planner

Personal meal planner + macro tracker for Manny.

## What lives where

- `src/App.jsx` — the React app (UI, state, localStorage)
- `src/main.jsx` — boots the app
- `api/generate.js` — Vercel serverless function. Holds the Anthropic API key and forwards meal-gen requests so the key never reaches the browser.
- `index.html` — page shell, PWA meta tags for iPhone "Add to Home Screen"
- `public/manifest.webmanifest` — PWA manifest
- `public/icon.svg` — app icon (replace anytime)
- `vite.config.js` / `package.json` — build setup

## Environment variable (set this in Vercel)

`ANTHROPIC_API_KEY` — your key from console.anthropic.com.

## Local development (optional, needs Node.js)

```
npm install
npm run dev
```

Note: the `/api/generate` proxy only works on Vercel (or with `vercel dev`), not with plain `npm run dev`.
