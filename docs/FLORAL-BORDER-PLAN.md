# Skyna — floral photo-border concept

Status: design proposal only. The generated storyboard is a preview, not a screenshot of implemented animation.

## Sequence

1. **Photo settles (0–0.85s):** complete the existing destination image/frame transition. Keep the botanical layer hidden during this movement.
2. **Stem traces (0.85–2.05s):** a fine olive/gold line grows from a lower corner and follows the outside of the arch.
3. **Leaves unfold (1.6–2.5s):** tiny illustrated leaves open progressively along the traced path.
4. **Flowers bloom (2.2–3s):** a few blush-pink flowers open with short staggered timing. Hold the completed border rather than continuously replaying it.

The border should be thin, asymmetric, and outside the photograph. No large photographic branch overlays the destination image. Keep the current type, copy, arch, colors, and photography.

## Implementation approach

Wrap the clipped photo frame in an outer art container with visible overflow. A separate responsive SVG follows the arch 12–16px outside the frame. Animate stem stroke lengths, individual leaf scales, and petal groups using the existing GSAP setup. The shared-image transition completion starts the border timeline; direct page loads wait for image decoding and layout to settle. Use one timeline per destination entry and clean it up when leaving the route. Reduced motion shows the completed border immediately. On small screens, use fewer flowers and tighter spacing to keep the artwork inside the page.

## Live fixes delivered separately

- Kashmir has a paper-wrapper entrance, independent pointer depth, and stronger scroll travel. Its initial CSS angle remains stable; the scroll movement gradually straightens it only when the visitor scrolls.
- Desktop wheel movement now uses Lenis on the native scroll container, synchronized with ScrollTrigger. Touch remains native, reduced-motion preferences disable smoothing, and navigation cancels momentum before resetting/restoring position.
- Scroll-trigger scrub delays are shorter, avoiding two long layers of smoothing.
- The CTA/footer branch is anchored directly to the full-width section, with its stem continuing off the right edge.
- The photographic leaf overlay has been removed from destination heroes. The proposed floral border is not implemented yet.

## Preview generation

Tool: built-in image generation. Reference: the supplied Santorini page screenshot. Preview file: `floral-border-concept.png`.

### Final prompt

Use case: ui-mockup. Asset type: premium travel website animation concept board.
Use the supplied screenshot only as a reference for Skyna's existing destination page layout and visual identity. Create a beautiful polished light-theme design presentation, with NO browser chrome or dark borders. Preserve the warm ivory background, olive green CTA, elegant narrow editorial serif, top navigation, left copy and right tall arched Santorini photograph. Remove the large photographic olive branch that currently overlaps the bottom-right of the arch.
The main upper 65 percent shows the completed desktop hero at generous readable size. Brand 'Skyna', navigation 'Discover', 'Experiences', 'Our story', button 'Plan a trip'. Main title 'A little closer to Santorini.' with Santorini in soft olive italic. Supporting copy brief and understated, CTA 'Take me there'. The right arched Santorini photo has blue dome, whitewashed buildings, blue sea, pink bougainvillea within the photograph.
Proposed decoration: an extraordinarily delicate illustrated botanical vine following the OUTSIDE perimeter of the photo arch, separated from it by about 12px. Fine muted olive and soft antique-gold stems, a few tiny leaves, and just 5-7 small restrained blush and bougainvillea-pink blossoms. It grows from the lower-left corner, climbs around the arch's crown and finishes at lower-right; asymmetric and airy, not a thick floral wreath. No large leaf photos, no massive foliage or flowers obscuring the photograph. Soft tactile paper-like botanical illustration, restrained and aesthetic. Match the current design instead of redesigning it.
Bottom 35 percent: four evenly spaced storyboard thumbnails of the SAME arch, same photo and same crop, showing sequential animation. Label them clearly '01  Photo settles', '02  Stem traces', '03  Leaves unfold', '04  Flowers bloom'. First thumbnail has bare white arch; second shows partial fine vine traced around the frame; third shows completed vine with small leaves; fourth shows the finished flowers. Use subtle directional arrows between these four frames, lots of whitespace, tiny elegant captions. Heading above row 'A border that comes to life'. No extra website sections. High fidelity art direction board, wide landscape format, cohesive light warm aesthetic.
