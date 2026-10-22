import React, { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { extendedKiteCordPath, KITE_KNOT, kiteRibbonPath } from "./kiteShape";
import "./experienceKite.css";

export default function ExperienceKite() {
  const id = useId().replace(/:/g, "");
  const cream = `${id}-cream`;
  const olive = `${id}-olive`;
  const weave = `${id}-weave`;
  return (
    <div className="sr-experience-kite" aria-hidden="true">
      <div className="sr-kite-scroll">
        <div className="sr-kite-arrival">
          <div className="sr-kite-depth">
            <div className="sr-kite-sway">
              <svg className="sr-kite-art" viewBox="0 0 600 540" fill="none" focusable="false">
                <defs>
                  <linearGradient id={cream} x1="251" y1="295" x2="540" y2="460" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d4c8aa" />
                    <stop offset=".2" stopColor="#f3ead5" />
                    <stop offset=".4" stopColor="#c9bfa6" />
                    <stop offset=".62" stopColor="#f5eddb" />
                    <stop offset=".8" stopColor="#cabc9d" />
                    <stop offset="1" stopColor="#eee3c9" />
                  </linearGradient>
                  <linearGradient id={olive} x1="251" y1="295" x2="510" y2="495" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#88906b" />
                    <stop offset=".24" stopColor="#b1b493" />
                    <stop offset=".45" stopColor="#76805b" />
                    <stop offset=".7" stopColor="#b5b797" />
                    <stop offset="1" stopColor="#85906b" />
                  </linearGradient>
                  <pattern id={weave} width="3" height="3" patternUnits="userSpaceOnUse">
                    <path d="M0 0H3M0 0V3" stroke="#fff8de" strokeOpacity=".24" strokeWidth=".5" />
                    <path d="M1.5 0V3" stroke="#665d3c" strokeOpacity=".15" strokeWidth=".35" />
                  </pattern>
                </defs>
                {[0, 1].map((strand) => (
                  <g key={strand} className="sr-kite-ribbon" data-kite-strand={strand}>
                    <path d={kiteRibbonPath(0, strand)} fill={`url(#${strand ? olive : cream})`} stroke={strand ? "#69784d" : "#f6eed9"} strokeOpacity=".6" strokeWidth=".5" />
                    <path d={kiteRibbonPath(0, strand)} fill={`url(#${weave})`} />
                  </g>
                ))}
                <image href="/images/sunroom/linen-kite.webp" x="60" y="20" width="230" height="287.4" preserveAspectRatio="xMidYMid meet" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// The cord has its own layer so the beach background cannot cut it off.
// Its upper end follows the original, unpinned kite; its lower end stays at
// the first chapter's natural flow boundary, independent of sticky stacking.
export function ExperienceKiteCord() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    const scene = svg.closest(".sr-experiences-scene");
    const art = scene.querySelector(".sr-kite-art");
    const stories = scene.querySelector(".sr-experience-stories");
    const first = stories.firstElementChild;
    const path = svg.querySelector("path");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const knot = art.createSVGPoint();
    knot.x = KITE_KNOT.x;
    knot.y = KITE_KNOT.y;
    let edge = 0;
    let width = 0;
    let edgeX = 0;
    let visible = false;
    let running = false;
    const draw = () => {
      const matrix = art.getScreenCTM();
      if (!matrix || !edge) return;
      const box = svg.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const start = knot.matrixTransform(matrix);
      const phase = reduced.matches ? 0 : performance.now() / 9200 * Math.PI * 2;
      path.setAttribute("d", extendedKiteCordPath({
        x: start.x - box.left,
        y: start.y - box.top,
        edgeX,
        edgeY: edge,
      }, phase));
    };
    const measure = () => {
      const padding = parseFloat(getComputedStyle(stories).paddingTop) || 0;
      edge = stories.offsetTop + padding + first.offsetHeight;
      width = scene.clientWidth;
      const contentWidth = first.querySelector(".sr-container").clientWidth;
      const gutter = Math.max(0, (width - contentWidth) / 2);
      edgeX = width - Math.max(12, Math.min(40, gutter / 2));
      svg.style.height = `${edge}px`;
      draw();
    };
    const sync = () => {
      const active = visible && !document.hidden && !reduced.matches;
      if (active === running) return;
      running = active;
      if (active) gsap.ticker.add(draw);
      else gsap.ticker.remove(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
      if (visible) draw();
    });
    const resize = new ResizeObserver(measure);
    measure();
    observer.observe(svg);
    [scene, stories, first].forEach((el) => resize.observe(el));
    const preference = () => { sync(); draw(); };
    reduced.addEventListener("change", preference);
    document.addEventListener("visibilitychange", sync);
    return () => {
      gsap.ticker.remove(draw);
      observer.disconnect();
      resize.disconnect();
      reduced.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <svg ref={ref} className="sr-experience-long-cord" aria-hidden="true" focusable="false" fill="none">
      <path stroke="#a08b5a" strokeWidth=".8" strokeLinecap="round" />
    </svg>
  );
}
