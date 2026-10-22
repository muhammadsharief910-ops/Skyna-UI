import React, { useId } from "react";

export default function DiscoveryBalloon() {
  const maskId = useId();
  const trail = "M8 104 C78 137 161 112 170 62 C182 4 100 2 118 60 C136 124 246 54 352 65";
  return (
    <div className="sr-discover-balloon" aria-hidden="true">
      <svg className="sr-balloon-trail" viewBox="0 0 365 150" fill="none" focusable="false">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="365" height="150">
            <path className="sr-balloon-trace" d={trail} pathLength="1" stroke="white" strokeWidth="6" strokeDasharray="1" strokeDashoffset="0" />
          </mask>
        </defs>
        <path d={trail} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2.5 6" mask={`url(#${maskId})`} />
      </svg>
      <div className="sr-balloon-shadow" />
      <div className="sr-balloon-drift">
        <div className="sr-balloon-float">
          <div className="sr-balloon-sway">
            <img
              src="/images/sunroom/discover-balloon.webp"
              alt=""
              width="1225"
              height="1284"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
