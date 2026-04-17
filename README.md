# Prompt Generator Admin

Internal admin console for the Prompt Generator app, built with [Create React App](https://create-react-app.dev/) (React 18, JavaScript), [React Router](https://reactrouter.com/) v6, [Tailwind CSS](https://tailwindcss.com/) v3, [Axios](https://axios-http.com/), and [SWR](https://swr.vercel.app/).

## Scripts

```bash
npm start
```

Runs the app at [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

Creates an optimized production build in `build/`.

## Configuration

- **Tailwind:** `tailwind.config.js` (theme extensions for brand colors, `w-68`, `shadow-soft`, etc.)
- **PostCSS:** `postcss.config.js` (Tailwind + Autoprefixer)
- **API base URL:** `src/utils/apiClient.js` (set to `https://aipromptgenerator.oxmite.com`)

## Routes

| Path | Page |
|------|------|
| `/login` | Sign in |
| `/` | Dashboard |
| `/users` | Users |
| `/usage` | OpenAI usage |
| `/notifications` | Broadcast notifications |
