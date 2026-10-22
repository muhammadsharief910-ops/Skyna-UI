# Skyna Sunroom — website and motion plan

For the proposed next motion pass, see [the living website plan](SUNROOM-LIVING-MOTION-PLAN.md). It expands ambient motion, connected navigation, discovery, and itinerary interactions while preserving this design.

## Route preservation

- `/` and `/1`: the original Skyna React homepage, preserved.
- `/2`: the approved Sunroom homepage.
- `/2/destinations`: filterable India/international destination collection.
- `/2/destinations/:slug`: a destination story, experiences, and relevant journeys.
- `/2/journeys`: filterable journeys, including source-backed India packages and bespoke international ideas.
- `/2/journeys/:slug`: journey details and itinerary.
- `/2/experiences`: beaches, mountains, culture, and time together.
- `/2/about`: the Skyna approach and real traveler stories.
- `/2/plan`: a personalized enquiry and a reviewable WhatsApp/email handoff.

## Visual contract

Match the selected reference's structure: warm plaster, olive green, soft leaf shadows, a tall Bali arch, smaller Santorini arch, tilted Kashmir print, handwritten notes, limestone ledge, a floating ivory search bar, four destination cards, and a sage experience section. Render the text, controls, arches, prints, and foliage as independent elements rather than using a screenshot of the UI.

The homepage keeps the reference's clear progression and compact footer. Supporting pages extend the same typography, colors, materials, shadows, and photography.

## Motion design

- Scroll-linked depth: the two arches, Kashmir print, decorative branches, and scene shadows move at different speeds.
- Subtle perspective: the print rotates and settles as the hero scrolls out; images drift within their clipped frames.
- Pointer depth on capable devices: gentle card tilt follows the pointer without interfering with scroll transforms.
- Editorial reveals: destination tiles and supporting content lift into view with small staggered offsets.
- Experience panorama: the photograph translates within its frame during scroll; a paper note settles with a slight rotation.
- Motion respects reduced-motion preferences, is lighter on small screens, and preserves native scrolling.

## Content and interaction

Use the captured India trip details and real testimonials. International journeys are customizable ideas rather than fixed departures or invented prices. Search, region/mood filters, destination links, itineraries, navigation, and the enquiry flow must work. No booking backend or automatic message submission is introduced.

## Validation

Build both variants; verify direct route loads, original-design preservation, mobile reflow, asset loading, navigation, filters, enquiry validation, and visible changes in scroll-linked transforms. Check for browser errors and horizontal overflow.
