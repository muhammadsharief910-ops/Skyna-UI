# Skyna — a little room for wonder

A complete responsive React homepage inspired by the approved Skyna visual concept: cinematic landscapes, warm ivory, forest green, expressive serif typography, and orange accents.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Node.js 20.19+ or 22.12+ is recommended. This project was built with React 19, Vite 7, and Lucide icons.

```sh
npm run build
npm run preview
```

`dist/` is the production build and can be served by any static host. It needs an HTTP server; opening its HTML directly through `file://` is not supported.

## Included

- Responsive homepage, accessible mobile navigation, skip link, and reduced-motion support.
- Six freshly generated travel images, optimized to WebP and served locally. No original Skyna website images are used by the app.
- Self-hosted Instrument Serif, DM Sans, and Caveat fonts, with their Open Font Licenses.
- Seven-destination discovery panel, six featured journeys, destination and travel-style filters, and a custom-journey empty state.
- Tour detail dialogs with expandable itineraries.
- Real Skyna traveler testimonials with previous/next controls and their original ratings.
- Trip-planning form with a local review step, followed by a WhatsApp draft link. The page never sends a message automatically.
- Phone, email, and Instagram contact links.

## Files

- `src/main.jsx`: React components and UI interactions.
- `src/styles.css`: responsive layout, visual design, and motion preferences.
- `src/data.json`: curated trip and testimonial content from the collected Skyna reference.
- `src/fonts.css`: local font declarations.
- `public/images/`: new generated imagery used by the homepage.
- `public/fonts/licenses/`: font license texts.
- `IMAGE-PROMPTS.md`: image-generation prompts and intended use.
- `reference/`: earlier content research, kept locally and excluded from Git.

## Content and scope

This is a UI project. There is no backend, account system, checkout, booking processing, or live availability feed. Departure selections are visitor preferences, not availability claims. Tour prices are reference snapshots; final quotes depend on the selected dates and itinerary.

Some source tour cards disagree with the detailed itineraries about duration. The UI uses the itinerary's day count and keeps `sourceCardDays` in the data for traceability. Travel-style tags come from source category-page headings; only the captured featured journeys are displayed.

Generated destination photography is illustrative. No original traveler portraits were reused; testimonials use initials and the original reviewer names and text.

## Validation

Production build passed. Browser checks covered image loading, desktop and narrow/mobile layouts, destination and travel-style filtering, trip details, destination discovery, empty states, testimonial navigation, expanded activities, mobile navigation, and the trip-planning draft. Browser error/warning logs were empty during the checks.
