# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Coletivo Gestação**, an Afro-perspective black theater collective from Rondonópolis, MT, Brazil. The site showcases their main production "Gestação de Cam" — a theatrical performance about memory, ancestry, and Black women's experiences.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
```

No test or lint commands are configured.

## Architecture

The entire application lives in **`src/App.jsx`** (~838 lines) — a single-file React SPA. There is no routing library; navigation uses smooth scroll to section IDs with active-section tracking via scroll events.

**Component structure within App.jsx** (top to bottom):
- `AdinkraSymbol`, `StarDecor` — SVG decorative components
- `useInView` — custom hook using Intersection Observer (15% threshold) for scroll-triggered animations
- `Nav` — fixed navbar with mobile hamburger menu (breakpoint: 768px)
- `Home`, `Coletivo`, `Espetaculo`, `Premios`, `Imprensa`, `Contato`, `Footer` — page sections
- `SectionTitle` — reusable section heading
- `App` — root component; renders all sections in sequence

**Styling**: All styles are inline `style` objects. No CSS files, no CSS-in-JS library. The `COLORS` constant at the top of App.jsx defines the design system (dark `#0A0A0A` background, gold `#D4930D` accent, cream `#F5E6C8` text). Fonts (Playfair Display + DM Sans) are loaded via Google Fonts in a `<style>` tag inside `index.html`.

**Responsive design**: uses `clamp()` for fluid sizing; hamburger menu below 768px.

**Content**: All text content (cast bios, awards, festival history, press quotes, contact info) is hardcoded in JSX inside the relevant section components.

## Deployment

Hosted on Vercel with auto-detection of Vite. Push to GitHub triggers automatic deployment. Build command: `npm run build`, output: `dist/`.

Images go in `public/images/` (currently placeholders).
