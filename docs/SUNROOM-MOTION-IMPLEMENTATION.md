# Skyna — living Sunroom and 3D scroll choreography

Implemented on `/2` and its supporting pages. The original homepage remains at `/` and `/1`. The approved composition, photography, colors, typography, and materials are preserved.

## The opening scene

Several independent elements animate on arrival, then settle into the existing layout. Controls remain available throughout.

| Time from arrival | Movement |
| --- | --- |
| 0–1.4s | Bali rises inside its arch with a small perspective correction and soft image reveal. |
| 0.05–1.25s | Foreground foliage fades into the room. |
| 0.12–1.4s | The headline, supporting copy, and button lift into place in a short sequence. |
| 0.13–1.78s | Santorini follows from a different depth and angle. |
| 0–1.1s | The Kashmir paper rises 18px into place without an entrance rotation. Its CSS angle is established before animation begins. |
| 0.45–1.25s | The search strip settles beneath the scene. |
| 0.6–1.7s | Labels and the stamp appear; the handwritten arrow paths draw in. |

The text starts legible, without a blocking loader. Hero photography and foreground foliage load eagerly; supporting imagery remains lazy-loaded.

## Life while the visitor pauses

- Olive branches gently rotate on independent inner layers: roughly 1.6 degrees on desktop, 0.8 degrees on smaller screens, with varied cycle lengths.
- A separate leaf-shadow layer drifts and turns across the plaster on a 28-second round trip.
- A broad, restrained sunbeam moves and changes intensity on a 34-second round trip.
- The small scroll invitation extends and contracts gently.
- These ambient loops pause when their elements leave the viewport or the browser tab becomes inactive.

The arches, headline, and controls do not continuously float. The atmosphere provides the idle movement.

## The 3D scroll sequence

Native scrolling drives a reversible timeline from the top of the hero until it leaves the viewport. Depth, rotation, image crop, and movement are coordinated rather than assigned as unrelated effects.

| Layer | Full desktop scroll travel |
| --- | --- |
| Bali arch | Up 105px, left 14px, back 110px; turns 6 degrees away. |
| Santorini arch | Up 155px, right 20px, back 180px; turns 8 degrees in the opposite direction. |
| Kashmir paper | Up 75px, forward 60px, and gradually straightens from 6 degrees to 0 during actual scrolling. An independent wrapper adds pointer depth. |
| Foreground branches | Rise and move outward, with modest forward depth. Their breeze continues independently. |
| Shadows and annotations | Drift more slowly to connect the foreground and plaster surface. |
| Photographs inside arches | Move within the frame and gently change crop, without changing the arch layout. |

Moving the pointer across the hero adds up to 9px of foreground travel and 3 degrees of rotation. Distant layers respond less. Leaving the scene returns the pointer offsets smoothly to rest.

Each motion system owns a separate layer: outer frames handle scroll, middle frames handle pointer depth, inner frames handle arrival, and botanical leaf images handle the breeze. This prevents one animation from resetting another.

## Exploration beyond the hero

- **Destination cards:** perspective reveals, photo drift, a small hover/focus lift, and responsive arrow feedback.
- **Filters:** retained cards animate to their new positions; newly matching cards enter in a short sequence. Region and search state are restored on browser Back.
- **Destination navigation:** one controlled image-frame transition runs across browsers. Its frame, border, and image crop interpolate together; the destination is measured after scroll resets. Discover photos retain a static crop on entry, avoiding native page-transition snapshots and late zoom corrections.
- **Experiences:** on sufficiently tall desktop screens, the four scenes form a sticky stack. The outgoing scene recedes and tilts as the next arrives. Small screens and reduced-motion layouts use normal document flow.
- **Itineraries:** a slim route line fills during scroll. Selecting a day updates the active marker and smoothly expands the corresponding content. Collapsed content is excluded from interaction and accessibility navigation.
- **Planner:** changing the destination crossfades the photograph. A small paper summary updates destination, month, travelers, and style. Review/edit transitions preserve the form, move focus to the new heading, and bring the step into view.
- **Controls:** buttons and arrows respond on hover/focus and press; search fields show a clear focus state; mobile menu items enter in a short sequence.

No message is sent automatically. The enquiry still ends with explicit WhatsApp and email draft links. A selected journey name is retained only while it matches the chosen destination.

## Mobile and reduced motion

Mobile scroll travel is reduced to 30 percent. Whole-scene pointer depth is limited to capable desktop pointers. The stacked experience sequence is limited to desktop screens at least 700px tall.

`prefers-reduced-motion` bypasses GSAP motion, continuous loops, shared-image travel, and sticky scene stacking. State changes and all content remain available. The native scroll container is preserved in every mode. Desktop wheel deltas use Lenis interpolation synchronized to the GSAP ticker; touch remains native and reduced motion disables smoothing. Route changes cancel momentum before resetting or restoring the scroll position. Scrub delays are shortened to keep animation responsive to the smoothed scroll.

## Verification

Production build passes. Browser checks covered visible idle movement, changing 3D transform matrices during scroll, loaded images, destination filters and Back restoration, destination-transition cleanup, desktop experience stacking, mobile normal-flow behavior, mobile menu navigation, itinerary expansion, live planner preferences, and the enquiry review step.

Desktop and narrow-screen checks showed no horizontal overflow. A planner empty-selection error found during this pass was fixed and the unselected and selected flows were rechecked. Reduced-motion behavior is implemented in media-query and cleanup paths; OS-level reduced-motion emulation was not available in the preview browser.

## Possible later refinements

Custom expanding search pickers, a richer itinerary image sequence, destination route illustrations, and a manual testimonial carousel remain optional next-pass work. They are not required for the current motion system and are not represented as implemented.
