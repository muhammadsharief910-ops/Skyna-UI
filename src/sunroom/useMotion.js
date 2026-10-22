import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createFlightSampler } from "./flightTiming";
import { kiteRibbonPath, KITE_WAVE_CYCLE } from "./kiteShape";

gsap.registerPlugin(ScrollTrigger);

export default function useMotion(root, pageKey) {
  useLayoutEffect(() => {
    if (!root.current) return;
    let alive = true;
    const scope = root.current;
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 850px)",
        pointer: "(hover: hover) and (pointer: fine)",
        tall: "(min-height: 700px)",
      },
      (context) => {
        if (!context.conditions.motion) return;
        scope.classList.add("sr-motion-enabled");
        const { desktop, pointer, tall } = context.conditions;
        const strength = desktop ? 1 : 0.3;
        const select = gsap.utils.selector(scope);
        const cleanups = [];
        const loops = new Map();
        const visible = new Set();
        const syncLoops = () =>
          loops.forEach((tweens, el) =>
            tweens.forEach((t) =>
              t.paused(document.hidden || !visible.has(el)),
            ),
          );
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) =>
              e.isIntersecting
                ? visible.add(e.target)
                : visible.delete(e.target),
            );
            syncLoops();
          },
          { threshold: 0 },
        );
        const ambient = (el, vars, { from, visibilityTarget = el } = {}) => {
          if (!el) return;
          const options = {
            ...vars,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          };
          const tween = from ? gsap.fromTo(el, from, options) : gsap.to(el, options);
          loops.set(visibilityTarget, [...(loops.get(visibilityTarget) || []), tween]);
          observer.observe(visibilityTarget);
        };
        document.addEventListener("visibilitychange", syncLoops);
        cleanups.push(() => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", syncLoops);
          scope.classList.remove("sr-motion-enabled");
        });

        select(".sr-sprig-leaf").forEach((el, i) =>
          ambient(el, {
            rotation: (i % 2 ? -1 : 1) * (desktop ? 1.6 : 0.8),
            duration: 5.5 + (i % 3) * 1.7,
          }),
        );
        select(".sr-edge-flowers .sr-edge-float").forEach((el) =>
          ambient(el, {
            rotation: 2.5 * strength,
            y: 4 * strength,
            duration: 5,
          }, {
            from: { rotation: -2.5 * strength, y: -4 * strength },
            // The art is deliberately cropped at the viewport edge. Observe
            // its section rather than a mostly offscreen transformed layer.
            visibilityTarget: el.closest(".sr-home-destination-scene"),
          }),
        );
        select(".sr-edge-hat .sr-edge-float").forEach((el) =>
          ambient(el, {
            rotation: 3.3 * strength,
            y: 6.5 * strength,
            duration: 6,
          }, {
            from: { rotation: -3.3 * strength, y: -6.5 * strength },
            visibilityTarget: el.closest(".sr-home-destination-scene"),
          }),
        );
        select(".sr-edge-object").forEach((el, i) => {
          // Scroll owns this wrapper; the inner wrapper owns the gentle breeze.
          gsap.fromTo(el, { y: 16 * strength }, {
            y: -(i ? 48 : 32) * strength,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".sr-home-destination-scene"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          });
        });
        select(".sr-discover-balloon").forEach((balloon) => {
          ambient(balloon.querySelector(".sr-balloon-float"), {
            y: -14 * strength,
            duration: 8.5,
          });
          ambient(balloon.querySelector(".sr-balloon-sway"), {
            rotation: 1,
            duration: 11,
          });
          ambient(balloon.querySelector(".sr-balloon-shadow"), {
            scale: 0.85,
            opacity: 0.1,
            duration: 8.5,
          });
          gsap.to(balloon.querySelector(".sr-balloon-drift"), {
            y: -42 * strength,
            x: 12 * strength,
            ease: "none",
            scrollTrigger: {
              trigger: balloon.closest(".sr-discover-intro"),
              start: "top top",
              end: "bottom top",
              scrub: 0.75,
            },
          });
          gsap.fromTo(balloon.querySelector(".sr-balloon-trace"),
            { attr: { "stroke-dashoffset": 1 } },
            {
              attr: { "stroke-dashoffset": 0 },
              duration: 2.5,
              ease: "power1.inOut",
              scrollTrigger: { trigger: balloon, start: "top 92%", once: true },
            },
          );
        });
        select(".sr-experience-kite").forEach((kite) => {
          const intro = kite.closest(".sr-experiences-intro");
          const sway = kite.querySelector(".sr-kite-sway");
          const scroll = kite.querySelector(".sr-kite-scroll");
          const depth = kite.querySelector(".sr-kite-depth");
          const ribbons = [...kite.querySelectorAll("[data-kite-strand]")].map((group) => ({
            strand: Number(group.dataset.kiteStrand),
            paths: [...group.querySelectorAll("path")],
          }));
          const clock = { phase: 0 };
          const draw = () => {
            ribbons.forEach(({ strand, paths }) => {
              const d = kiteRibbonPath(clock.phase, strand);
              paths.forEach((path) => path.setAttribute("d", d));
            });
          };
          // One continuous clock moves both tails; no reset jump at the seam.
          // Only this small SVG changes per frame, never the story layout.
          const wind = gsap.to(clock, {
            phase: KITE_WAVE_CYCLE,
            duration: 9.2,
            repeat: -1,
            ease: "none",
            paused: true,
            onUpdate: draw,
          });
          loops.set(kite, [wind]);
          observer.observe(kite);
          ambient(sway, {
            rotation: 2.2,
            x: 5 * strength,
            y: -8 * strength,
            duration: 6.8,
          }, {
            from: { rotation: -2.2, x: -5 * strength, y: 5 * strength },
            visibilityTarget: kite,
          });
          gsap.fromTo(kite.querySelector(".sr-kite-arrival"),
            { y: 22 * strength, opacity: 0.25 },
            { y: 0, opacity: 1, duration: 1.6, ease: "power2.out" },
          );
          // Entrance, ambient sway and scroll have separate transform owners.
          gsap.to(scroll, {
            x: 24 * strength,
            y: -(desktop ? 120 : 45),
            rotation: -4 * strength,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });
          if (pointer && desktop) {
            const moveX = gsap.quickTo(depth, "x", { duration: 1.4, ease: "power2.out" });
            const moveY = gsap.quickTo(depth, "y", { duration: 1.4, ease: "power2.out" });
            const turn = gsap.quickTo(depth, "rotationY", { duration: 1.4, ease: "power2.out" });
            const move = (event) => {
              const rect = intro.getBoundingClientRect();
              const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - rect.left) / rect.width - 0.5);
              const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - rect.top) / rect.height - 0.5);
              moveX(x * 12);
              moveY(y * 8);
              turn(x * 5);
            };
            const reset = () => { moveX(0); moveY(0); turn(0); };
            intro.addEventListener("pointermove", move, { passive: true });
            intro.addEventListener("pointerleave", reset);
            cleanups.push(() => {
              intro.removeEventListener("pointermove", move);
              intro.removeEventListener("pointerleave", reset);
              [moveX, moveY, turn].forEach((fn) => fn.tween.kill());
            });
          }
          cleanups.push(() => {
            clock.phase = 0;
            draw();
          });
        });
        ambient(select(".sr-scroll-invitation i")[0], {
          scaleX: 0.35,
          transformOrigin: "left",
          duration: 1.4,
        });
        ambient(select(".sr-shadow-breeze")[0], {
          x: 20 * strength,
          y: 13 * strength,
          rotation: 3,
          duration: 14,
        });
        ambient(select(".sr-sunbeam")[0], {
          xPercent: 8 * strength,
          opacity: 0.65,
          duration: 17,
        });

        const hero = select(".sr-hero")[0];
        if (hero) {
          // Arrival owns inner frames; scroll owns outer frames; pointer owns depth wrappers.
          const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
          entrance
            .fromTo(
              select(".sr-branch-top, .sr-branch-right"),
              { opacity: 0 },
              { opacity: 1, duration: 1.2 },
              0.05,
            )
            .fromTo(
              select("[data-arrival='bali']"),
              {
                yPercent: 10,
                rotationX: -9 * strength,
                scale: 1.04,
                opacity: 0.45,
              },
              {
                yPercent: 0,
                rotationX: 0,
                scale: 1,
                opacity: 1,
                duration: 1.4,
              },
              0,
            )
            .fromTo(
              select("[data-arrival='santorini']"),
              {
                yPercent: 15,
                rotationY: 8 * strength,
                scale: 1.06,
                opacity: 0.45,
              },
              {
                yPercent: 0,
                rotationY: 0,
                scale: 1,
                opacity: 1,
                duration: 1.65,
              },
              0.13,
            )
            .fromTo(
              select("[data-arrival='print']"),
              { y: 18 * strength, opacity: 0.6 },
              { y: 0, opacity: 1, duration: 1.1 },
              0,
            )
            .fromTo(
              select(".sr-hero-copy > *"),
              { y: 19, opacity: 0.55 },
              { y: 0, opacity: 1, duration: 0.9, stagger: 0.11 },
              0.12,
            )
            .fromTo(
              select(".sr-photo-label, .sr-hero-message, .sr-hero-stamp"),
              { opacity: 0 },
              { opacity: 1, duration: 0.8, stagger: 0.08 },
              0.6,
            )
            .fromTo(
              select(".sr-home-search"),
              { y: 20, opacity: 0.5 },
              { y: 0, opacity: 1, duration: 0.8 },
              0.45,
            );
          // Draw the actual linework once, without moving the annotations themselves.
          select(".sr-arrow-doodle path").forEach((path) => {
            const length = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.1,
                delay: 0.8,
                ease: "power2.inOut",
              },
            );
          });
          // Scrubbed depth is reversible and follows native scrolling.
          const scene = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
            },
          });
          scene
            .to(
              select(".sr-arch-bali"),
              {
                y: -105 * strength,
                x: -14 * strength,
                z: -110 * strength,
                rotationY: -6 * strength,
                rotationX: 2 * strength,
                ease: "none",
              },
              0,
            )
            .to(
              select(".sr-arch-santorini"),
              {
                y: -155 * strength,
                x: 20 * strength,
                z: -180 * strength,
                rotationY: 8 * strength,
                ease: "none",
              },
              0,
            )
            .to(
              select(".sr-kashmir-print"),
              {
                y: -75 * strength,
                x: 14 * strength,
                z: 60 * strength,
                rotation: 0,
                rotationY: -4 * strength,
                ease: "none",
              },
              0,
            )
            .to(select(".sr-hero-copy"), { y: -30 * strength, ease: "none" }, 0)
            .to(
              select(".sr-branch-top"),
              {
                y: -160 * strength,
                x: -26 * strength,
                z: 75 * strength,
                ease: "none",
              },
              0,
            )
            .to(
              select(".sr-branch-right"),
              {
                y: -62 * strength,
                x: 36 * strength,
                z: 100 * strength,
                ease: "none",
              },
              0,
            )
            .to(
              select(".sr-leaf-shadow"),
              {
                x: 38 * strength,
                y: 40 * strength,
                opacity: 0.08,
                ease: "none",
              },
              0,
            )
            .to(
              select(".sr-photo-label, .sr-hero-message"),
              { y: -24 * strength, ease: "none" },
              0,
            )
            .to(
              select(".sr-scroll-invitation"),
              { opacity: 0, y: 12, duration: 0.25, ease: "none" },
              0,
            );
          select(".sr-arch img").forEach((img) =>
            gsap.fromTo(
              img,
              { scale: 1.04, yPercent: -2 },
              {
                scale: 1.14,
                yPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.45,
                },
              },
            ),
          );
          if (pointer && desktop) {
            const layers = select("[data-depth]").map((el) => ({
              el,
              depth: Number(el.dataset.depth),
              x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
              rx: gsap.quickTo(el, "rotationX", {
                duration: 1,
                ease: "power3.out",
              }),
              ry: gsap.quickTo(el, "rotationY", {
                duration: 1,
                ease: "power3.out",
              }),
            }));
            const move = (e) => {
              const r = hero.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
              const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
              layers.forEach((l) => {
                l.x(x * 9 * l.depth);
                l.y(y * 6 * l.depth);
                l.rx(-y * 2 * l.depth);
                l.ry(x * 3 * l.depth);
              });
            };
            const leave = () =>
              layers.forEach((l) => {
                l.x(0);
                l.y(0);
                l.rx(0);
                l.ry(0);
              });
            hero.addEventListener("pointermove", move);
            hero.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              hero.removeEventListener("pointermove", move);
              hero.removeEventListener("pointerleave", leave);
            });
          }
        }

        select(".sr-home-flight").forEach((flight) => {
          const path = flight.querySelector(".sr-flight-guide");
          const plane = flight.querySelector(".sr-flight-plane");
          const reveal = flight.querySelector(".sr-flight-reveal");
          const length = path.getTotalLength();
          const sample = createFlightSampler((progress) =>
            path.getPointAtLength(progress * length),
          );
          const originalTransform = plane.getAttribute("transform");
          const originalOffset = reveal.getAttribute("stroke-dashoffset");
          const playhead = { progress: 0 };
          const render = () => {
            const pose = sample(playhead.progress);
            plane.setAttribute("transform", `translate(${pose.x} ${pose.y}) rotate(${pose.rotation})`);
            reveal.setAttribute("stroke-dashoffset", 1 - pose.progress);
          };
          render();
          gsap.to(playhead, {
            progress: 1,
            duration: 1,
            ease: "none",
            onUpdate: render,
            scrollTrigger: {
              trigger: flight.closest(".sr-home-destinations"),
              start: "top 88%",
              end: () => `+=${Math.round(window.innerHeight * 1.1)}`,
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          });
          cleanups.push(() => {
            plane.setAttribute("transform", originalTransform);
            reveal.setAttribute("stroke-dashoffset", originalOffset);
          });
        });

        select("[data-reveal]").forEach((el) =>
          gsap.fromTo(
            el,
            { y: 26 * strength, opacity: 0.7 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            },
          ),
        );
        select("[data-stagger]").forEach((group) =>
          gsap.fromTo(
            [...group.children],
            { y: 42 * strength, opacity: 0.55, rotationX: 7 * strength },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.95,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: { trigger: group, start: "top 94%", once: true },
            },
          ),
        );
        select("[data-image-drift]").forEach((frame) => {
          const img = frame.querySelector("img");
          if (img)
            gsap.fromTo(
              img,
              { yPercent: -4, scale: 1.12 },
              {
                yPercent: 4,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.45,
                },
              },
            );
        });
        select(".sr-paper-note").forEach((note) =>
          gsap.fromTo(
            note,
            { rotation: 9, y: 25 },
            {
              rotation: -5,
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: note.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          ),
        );
        select(".sr-floating-sprig").forEach((sprig) =>
          gsap.to(sprig, {
            y: -65 * strength,
            rotation: "-=8",
            ease: "none",
            scrollTrigger: {
              trigger: sprig.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }),
        );
        select(".sr-itinerary").forEach((itinerary) =>
          gsap.fromTo(
            itinerary,
            { "--sr-route-progress": 0 },
            {
              "--sr-route-progress": 1,
              ease: "none",
              scrollTrigger: {
                trigger: itinerary,
                start: "top 70%",
                end: "bottom 55%",
                scrub: 0.5,
              },
            },
          ),
        );
        if (desktop && tall) {
          const stories = select(".sr-experience-story");
          stories.forEach((story, i) => {
            if (!stories[i + 1]) return;
            gsap.to(story.querySelector(".sr-container"), {
              scale: 0.94,
              y: -28,
              rotationX: 3,
              opacity: 0.45,
              ease: "none",
              scrollTrigger: {
                trigger: stories[i + 1],
                start: "top 88%",
                end: "top top",
                scrub: 0.4,
              },
            });
          });
        }
        return () => cleanups.forEach((fn) => fn());
      },
      scope,
    );

    let refreshFrame;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        if (alive) ScrollTrigger.refresh();
      });
    };
    const resize = new ResizeObserver(refresh);
    resize.observe(scope);
    const imgs = [...scope.querySelectorAll("img")];
    imgs.forEach((img) => img.addEventListener("load", refresh));
    document.fonts?.ready.then(refresh);
    return () => {
      alive = false;
      cancelAnimationFrame(refreshFrame);
      resize.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", refresh));
      mm.revert();
    };
  }, [root, pageKey]);
}
