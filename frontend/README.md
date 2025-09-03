# Frontend – React + Apollo Client

## Overview
React app built with Vite. Provides city search and a 7‑day activity forecast. Apollo Client manages GraphQL requests and caching.

## Key Decisions
- Apollo Client: minimal client setup with HttpLink. Provider at app root.
- Components: small containers (search, results, forecast) for separation of concerns.
- Styling: single App.css with semantic classes.

## Available Scripts
- npm run dev – local dev server (Vite)
- npm run build – type‑check and build
- npm run preview – serve the production build

## Environment
- VITE_GRAPHQL_HTTP – GraphQL endpoint (defaults to http://localhost:4000 in Docker runtime).
