import React, { useId, useRef, useState } from "react";
import { Bookmark, Check } from "lucide-react";
import gsap from "gsap";
import { DestinationCard } from "./ui";

const savedKey = "skyna.saved-escapes.v1";

export function HomeEdgeAccents() {
  return (
    <div className="sr-home-edge-art" aria-hidden="true">
      <div className="sr-edge-object sr-edge-flowers">
        <div className="sr-edge-float">
          <img
            src="/images/sunroom/bougainvillea.webp"
            alt=""
            width="1024"
            height="1536"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="sr-edge-object sr-edge-hat">
        <div className="sr-edge-float">
          <img
            src="/images/sunroom/sunhat.webp"
            alt=""
            width="1374"
            height="1145"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(savedKey) || "[]");
    return Array.isArray(value)
      ? value.filter((slug) => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

export function SouvenirCard({ destination }) {
  const [saved, setSaved] = useState(() =>
    readSaved().includes(destination.slug),
  );
  const paper = useRef(null);
  const swing = useRef(null);
  React.useEffect(() => () => swing.current?.kill(), []);

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    try {
      const others = readSaved().filter((slug) => slug !== destination.slug);
      localStorage.setItem(
        savedKey,
        JSON.stringify(next ? [...others, destination.slug] : others),
      );
    } catch {
      // The control still works for this visit when storage is unavailable.
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swing.current?.kill();
      swing.current = gsap.timeline()
        .to(paper.current, { rotation: -7, duration: 0.12, ease: "power2.out" })
        .to(paper.current, { rotation: 4, duration: 0.18 })
        .to(paper.current, { rotation: -2, duration: 0.16 })
        .to(paper.current, { rotation: 0, duration: 0.2 });
    }
  }

  return (
    <div className="sr-souvenir-card" data-motion-key={destination.slug}>
      <DestinationCard compact destination={destination} />
      <button
        type="button"
        className="sr-luggage-tag"
        aria-label={`${saved ? "Remove" : "Save"} ${destination.name} ${saved ? "from" : "to"} your escapes`}
        aria-pressed={saved}
        onClick={toggleSaved}
        title={saved ? "Saved on this device" : "Save on this device"}
      >
        <span className="sr-tag-cord" aria-hidden="true" />
        <span ref={paper} className="sr-tag-paper">
          <span className="sr-tag-hole" aria-hidden="true" />
          {saved ? <Check size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}
          <span>{saved ? "Saved" : "Save escape"}</span>
        </span>
      </button>
    </div>
  );
}

export function FlightPath() {
  const maskId = useId();
  const route = "M18 65 C110 91 162 9 270 30 S432 92 512 46 C588 2 689 -1 694 28 C699 67 638 66 654 39 C670 15 718 26 778 16";
  return (
    <div className="sr-home-flight" aria-hidden="true">
      <svg viewBox="0 0 800 110" fill="none" focusable="false">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="110">
            <path className="sr-flight-reveal" d={route} pathLength="1" stroke="white" strokeWidth="8" strokeDasharray="1" strokeDashoffset="0" />
          </mask>
        </defs>
        <path className="sr-flight-guide" d={route} />
        <path className="sr-flight-dots" d={route} mask={`url(#${maskId})`} />
        <g className="sr-flight-plane" transform="translate(778 16) rotate(-9.5)">
          <path d="M17 0 4 3 -4 14 -8 14 -4 3 -13 3 -17 7 -20 7 -17 0 -20 -7 -17 -7 -13 -3 -4 -3 -8 -14 -4 -14 4 -3Z" />
        </g>
      </svg>
    </div>
  );
}
