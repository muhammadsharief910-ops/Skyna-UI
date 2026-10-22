import { useCallback, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Smooth wheel deltas on the native scroll container; touch stays native.
export default function useSmoothScroll(pageKey) {
  const instance = useRef(null);
  useLayoutEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    let removeTicker;
    const configure = () => {
      removeTicker?.();
      instance.current?.destroy();
      instance.current = null;
      if (!media.matches) return;
      const lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 0.85,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          node.matches?.(
            "input, textarea, select, option, [data-lenis-prevent]",
          ),
      });
      instance.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      removeTicker = () => gsap.ticker.remove(tick);
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      media.removeEventListener("change", configure);
      removeTicker?.();
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    instance.current?.resize();
  }, [pageKey]);
  return useCallback((top) => {
    if (instance.current) {
      instance.current.resize();
      instance.current.scrollTo(top, { immediate: true, force: true });
    } else window.scrollTo({ top, behavior: "instant" });
  }, []);
}
