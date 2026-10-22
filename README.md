# Skyna — a little room for wonder

Two responsive React design directions for Skyna: the original cinematic homepage and the approved Sunroom website with warm plaster, olive accents, arched photography, and scroll-linked depth.

Live website: [skyna-travel.vercel.app](https://skyna-travel.vercel.app). Production opens the Sunroom design at `/2`; the original remains available at `/1`.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Node.js 20.19+ or 22.12+ is recommended. This project was built with React 19, Vite 7, and Lucide icons.

## Design routes

- `/` and `/1`: original cinematic homepage.
- `/2`: Sunroom homepage.
- `/2/destinations` and `/2/destinations/:slug`: India and international destination discovery and stories.
- `/2/journeys` and `/2/journeys/:slug`: journeys, filters, and itineraries.
- `/2/experiences`, `/2/about`, and `/2/plan`: experiences, traveler stories, and a reviewable enquiry flow.

Sunroom adds eight generated assets and uses GSAP for layered arrival, ambient light and foliage, coordinated 3D scroll, and pointer depth. Destination image transitions, animated filters, stacked experience scenes, itinerary progress, and a live trip summary extend the same visual direction. Its interface is built from live HTML elements rather than a flattened screenshot. See `docs/SUNROOM-MOTION-IMPLEMENTATION.md` for the motion choreography and validation, and `docs/SUNROOM-LIVING-MOTION-PLAN.md` for the broader direction and later refinements.

```sh
npm run build
npm run preview
```

`dist/` is the production build and can be served by any static host. It needs an HTTP server; opening its HTML directly through `file://` is not supported.
Configure the host to serve `index.html` for application routes so direct links such as `/2/destinations/bali` work.

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
- `src/sunroom/`: Sunroom routes, content, scoped styling, and GSAP motion.
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
