import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { createPortal } from "react-dom";
import { Compass, MapPin, CalendarDays, Users } from "lucide-react";

// Cache final layout positions, so filtering can move surviving cards in place.
export function AnimatedGrid({ children, className, signature }) {
  const ref = useRef(null);
  const previous = useRef(new Map());
  useLayoutEffect(() => {
    const nodes = [...ref.current.children];
    gsap.killTweensOf(nodes);
    gsap.set(nodes, { clearProps: "transform,opacity" });
    const next = new Map();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    nodes.forEach((node, i) => {
      const id = node.dataset.motionKey;
      const bounds = node.getBoundingClientRect();
      const rect = { left: bounds.left, top: bounds.top + window.scrollY };
      next.set(id, rect);
      const old = previous.current.get(id);
      if (!reduced) {
        gsap.fromTo(
          node,
          {
            x: old ? old.left - rect.left : 0,
            y: old ? old.top - rect.top : 26,
            opacity: old ? 1 : 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: old ? 0 : Math.min(i, 5) * 0.045,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
        );
      }
    });
    previous.current = next;
    return () => gsap.killTweensOf(nodes);
  }, [signature]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function PlanSnapshot({ destination, when, travelers, style }) {
  const values = [
    [MapPin, destination || "Somewhere lovely"],
    [CalendarDays, when || "Beautifully flexible"],
    [Users, `${travelers} ${travelers === "1" ? "traveler" : "travelers"}`],
    [Compass, style || "Your own pace"],
  ];
  return (
    <div className="sr-live-plan" aria-label="Your trip at a glance">
      <span className="sr-eyebrow">YOUR DAYDREAM, TAKING SHAPE</span>
      <div aria-live="polite" aria-atomic="true">
        {values.map(([Icon, value], i) => (
          <p key={i}>
            <Icon size={15} />
            <span key={value}>{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

// Keep one cropped image throughout the transition. Animating its cover geometry
// alongside the frame avoids a second crop/zoom when the destination takes over.
function coverGeometry(width, height, frame, position = "50% 50%") {
  const scale = Math.max(
    width / frame.naturalWidth,
    height / frame.naturalHeight,
  );
  const imageWidth = frame.naturalWidth * scale;
  const imageHeight = frame.naturalHeight * scale;
  const [px = "50%", py = "50%"] = position.split(" ");
  const fraction = (value) =>
    value.endsWith("%") ? parseFloat(value) / 100 : 0.5;
  return {
    width: imageWidth,
    height: imageHeight,
    x: (width - imageWidth) * fraction(px),
    y: (height - imageHeight) * fraction(py),
  };
}

export function DestinationTransition({ frame, onDone }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const target = document.querySelector(".sr-destination-story-image");
    const targetImage = target?.querySelector("img");
    if (!targetImage) {
      onDone();
      return;
    }
    const previousVisibility = target.style.visibility;
    const bounds = target.getBoundingClientRect();
    const style = getComputedStyle(target);
    const start = coverGeometry(
      frame.width,
      frame.height,
      frame,
      frame.objectPosition,
    );
    const end = coverGeometry(
      bounds.width -
        parseFloat(style.borderLeftWidth) -
        parseFloat(style.borderRightWidth),
      bounds.height -
        parseFloat(style.borderTopWidth) -
        parseFloat(style.borderBottomWidth),
      frame,
      getComputedStyle(targetImage).objectPosition,
    );
    const proxyImage = ref.current.querySelector("img");
    target.style.visibility = "hidden";
    gsap.set(proxyImage, start);
    const timeline = gsap.timeline({ onComplete: onDone });
    timeline
      .to(
        ref.current,
        {
          x: bounds.left - frame.left,
          y: bounds.top - frame.top,
          width: bounds.width,
          height: bounds.height,
          borderRadius: style.borderRadius,
          borderWidth: style.borderTopWidth,
          duration: 0.85,
          ease: "power2.inOut",
        },
        0,
      )
      .to(proxyImage, { ...end, duration: 0.85, ease: "power2.inOut" }, 0)
      .to(ref.current, {
        opacity: 0,
        duration: 0.12,
        onStart: () => {
          target.style.visibility = previousVisibility;
        },
      });
    return () => {
      timeline.kill();
      target.style.visibility = previousVisibility;
    };
  }, [frame, onDone]);
  return createPortal(
    <div
      ref={ref}
      className="sr-destination-transition"
      aria-hidden="true"
      style={{
        left: frame.left,
        top: frame.top,
        width: frame.width,
        height: frame.height,
      }}
    >
      <img src={frame.src} alt="" />
    </div>,
    document.body,
  );
}
