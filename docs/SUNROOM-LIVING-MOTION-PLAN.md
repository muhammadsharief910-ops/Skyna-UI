# Skyna Sunroom — a living website

Status: the core living-motion pass is now implemented. See [the implementation and 3D choreography record](SUNROOM-MOTION-IMPLEMENTATION.md) for exact coverage. The remaining ideas below are future refinements. This extends the approved `/2` design; `/` and `/1` remain the original design.

## Creative direction

The site should feel like a sunlit room with a breeze moving through it. A visitor can stop scrolling and still sense life; when they act, the interface responds and carries their attention forward. Keep the ivory plaster, olive palette, arched photography, Kashmir print, handwritten notes, real shadows, and generous spacing.

Motion has three layers: slow atmosphere, depth tied to exploration, and clear feedback after an action. The headline and form labels stay still and readable. One prominent movement at a time, with at most two quiet supporting movements. More elements moving continuously would dilute the effect.

## What exists today

The site already has independent scroll movement for the arches, postcard, foliage, shadows, and images; pointer tilt; content reveals; functioning destination and journey filters; itinerary accordions; and an enquiry review flow. The missing pieces are ambient motion, connected transitions, and richer responses inside discovery and planning.

## 1. A hero that feels alive before scrolling

| Element | Proposed behavior | Starting motion range |
| --- | --- | --- |
| Olive foliage | Branches gently sway from their stems; different timing prevents synchronized movement | 0.6–1.2° rotation, 9–15 seconds per cycle |
| Leaf shadows | Soft shadow layer drifts across the plaster as if sunlight passes through leaves | 8–16px drift, 22–36 seconds; subtle opacity change |
| Hero depth | Moving the pointer across the whole scene shifts near and far layers by different amounts | Near objects 4–8px, distant arches 1–3px; ease back on exit |
| Kashmir print | A tiny lift and corresponding shadow change when approached; it settles on release | 3–5px lift, under 1° rotation; 300–500ms |
| Buttons | Arrow glides forward on hover/focus; press produces a short tactile compression | Arrow 4px, button scale 0.98; 160–240ms |

The arches stay architecturally anchored. Avoid making every photo bob up and down. Most continuous atmosphere should come from the foliage and light. Do not stretch still photography to imitate waves; optional moving-water media needs a convincing short, seamless clip and a static fallback.

## 2. Scroll as a journey through the room

- **Hero departure:** extend the existing depth movement so the postcard settles toward the page while the arches recede slightly. Its shadow softens with the change in depth. Cap movement before text or search controls become obscured.
- **Search handoff:** as the hero leaves, the search strip settles into its resting position with a small shadow change. On long collection pages, offer a compact sticky filter bar after the original controls leave view.
- **Destination collection:** cards rise into place with short offsets and grounded shadows. Their photos continue a restrained internal drift while labels remain fixed. Hover/focus brings one card forward without moving neighboring controls.
- **Experience scene:** introduce one short, locally sticky scene on the experiences page. Scrolling progresses from coast to mountains to culture; the image, small route mark, and active category change together. Show each scene long enough to read. Homepage keeps its compact reference layout.
- **Journey itinerary:** draw a thin route line as the visitor reaches each day. The active day updates an adjacent landscape image on wide screens. Manual accordion selection takes precedence; auto-progress must not close a day the visitor opened.

Use native scroll. No forced scrolling, long pinning sequences, or hidden content that requires completing an animation.

## 3. Actions that visibly connect

| Interaction | Response |
| --- | --- |
| Open a destination | Its card photograph expands into the destination hero; title follows after the image settles. Back navigation restores the collection position. Use a brief crossfade when a shared-image transition is unavailable. |
| Change India / International or a travel mood | Active indicator slides to the new choice. Matching cards rearrange smoothly rather than disappearing and abruptly rebuilding. Keep keyboard focus on the selected control and announce the result count. |
| Open a search control | Panel unfolds from the selected field, selected value becomes a clear chip, and closing returns focus to that field. Escape and outside click close it. |
| Open navigation | Menu items enter in a short sequence; close reverses the same motion. Current page indicator moves between links. |
| Open an itinerary day | Height expands smoothly, chevron turns, and the day marker fills. The content appears immediately if reduced motion is enabled. |
| Change trip preferences | A live trip summary updates destination, month, group size, and style. Destination photography crossfades only when that destination changes. |
| Review an enquiry | Form and review move as connected steps; editing preserves values. Show completion only for the local review, with explicit WhatsApp/email draft actions. |

Preserve preferences when moving from search to journey to enquiry. Do not present invented availability, booking confirmations, or automatically sent messages as interactive decoration.

## 4. Details that reward exploration

- On destination pages, a small illustrated route can reveal landmarks as related content enters view. It should use actual place information and remain secondary to the photographs.
- Destination cards can reveal a short travel mood on hover and keyboard focus. Touch users see the same information without needing a hover gesture.
- Handwritten annotations can draw their underline once as the section enters, rather than repeatedly animating the text.
- Testimonials can transition with a gentle slide and height adjustment after a visitor chooses an arrow. Keep reviews manual, with stable reading time.
- Selected filters and planner steps should have tactile feedback and clear state changes. Decorative motion cannot substitute for visible selection or validation.

## 5. Choreography and implementation rules

Use the existing React and GSAP setup. Give ambient, scroll, and pointer effects separate wrapper elements so they do not overwrite each other's transforms. Assign one owner to every animated property. Consolidate pointer input into one scene update loop; do not attach competing handlers to every layer.

Suggested timing vocabulary: immediate feedback 160–240ms; panels and accordions 280–420ms; page/image transitions 500–700ms; scroll progress follows the visitor; ambient movement uses long, asymmetric cycles. Avoid elastic bounce in this calm visual language.

Start with transform and opacity effects. Change shadow strength through a pre-rendered shadow layer rather than animating a large blur every frame. Images need fixed layout dimensions and enough crop allowance for internal drift. Load the next transition image before starting; a missing or slow image must never block navigation.

Pause ambient loops when offscreen or when the browser tab is inactive. Remove listeners and animations on route changes. Limit persistent promoted layers and avoid applying `will-change` to the whole page. No WebGL or 3D engine is needed for this pass.

On touch devices, omit pointer depth, shorten scroll travel, and keep the experience sequence in normal document flow. Respect `prefers-reduced-motion`: remove ambient loops, parallax, tilt, and shared-image travel; use immediate state changes or a short opacity fade. Keyboard focus, selection, and error messages must remain equally clear.

## Build order

1. **Living Sunroom:** ambient foliage and light, coordinated hero depth, responsive shadows, button and card feedback. Highest visual impact with minimal layout change.
2. **Connected exploration:** destination image transitions, filter rearrangement, scroll-position restoration, navigation and search-panel choreography.
3. **Journey storytelling:** the experiences sequence, itinerary route progress, active imagery, and live enquiry summary.
4. **Polish and calibration:** annotation drawing, testimonial transitions, touch tuning, reduced-motion verification, and performance cleanup.

Review each stage in the actual browser before adding the next. Do not implement the entire list at equal intensity.

## Acceptance checks

- With the hero idle for 15 seconds, foliage and light feel alive while text, controls, and arches remain stable.
- Pointer, ambient, and scroll movement combine smoothly and reset without jumps.
- Fast scrolling, back navigation, changing filters repeatedly, and navigating mid-animation never strand an overlay or disable a control.
- Destination, month, and other applicable preferences survive the discovery-to-enquiry path.
- The original layout and silhouette remain recognizable in still screenshots at desktop and mobile widths; no horizontal overflow or layout shift.
- Keyboard and touch users can access all revealed content and controls.
- Reduced-motion and background-tab behavior disable unnecessary movement.
- Check on a representative mobile device as well as desktop; reduce layer count or amplitude if sustained scrolling stutters.

The first stage is the recommended next implementation: make the current room feel alive, then connect the rest of the experience.
